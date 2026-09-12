import { format } from "date-fns";
import { ChatMessage } from "./types";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: ChatMessage;
  doctorAvatarUrl?: string;
  isMine: boolean;
  isDoctor?: boolean;
}

export const MessageBubble = ({ message, doctorAvatarUrl, isMine, isDoctor = false }: MessageBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2 w-full max-w-[80%] ${
        isMine ? "ml-auto flex-row-reverse" : "mr-auto"
      }`}
    >
      {!isMine && (
        <img
          src={doctorAvatarUrl}
          alt="Avatar"
          className="w-8 h-8 rounded-full shadow-sm mb-1 object-cover"
        />
      )}

      <div className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}>
        <div
          className={`
            relative p-3 rounded-2xl md:text-sm text-xs break-words shadow-sm
            ${
              isMine
                ? isDoctor
                  ? "bg-gradient-to-br from-primary to-primary/80 text-white rounded-br-none"
                  : "bg-gradient-to-br from-[#E0825C] to-[#C96743] text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
            }
          `}
        >
          {message.text}
          {message.attachmentUrl && (
            <img
              src={message.attachmentUrl}
              alt="attachment"
              className="mt-2 rounded-lg max-w-full h-auto"
            />
          )}
        </div>
        <span className="text-[10px] text-gray-400 mt-1 px-1">
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </motion.div>
  );
};
