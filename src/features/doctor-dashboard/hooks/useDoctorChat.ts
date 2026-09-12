/* eslint-disable @typescript-eslint/no-explicit-any */
import { doctorSelector } from '@/features/doctor-auth/slice/doctorSlice';
import { bookedPatients } from '@/services/api/appoinment.service';
import { getChatSocket, socketForChat } from '@/services/socket/socket.chat.service';
import { useAppSelector } from '@/store/hooks';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, ChatContact } from '@/components/chat/types';
import { loadThreadMessages } from '@/services/api/communication-service';
import { toast } from 'sonner';

export const useDoctorChat = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectThreadId, setSelectThreadId] = useState<string | null>(null);
  const [patients, setPatients] = useState<ChatContact[]>([]);
  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { id: doctorId } = useAppSelector(doctorSelector);

  // Determine active messages key. Favor threadId, fallback to patientId.
  const activeKey = selectThreadId || selectedPatientId;
  const currentMessages = activeKey ? messagesMap[activeKey] || [] : [];
  
  // Inject global socket status into the patients list
  const patientsWithGlobalStatus = patients.map(p => ({
    ...p,
    isOnline: isSocketConnected
  }));

  const selectedPatient = patientsWithGlobalStatus.find((p) => p.id === selectedPatientId) || null;

  // Initialize socket when doctor is available
  useEffect(() => {
    if (doctorId) {
      const socket = socketForChat(doctorId);
      
      setIsSocketConnected(socket.connected);

      const onConnect = () => {
        setIsSocketConnected(true)
        console.log("doctor disconnectd.....✔️✔️")
      };
      const onDisconnect = () => {
        setIsSocketConnected(false)
         console.log("doctor disconnectd.....❌❌")
      };

      socket.on('user_connect', onConnect);
      socket.on('user_disconnect', onDisconnect);

      return () => {
        socket.off('user_connect', onConnect);
        socket.off('user_disconnect', onDisconnect);
      };
    }
  }, [doctorId]);

  // Load booked patients once on component mount
  useEffect(() => {
    const loadBookedPatients = async () => {
      try {
        const response = await bookedPatients();
        if (response?.data) {
          setPatients(response.data);
        }
      } catch (error) {
        console.error('Error at doctor chat history:', error);
      }
    };

    loadBookedPatients();
  }, []);

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
        sender: message.senderType === "doctor" ? "doctor" : "user",
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
  }, [currentMessages.length, scrollToBottom]);

  // Memoized send message handler
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedPatientId) return;

    const socket = getChatSocket();
    if (!socket) {
      console.error("Socket not connected");
      return;
    }

    const payload = {
      userId: selectedPatientId,
      doctorId: doctorId,
      senderType: "doctor",
      senderId: doctorId,
      messageText: newMessage.trim(),
      attachmentUrl: "",
      readStatus: false
    };
    
    console.log("Payload to emit", payload);
    socket.emit("send_message", payload);

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "doctor",
      timestamp: new Date(),
    };

    // Store message optimistically using the current context key
    const targetKey = selectThreadId || selectedPatientId;
    setMessagesMap((prev) => ({
      ...prev,
      [targetKey]: [...(prev[targetKey] || []), newMsg],
    }));

    setNewMessage("");
  }, [newMessage, selectedPatientId, selectThreadId, doctorId]);

  // Memoized sidebar/selection toggles
  const selectPatient = useCallback(async (id: string) => {
    setSelectedPatientId(id);
    try {
      const response = await loadThreadMessages(id);
      const threadData = response?.messages || [];
      
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
    setSelectedPatientId(null);
    setSelectThreadId(null);
  }, []);

  return {
    patients: patientsWithGlobalStatus,
    selectedPatient,
    selectedPatientId,
    currentMessages,
    newMessage,
    setNewMessage,
    handleSendMessage,
    selectPatient,
    messagesEndRef,
    isMobileSidebarOpen,
    handleBackToSidebar,
  };
};

