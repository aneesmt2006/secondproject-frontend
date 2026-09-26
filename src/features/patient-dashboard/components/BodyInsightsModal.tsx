import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Activity, Heart, ArrowRight, X } from "lucide-react";
import { getBodyInsightForWeek } from "../constants/body.insights.data";
import fetusIcon from "../../../assets/images/fetus-icon.png";

interface BodyInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeek: number;
}

export const BodyInsightsModal = ({ isOpen, onClose, currentWeek }: BodyInsightsModalProps) => {
  const insight = getBodyInsightForWeek(currentWeek);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-0">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 max-w-md w-[92vw] sm:w-full mx-auto p-0 shadow-2xl overflow-hidden rounded-3xl gradient-peach flex flex-col max-h-[80vh] font-sans"
          >
              {/* Decorative Background Blobs */}
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-[#fff0e0] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse pointer-events-none" />
              <div className="absolute bottom-[-20%] left-[-10%] w-[250px] h-[250px] bg-[#ffe4d9] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-1000 pointer-events-none" />
              {/* Header */}
              <div className="relative pt-8 pb-6 px-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/30 text-rose-600 hover:bg-white/60 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -top-6 -right-6 opacity-[0.15] rotate-12 pointer-events-none">
                   <img src={fetusIcon} alt="Fetus" className="w-48 h-48 md:w-56 md:h-56 object-contain scale-[1.4]" />
                </div>
                
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20 backdrop-blur-sm">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {insight.weeks} • Trimester {insight.trimester}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-cocoa leading-tight mt-2">
                    {insight.title}
                  </h2>
                  <p className="text-sm font-medium text-cocoa/60 flex items-center gap-1.5 mt-1">
                    What's happening at week {currentWeek}
                  </p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto scrollbar-hide p-6 space-y-6 relative z-10">
                
                {/* Physical Changes */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-cocoa">
                    Physical Changes
                  </h3>
                  <div className="space-y-3">
                    {insight.changes.map((change, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/60 border border-orange-200/50 shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200">
                          <span className="text-[10px] font-bold text-rose-500">{idx + 1}</span>
                        </div>
                        <p className="text-sm text-cocoa/80 leading-relaxed font-medium">
                          {change}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Symptoms */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-cocoa">
                    Common Symptoms
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {insight.symptoms.map((symptom, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100/50 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                        <span className="text-sm text-cocoa/80 font-medium">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wellness Tips */}
                <div className="space-y-4 bg-gradient-to-br from-emerald-50 to-teal-50/30 p-5 rounded-3xl border border-emerald-100/50">
                  <h3 className="text-base font-bold text-emerald-800">
                    Wellness Tips
                  </h3>
                  <ul className="space-y-2.5">
                    {insight.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900/80 font-medium">
                        <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
              
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  
  return createPortal(modalContent, document.body);
};
