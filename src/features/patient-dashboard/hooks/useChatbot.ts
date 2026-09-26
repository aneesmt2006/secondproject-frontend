import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { userSelector } from '@/features/patient-auth/slice/userSlice';
import { askChatbot } from '@/services/api/medical.service';
import { ChatbotMessage } from '../types/chatbot.types';

export const useChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const user = useAppSelector(userSelector);

  // Initialize welcome message once with user's name
  useEffect(() => {
    if (isInitializedRef.current) return;
    const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'there';
    setMessages([
      {
        id: 'welcome',
        text: `Hi ${firstName}! ?? I'm your AI pregnancy assistant. How can I help you today?`,
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
    isInitializedRef.current = true;
  }, [user?.full_name]);

  // Scroll to bottom when messages or loading state changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isLoading, isChatOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatbotMessage = {
      id: Date.now().toString(),
      text: textToSend.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await askChatbot(userMessage.text);
      
      const botMessage: ChatbotMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data || "I'm sorry, I couldn't get a response. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error asking chatbot:', error);
      const errorMessage: ChatbotMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I had trouble reaching my medical database. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return {
    isChatOpen,
    setIsChatOpen,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
  };
};

