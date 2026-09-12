import { useState, useRef } from "react";
import { Paperclip, Image as ImageIcon, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isDoctor?: boolean;
}

export const ChatInput = ({ value, onChange, onSend, isDoctor = false }: ChatInputProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleAttachmentClick = () => {
    setShowOptions(!showOptions);
  };

  const themeColorHoverBg = isDoctor ? "hover:bg-primary/10" : "hover:bg-[#E0825C]/10";
  const themeColorHoverText = isDoctor ? "hover:text-primary" : "hover:text-[#E0825C]";
  const themeColorBorder = isDoctor ? "border-primary/20" : "border-[#E0825C]/20";
  const themeColorActiveBorder = isDoctor ? "focus-within:ring-primary/50" : "focus-within:ring-[#E0825C]/50";
  const themeColorBgBtn = isDoctor ? "bg-primary hover:bg-primary/90" : "bg-[#E0825C] hover:bg-[#C96743]";

  return (
    <div className={`relative p-4 bg-white/60 backdrop-blur-md border-t ${themeColorBorder} shadow-sm`}>
      <div className={`flex items-center gap-2 max-w-4xl mx-auto bg-white/80 rounded-full p-1.5 shadow-sm border ${themeColorBorder} focus-within:border-transparent focus-within:ring-2 ${themeColorActiveBorder} transition-all duration-300`}>
        
        {/* Actions Button */}
        <div className="relative">
          <button
            onClick={handleAttachmentClick}
            className={`p-2.5 text-gray-400 ${themeColorHoverText} ${themeColorHoverBg} rounded-full transition-colors`}
            title="Attach"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`absolute bottom-12 left-0 bg-white shadow-lg rounded-2xl p-2 flex gap-2 border ${themeColorBorder} drop-shadow-md z-50`}
              >
                <button
                  className={`flex flex-col items-center gap-1 p-3 ${themeColorHoverBg} rounded-xl text-gray-600 ${themeColorHoverText} transition-colors`}
                  onClick={() => {
                    fileInputRef.current?.click();
                    setShowOptions(false);
                  }}
                >
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Image</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-2 px-1 text-gray-800 placeholder:text-gray-400"
        />

        {/* hidden file input */}
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />

        {/* Send Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onSend}
          disabled={!value.trim()}
          className={`
            p-2.5 rounded-full flex items-center justify-center transition-all duration-300
            ${value.trim() 
              ? `${themeColorBgBtn} text-white shadow-md` 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"}
          `}
        >
          <Send className="w-4 h-4 ml-0.5" />
        </motion.button>
      </div>
    </div>
  );
};
