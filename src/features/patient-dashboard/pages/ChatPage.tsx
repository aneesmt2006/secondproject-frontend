import { useChat } from "../hooks/useChat";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { DesktopNavbar } from "../components/DesktopNavbar";
import { BottomTabBar } from "../components/BottomTabBar";
import { motion } from "framer-motion";

const ChatPage = () => {
  const {
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
  } = useChat();

  return (
    <div className="min-h-screen gradient-peach text-[#5A2D0C] relative flex flex-col md:overflow-hidden h-[100dvh]">
      {/* Wave Background */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <div className="gradient-peach h-full" />
      </div>

      <DesktopNavbar />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex-1 flex flex-col md:p-6 pb-0 md:pb-6 md:pt-28 h-full max-w-7xl mx-auto w-full"
      >
        <div className="flex-1 overflow-hidden bg-white/30 backdrop-blur-md rounded-none md:rounded-[40px] shadow-card border border-white/50 flex flex-col md:flex-row shadow-[0_8px_32px_rgba(224,130,92,0.15)] relative h-full">
          
          {/* Chat Sidebar Panel */}
          <div className={`${!isMobileSidebarOpen ? 'hidden md:block' : 'block'} h-full border-r border-white/40`}>
             <ChatSidebar
              doctors={doctors}
              selectedDoctorId={selectedDoctorId}
              onSelectDoctor={selectDoctor}
              isMobileSidebarOpen={isMobileSidebarOpen}
            />
          </div>

          {/* Chat Main Window */}
          <div className={`${isMobileSidebarOpen ? 'hidden md:flex' : 'flex'} flex-1 h-full min-h-0 flex-col overflow-hidden`}>
            <ChatWindow
              doctor={selectedDoctor}
              messages={currentMessages}
              newMessage={newMessage}
              onNewMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              messagesEndRef={messagesEndRef}
              onBack={handleBackToSidebar}
              isMobileSidebarOpen={isMobileSidebarOpen}
            />
          </div>

        </div>
      </motion.div>

      {/* Bottom Tab Bar for Mobile Navigation */}
      {isMobileSidebarOpen && <BottomTabBar />}

    </div>
  );
};

export default ChatPage;
