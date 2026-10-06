import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, Sparkles, ChevronLeft } from 'lucide-react';
import chatbotImage from '/babyBot1.png';
import { useChatbot } from '../hooks/useChatbot';
import { SUGGESTED_QUESTIONS } from '../types/chatbot.types';

// Typing Indicator Sub-component
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="bg-white/80 border border-patient-primary rounded-2xl rounded-tl-none p-3 max-w-[80px]" style={{ borderColor: 'color-mix(in srgb, var(--patient-primary) 20%, transparent)' }}>
      <div className="flex items-center space-x-1">
        {[0, 0.15, 0.3].map((delay, idx) => (
          <motion.div
            key={idx}
            className="w-2 h-2 bg-patient-primary rounded-full opacity-60"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Individual Message Bubble Sub-component
const MessageBubble = ({ text, sender }: { text: string; sender: 'user' | 'bot' }) => {
  const isBot = sender === 'bot';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm whitespace-pre-wrap ${
          isBot
            ? 'bg-white/80 text-gray-800 border border-patient-primary/20 rounded-tl-none'
            : 'bg-patient-primary text-white rounded-tr-none'
        }`}
      >
        {text}
      </div>
    </motion.div>
  );
};

export const ChatbotButton = () => {
  const {
    isChatOpen,
    setIsChatOpen,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    messagesEndRef,
    handleSendMessage,
    handleKeyPress,
  } = useChatbot();

  return (
    <>
      {/* Floating Chatbot Character */}
      <motion.div
        id="tour-chatbot"
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
            className="absolute -top-1 -right-1 w-6 h-6 bg-patient-primary rounded-full flex items-center justify-center animate-pulse"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white" />
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
            className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 w-full md:w-96 h-full md:h-[520px] bg-white md:bg-white/95 backdrop-blur-none md:backdrop-blur-xl rounded-none md:rounded-3xl shadow-2xl border-0 md:border border-patient-primary/20 z-[100] flex flex-col overflow-hidden text-left"
          >
            {/* Chat Header */}
            <div className="bg-patient-primary p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="md:hidden text-white/80 hover:text-white transition-smooth -ml-1 pr-1"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <img
                  src={chatbotImage}
                  alt="AI Assistant"
                  className="w-10 h-10 rounded-full bg-white/20 p-1"
                />
                <div>
                  <h3 className="text-white font-semibold text-sm">AI Pregnancy Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                    <p className="text-white/80 text-xs">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hidden md:block text-white/80 hover:text-white transition-smooth"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
              ))}

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 flex flex-wrap gap-2 animate-fade-in">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    className="text-xs bg-patient-primary/10 hover:bg-patient-primary/20 text-patient-primary border border-patient-primary/25 rounded-full px-3 py-1.5 transition-all text-left flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-patient-primary shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 border-t border-patient-primary/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-50 border border-patient-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-patient-primary/50 text-gray-800"
                />
                <button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-patient-primary flex items-center justify-center text-white hover:bg-patient-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


