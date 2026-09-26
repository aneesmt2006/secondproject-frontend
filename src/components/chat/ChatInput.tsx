import { useState, useRef } from "react";
import { Paperclip, Image as ImageIcon, Send, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  isSending?: boolean;
  isDoctor?: boolean;
}

export const ChatInput = ({ 
  value, 
  onChange, 
  onSend, 
  selectedFile, 
  onFileSelect, 
  isSending = false,
  isDoctor = false 
}: ChatInputProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
    // Reset file input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendClick = () => {
    if ((!value.trim() && !selectedFile) || isSending) return;
    onSend();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleAttachmentClick = () => {
    setShowOptions(!showOptions);
  };

  const themeColorHoverBg = isDoctor ? "hover:bg-primary/10" : "hover:bg-patient-primary/10";
  const themeColorHoverText = isDoctor ? "hover:text-primary" : "hover:text-patient-primary";
  const themeColorBorder = isDoctor ? "border-primary/20" : "border-patient-primary/20";
  const themeColorActiveBorder = isDoctor ? "focus-within:ring-primary/50" : "focus-within:ring-patient-primary/50";
  const themeColorBgBtn = isDoctor ? "bg-primary hover:bg-primary/90" : "bg-patient-primary hover:bg-patient-primary/80";

  return (
    <div className={`relative p-4 bg-white/60 backdrop-blur-md border-t ${themeColorBorder} shadow-sm`}>
      {selectedFile && (
        <div className="max-w-4xl mx-auto mb-3">
          <div className="relative inline-block">
            <img 
              src={URL.createObjectURL(selectedFile)} 
              alt="Preview" 
              className="h-24 rounded-lg object-cover border border-gray-200 shadow-sm" 
            />
            <button 
              onClick={() => onFileSelect(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
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
          disabled={isSending}
          placeholder={isSending ? "Sending..." : "Type your message..."}
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-2 px-1 text-gray-800 placeholder:text-gray-400 disabled:opacity-50"
        />

        {/* hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          className="hidden" 
          disabled={isSending}
          accept="image/*" 
        />

        {/* Send Button */}
        <motion.button
          whileTap={!isSending && (value.trim() || selectedFile) ? { scale: 0.9 } : undefined}
          onClick={handleSendClick}
          disabled={isSending || (!value.trim() && !selectedFile)}
          className={`
            p-2.5 rounded-full flex items-center justify-center transition-all duration-300
            ${(value.trim() || selectedFile) && !isSending
              ? `${themeColorBgBtn} text-white shadow-md` 
              : "bg-gray-100 text-gray-400 cursor-not-allowed"}
          `}
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 ml-0.5 animate-spin" />
          ) : (
            <Send className="w-4 h-4 ml-0.5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};
