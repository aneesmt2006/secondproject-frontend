/* eslint-disable @typescript-eslint/no-explicit-any */
import { userSelector } from '@/features/patient-auth/slice/userSlice';
import { doctorSelector } from '@/features/doctor-auth/slice/doctorSlice';
import { bookedDoctors, bookedPatients } from '@/services/api/appoinment.service';
import { getChatSocket, socketForChat } from '@/services/socket/socket.chat.service';
import { useAppSelector } from '@/store/hooks';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, ChatContact } from '@/components/chat/types';
import { loadThreadMessages } from '@/services/api/communication-service';
import { toast } from 'sonner';
import { uploadImageToCloudinary } from '@/services/api/users-management.service';

export type ChatRole = "user" | "doctor";

export const useSharedChat = (role: ChatRole) => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectThreadId, setSelectThreadId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  
  // State for composing message
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { id: patientId } = useAppSelector(userSelector);
  const { id: docId } = useAppSelector(doctorSelector);
  
  const currentUserId = role === "user" ? patientId : docId;

  // Determine active messages key. Favor threadId, fallback to selectedContactId.
  const activeKey = selectThreadId || selectedContactId;
  const currentMessages = activeKey ? messagesMap[activeKey] || [] : [];
  
  // Inject global socket status into the contacts list
  const contactsWithGlobalStatus = contacts.map(c => ({
    ...c,
    isOnline: isSocketConnected
  }));

  const selectedContact = contactsWithGlobalStatus.find((c) => c.id === selectedContactId) || null;

  // Initialize socket when current user is available
  useEffect(() => {
    if (currentUserId) {
      const socket = socketForChat(currentUserId);
      
      setIsSocketConnected(socket.connected);

      const onConnect = () => {
        setIsSocketConnected(true);
        console.log(`${role} connected.....✔️✔️`);
      };
      const onDisconnect = () => {
        setIsSocketConnected(false);
        console.log(`${role} disconnected.....❌❌`);
      };

      socket.on('user_connect', onConnect);
      socket.on('user_disconnect', onDisconnect);

      return () => {
        socket.off('user_connect', onConnect);
        socket.off('user_disconnect', onDisconnect);
      };
    }
  }, [currentUserId, role]);

  // Load booked contacts once on component mount
  useEffect(() => {
    const loadBookedContacts = async () => {
      try {
        const response = role === "user" ? await bookedDoctors() : await bookedPatients();
        if (response?.data) {
          setContacts(response.data);
        }
      } catch (error) {
        console.error(`Error loading booked contacts for ${role}:`, error);
      }
    };

    loadBookedContacts();
  }, [role]);

  // Set up socket event listeners
  useEffect(() => {
    const socket = getChatSocket();
    if (!socket) return;

    const handleReceiveMessage = (message: any) => {
      console.log("message from backend for event receive_message->", message);
      const threadId = message.threadId;
      setSelectThreadId(threadId);

      const incomingMessage: ChatMessage = {
        id: message._id,
        text: message.messageText,
        sender: message.senderType === "user" ? "user" : "doctor",
        timestamp: new Date(message.sendAt),
        attachmentUrl: message.attachmentUrl
      };

      setMessagesMap((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), incomingMessage],
      }));
    };

    const handleMessageAck = (msg: any) => {
      console.log("Acknowledgement", msg);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on('message_sent_ack', handleMessageAck);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off('message_sent_ack', handleMessageAck);
    };
  }, []);

  // Smooth scroll to bottom function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll when new messages are added
  useEffect(() => {
    if (currentMessages.length > 0) {
      scrollToBottom();
    }
  }, [currentMessages.length, scrollToBottom]);

  // Memoized send message handler
  const handleSendMessage = useCallback(async () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedContactId || !currentUserId || isSending) return;

    const socket = getChatSocket();
    if (!socket) {
      console.error("Socket not connected");
      return;
    }

    setIsSending(true);
    try {
      let uploadedUrl = "";
      if (selectedFile) {
        try {
          const images = await uploadImageToCloudinary([selectedFile]);
          if (images && images.length > 0) {
            uploadedUrl = images[0];
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image. Please try again.");
          return;
        }
      }

      const payload = {
        userId: role === "user" ? currentUserId : selectedContactId,
        doctorId: role === "doctor" ? currentUserId : selectedContactId,
        senderType: role,
        senderId: currentUserId,
        messageText: newMessage.trim(),
        attachmentUrl: uploadedUrl,
        readStatus: false
      };
      
      console.log("Payload to emit", payload);
      socket.emit("send_message", payload);

      // We rely on the backend's "receive_message" event to echo the message back to us.
      // This prevents the message from showing up twice in the UI (optimistic + echoed).
      
      setNewMessage("");
      setSelectedFile(null);
    } finally {
      setIsSending(false);
    }
  }, [newMessage, selectedFile, selectedContactId, selectThreadId, currentUserId, role, isSending]);

  // Memoized sidebar/selection toggles
  const selectContact = useCallback(async (id: string) => {
    setSelectedContactId(id);
    try {
      const response = await loadThreadMessages(id);
      const threadData = response?.messages || [];
      console.log("fetched data--->", response)
      
      if (threadData.length > 0) {
        const threadId = threadData[0].threadId;
        setSelectThreadId(threadId);

        const socket = getChatSocket();
        if (!socket) {
          console.error("Socket not connected");
          return;
        }
        socket.emit("join_private_room", { threadId });
        
        // Map backend DTO to UI model and reverse it so oldest is at top (chronological)
        const formattedMessages: ChatMessage[] = threadData.map((msg: any) => ({
          id: msg._id || Math.random().toString(),
          text: msg.messageText,
          sender: (msg.senderType === "doctor" ? "doctor" : "user") as "user" | "doctor",
          timestamp: new Date(msg.sendAt || new Date()),
          attachmentUrl: msg.attachmentUrl
        })).reverse();

        setMessagesMap((prev) => ({
          ...prev,
          [threadId]: formattedMessages
        }));
      } else {
        // No existing messages, start fresh
        setSelectThreadId(null);
        setMessagesMap((prev) => ({
          ...prev,
          [id]: []
        }));
      }
      setIsMobileSidebarOpen(false);
    } catch (error) {
      console.error("Error at loadThreadMessages", error);
      toast.error("Something happen wrong, try after some time");
    }
  }, []);

  const handleBackToSidebar = useCallback(() => {
    setIsMobileSidebarOpen(true);
    setSelectedContactId(null);
    setSelectThreadId(null);
  }, []);

  return {
    contacts: contactsWithGlobalStatus,
    selectedContact,
    selectedContactId,
    currentMessages,
    newMessage,
    setNewMessage,
    selectedFile,
    setSelectedFile,
    isSending,
    handleSendMessage,
    selectContact,
    messagesEndRef,
    isMobileSidebarOpen,
    handleBackToSidebar,
  };
};
