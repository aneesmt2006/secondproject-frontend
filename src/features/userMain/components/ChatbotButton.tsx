import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import chatbotImage from '/babyBot1.png';

export const ChatbotButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chatbot Character */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative"
        >
          <motion.img
            src={chatbotImage}
            alt="Chatbot Assistant"
            className="w-28 h-28 md:w-32 md:h-32 drop-shadow-2xl cursor-pointer"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {/* <MessageCircle className="w-3 h-3 text-white" /> */}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 md:bottom-8 md:right-8 w-80 md:w-96 h-[500px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={chatbotImage}
                  alt="AI Assistant"
                  className="w-10 h-10 rounded-full bg-white/20 p-1"
                />
                <div>
                  <h3 className="text-white font-semibold text-sm">AI Pregnancy Assistant</h3>
                  <p className="text-white/80 text-xs">Here to help you!</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white transition-smooth"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="bg-primary/10 rounded-2xl p-3 mb-3">
                <p className="text-sm text-foreground">
                  Hi Sara! 👋 I'm your AI pregnancy assistant. How can I help you today?
                </p>
              </div>
              <div className="text-xs text-muted-foreground text-center">
                Ask me about your pregnancy, symptoms, or any concerns!
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-secondary/30 border border-border/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-smooth">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
