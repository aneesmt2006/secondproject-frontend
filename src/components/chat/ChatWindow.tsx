import { ChatMessage, ChatContact } from "./types";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";
import { motion } from "framer-motion";

interface ChatWindowProps {
  doctor: ChatContact | null;
  messages: ChatMessage[];
  newMessage: string;
  onNewMessageChange: (val: string) => void;
  onSendMessage: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onBack: () => void;
  isMobileSidebarOpen: boolean;
  isDoctor?: boolean;
}

export const ChatWindow = ({
  doctor,
  messages,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  messagesEndRef,
  onBack,
  isMobileSidebarOpen,
  isDoctor = false
}: ChatWindowProps) => {

  const themeColorText = isDoctor ? "text-primary" : "text-[#E0825C]";
  const themeColorHoverBg = isDoctor ? "hover:bg-primary/10" : "hover:bg-[#E0825C]/10";
  const themeColorHoverText = isDoctor ? "hover:text-primary" : "hover:text-[#E0825C]";
  const themeColorBorder = isDoctor ? "border-primary/20" : "border-[#E0825C]/20";

  if (!doctor) {
    return (
      <div className={`flex-1 flex flex-col items-center justify-center bg-[#F9F0E6]/30 backdrop-blur-sm ${isMobileSidebarOpen ? 'hidden md:flex' : 'flex'}`}>
        <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center shadow-sm mb-4">
          <img src="/splash1.png" alt="Select" className="w-16 h-16 opacity-50" />
        </div>
        <p className="text-[#5A2D0C]/60 text-lg font-medium">Select a conversation</p>
        <p className="text-[#5A2D0C]/40 text-sm mt-1">Choose a {isDoctor ? "patient" : "doctor"} from the list to start chatting.</p>
      </div>
    );
  }

  return (
    <div className={`flex-1 h-full min-h-0 flex flex-col bg-[#F9F0E6]/50 transition-all duration-300 relative ${isMobileSidebarOpen ? 'hidden md:flex' : 'flex'}`}>
      
      {/* Header */}
      <div className={`flex items-center justify-between p-3 md:p-4 bg-white/80 backdrop-blur-xl border-b ${themeColorBorder} shadow-sm z-10 sticky top-0`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className={`md:hidden p-2 -ml-2 text-gray-500 ${themeColorHoverBg} rounded-full transition-colors`}
          >
            <ArrowLeft className="w-5 h-5 text-[#5A2D0C]" />
          </button>
          
          <div className="relative">
            <img
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm"
            />
            {doctor.isOnline && (
               <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-emerald-500" />
            )}
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-800">{doctor.name}</h2>
            {doctor.specialty && <p className={`text-xs ${themeColorText} font-medium hidden md:block mb-0.5`}>{doctor.specialty}</p>}
            {doctor.isOnline ? (
              <p className="text-xs font-medium text-emerald-500">Online</p>
            ) : (
              <p className="text-xs text-gray-400">Offline {doctor.lastSeen && `• Last seen ${doctor.lastSeen}`}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 text-gray-500">
          <motion.button whileTap={{ scale: 0.9 }} className={`p-2 ${themeColorHoverBg} rounded-full ${themeColorHoverText} transition-colors`}>
            <Video className="w-5 h-5" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className={`p-2 ${themeColorHoverBg} rounded-full ${themeColorHoverText} transition-colors`}>
            <Phone className="w-5 h-5" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className={`p-2 ${themeColorHoverBg} rounded-full ${themeColorHoverText} transition-colors hidden md:block`}>
            <MoreVertical className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide w-full p-4 space-y-4 flex flex-col">
        {messages.length === 0 ? (
           <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
              <div className={`bg-white/50 rounded-2xl p-6 text-center max-w-sm shadow-sm border ${themeColorBorder}`}>
                <p className="text-sm">Start a secure conversation with {doctor.name}. Your chat history is private.</p>
              </div>
           </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                isMine={isDoctor ? msg.sender === "doctor" : msg.sender === "user"}
                doctorAvatarUrl={isDoctor ? (msg.sender === "user" ? doctor.avatarUrl : undefined) : (msg.sender === "doctor" ? doctor.avatarUrl : undefined)}
                isDoctor={isDoctor}
              />
            ))}
            <div ref={messagesEndRef} className="h-1 shrink-0 mt-auto" />
          </>
        )}
      </div>

      {/* Input Area */}
      <ChatInput
        value={newMessage}
        onChange={onNewMessageChange}
        onSend={onSendMessage}
        isDoctor={isDoctor}
      />

    </div>
  );
};
