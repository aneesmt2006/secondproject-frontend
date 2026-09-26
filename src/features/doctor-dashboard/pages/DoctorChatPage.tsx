import { useSharedChat } from "@/hooks/useSharedChat";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { GlassyNavigation } from "../components/GlassyNavigation";
import { BottomNavigation } from "../components/BottomNavigation";
import { motion } from "framer-motion";

const DoctorChatPage = () => {
  const {
    contacts: patients,
    selectedContact: selectedPatient,
    selectedContactId: selectedPatientId,
    currentMessages,
    newMessage,
    setNewMessage,
    selectedFile,
    setSelectedFile,
    isSending,
    handleSendMessage,
    selectContact: selectPatient,
    messagesEndRef,
    isMobileSidebarOpen,
    handleBackToSidebar,
  } = useSharedChat("doctor");

  return (
    <div className="min-h-screen h-screen doctor-theme bg-background md:bg-[#EBF3FB] text-foreground relative flex flex-col md:overflow-hidden">
      <GlassyNavigation />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex-1 flex flex-col md:p-6 pb-20 md:pb-6 md:pt-28 h-full max-w-7xl mx-auto w-full"
      >
        <div className="flex-1 overflow-hidden bg-white/60 backdrop-blur-md md:rounded-[15px] shadow-sm border border-primary/20 flex flex-col md:flex-row relative h-full">
          
          {/* Chat Sidebar Panel */}
          <div className={`${!isMobileSidebarOpen ? 'hidden md:block' : 'block'} h-full border-r border-primary/20`}>
             <ChatSidebar
              doctors={patients}
              selectedDoctorId={selectedPatientId}
              onSelectDoctor={selectPatient}
              isMobileSidebarOpen={isMobileSidebarOpen}
              isDoctor={true}
            />
          </div>

          {/* Chat Main Window */}
          <div className={`${isMobileSidebarOpen ? 'hidden md:flex' : 'flex'} flex-1 h-full min-h-0 flex-col overflow-hidden`}>
            <ChatWindow
              doctor={selectedPatient}
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
              isDoctor={true}
            />
          </div>

        </div>
      </motion.div>

      {/* Bottom Tab Bar for Mobile Navigation */}
      <BottomNavigation />

    </div>
  );
};

export default DoctorChatPage;
