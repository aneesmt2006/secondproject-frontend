import { useSharedChat } from "@/hooks/useSharedChat";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { DesktopNavbar } from "../components/DesktopNavbar";
import { BottomTabBar } from "../components/BottomTabBar";
import { motion } from "framer-motion";

const ChatPage = () => {
  const {
    contacts: doctors,
    selectedContact: selectedDoctor,
    selectedContactId: selectedDoctorId,
    currentMessages,
    newMessage,
    setNewMessage,
    selectedFile,
    setSelectedFile,
    isSending,
    handleSendMessage,
    selectContact: selectDoctor,
    messagesEndRef,
    isMobileSidebarOpen,
    handleBackToSidebar,
  } = useSharedChat("user");

  return (
    <div className="min-h-screen h-screen md:gradient-peach text-[#5A2D0C] relative flex flex-col md:overflow-hidden">

      <DesktopNavbar />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex-1 flex flex-col md:p-6 pb-0 md:pb-6 md:pt-28 h-full max-w-7xl mx-auto w-full"
      >
        <div className="flex-1 overflow-hidden bg-white/30 backdrop-blur-md md:rounded-[15px] shadow-card border border-white/50 flex flex-col md:flex-row shadow-[0_8px_32px_rgba(224,130,92,0.15)] relative h-full">
          
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
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
              isSending={isSending}
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
