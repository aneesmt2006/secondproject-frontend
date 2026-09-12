/* eslint-disable @typescript-eslint/no-explicit-any */
import { userSelector } from '@/features/patient-auth/slice/userSlice';
import { bookedDoctors } from '@/services/api/appoinment.service';
import { getChatSocket, socketForChat } from '@/services/socket/socket.chat.service';
import { useAppSelector } from '@/store/hooks';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, ChatContact } from '@/components/chat/types';
import { loadThreadMessages } from '@/services/api/communication-service';
import { toast } from 'sonner';

export const useChat = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectThreadId, setSelectThreadId] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<ChatContact[]>([]);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [isSocketConnected, setIsSocketConnected] = useState(false);


  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id: userId } = useAppSelector(userSelector);

  // Determine active messages key. Favor threadId, fallback to doctorId.
  const activeKey = selectThreadId || selectedDoctorId;
  const currentMessages = activeKey ? messagesMap[activeKey] || [] : [];
  
  const selectedDoctor = doctors?.find((d) => d.id === selectedDoctorId) || null;

  // Initialize socket when user is available
  useEffect(() => {
    if (userId) {
    const socket =   socketForChat(userId);
       const onConnect = () => {
        setIsSocketConnected(true)
        console.log("user disconnectd.....✔️✔️")
      };
      const onDisconnect = () => {
        setIsSocketConnected(false)
         console.log("user disconnectd.....❌❌")
      };

      socket.on('user_connect', onConnect);
      socket.on('user_disconnect', onDisconnect);

       return () => {
        socket.off('user_connect', onConnect);
        socket.off('user_disconnect', onDisconnect);
      };
    }
  }, [userId]);

  // Load booked doctors once on component mount
  useEffect(() => {
    const loadBookedDoctors = async () => {
      try {
        const response = await bookedDoctors();
        if (response?.data) {
          setDoctors(response.data);
        }
      } catch (error) {
        console.error('Error at chat history:', error);
      }
    };

    loadBookedDoctors();
  }, []);

  // Set up socket event listeners
  useEffect(() => {
    const socket = getChatSocket();
    if (!socket) return;

    const handleReceiveMessage = (message:any) => {
      console.log("message from backend for event receive_message->", message);
      const threadId = message.threadId;
      setSelectThreadId(threadId);

      

      const incomingMessage: ChatMessage = {
        id: message._id,
        text: message.messageText,
        sender: message.senderType === "user" ? "user" : "doctor",
        timestamp: new Date(message.sendAt),
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
  }, [currentMessages.length, scrollToBottom]); // Relying on length prevents unnecessary fires

  // Memoized send message handler
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedDoctorId) return;

    const socket = getChatSocket();
    if (!socket) {
      console.error("Socket not connected");
      return;
    }

    const payload = {
      userId,
      doctorId: selectedDoctorId,
      senderType: "user",
      senderId: userId,
      messageText: newMessage.trim(),
      attachmentUrl: "",
      readStatus: false
    };
    
    console.log("Payload to emit", payload);
    socket.emit("send_message", payload);

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    // Store message optimistically using the current context key
    const targetKey = selectThreadId || selectedDoctorId;
    // setMessagesMap((prev) => ({
    //   ...prev,
    //   [targetKey]: [...(prev[targetKey] || []), newMsg],
    // }));

    setNewMessage("");
  }, [newMessage, selectedDoctorId, selectThreadId, userId]);

  // Memoized sidebar/selection toggles
  const selectDoctor = useCallback(async(id: string) => {
    setSelectedDoctorId(id);
    try {
      const response = await loadThreadMessages(id);
      const threadData = response?.messages || [];
      console.log("fetched data--->",response)

      if (threadData.length > 0) {
        const threadId = threadData[0].threadId;
        setSelectThreadId(threadId);

        const socket = getChatSocket();
        if (!socket) {
          console.error("Socket not connected");
          return;
        }
        socket.emit("join_private_room", {threadId});

        // Map backend DTO to UI model and reverse it so oldest is at top (chronological)
        const formattedMessages: ChatMessage[] = threadData.map((msg: any) => ({
          id: msg._id || Math.random().toString(),
          text: msg.messageText,
          sender: (msg.senderType === "user" ? "user" : "doctor") as "user" | "doctor",
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
    setSelectedDoctorId(null);
    setSelectThreadId(null);
  }, []);

  return {
    doctors,
    selectedDoctor,
    selectedDoctorId,
    currentMessages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    selectDoctor,
    messagesEndRef,
    isMobileSidebarOpen,
    handleBackToSidebar,
  };
};

