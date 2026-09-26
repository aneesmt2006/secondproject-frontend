import { motion } from "framer-motion";
import { Play, Lock, Clock, Signal } from "lucide-react";
import { ExerciseVideo } from "../../constants/exercise.data";

interface VideoCardProps {
  video: ExerciseVideo;
  isLocked: boolean;
  onPlay: (video: ExerciseVideo) => void;
  itemVariants: any;
}

export const VideoCard = ({ video, isLocked, onPlay, itemVariants }: VideoCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={() => {
        if (!isLocked) {
          console.log("Opening video:", video.title);
          onPlay(video);
        }
      }}
      className={`relative group bg-white rounded-3xl overflow-hidden border ${
        isLocked ? "border-gray-200" : "border-white/50"
      } shadow-md transition-all duration-300 ${!isLocked ? "cursor-pointer hover:shadow-xl" : "cursor-not-allowed grayscale-[30%]"}`}
    >
      {/* Thumbnail */}
      <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-500 ${!isLocked ? "group-hover:scale-105" : ""}`}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/30 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/30 flex items-center gap-1">
            <Signal className="w-3 h-3" />
            {video.difficulty}
          </span>
        </div>

        {/* Play / Lock Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isLocked ? (
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/40 group-hover:bg-white/40 group-hover:scale-110 transition-all duration-300">
              <Play className="w-5 h-5 text-white ml-1" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`font-bold text-sm leading-tight mb-1 ${isLocked ? "text-gray-500" : "text-[#5A2D0C]"}`}>
          {video.title}
        </h3>
        <p className={`text-xs font-medium ${isLocked ? "text-gray-400" : "text-[#8D6E63]"}`}>
          {video.category}
        </p>
      </div>

      {isLocked && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10 pointer-events-none" />
      )}
    </motion.div>
  );
};
