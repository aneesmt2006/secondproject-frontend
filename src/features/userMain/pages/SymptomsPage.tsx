import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Loader2, Activity, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSymptomsData } from "../hooks/useSymptomsData";

const SymptomsPage = () => {
  const navigate = useNavigate();
  const { normalSymptoms, abnormalSymptoms, loading } = useSymptomsData();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedAbnormal, setSelectedAbnormal] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]
    );
  };

  const toggleAbnormal = (symptom: string) => {
    setSelectedAbnormal((prev) =>
      prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]
    );
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen gradient-peach relative overflow-hidden flex flex-col font-sans">
      {/* Decorative Background Blobs */}
      <div className="fixed -top-32 -right-32 w-96 h-96 bg-[#FFE4D6] rounded-full blur-3xl opacity-60 pointer-events-none mix-blend-multiply animate-blob" />
      <div className="fixed top-1/2 -left-32 w-80 h-80 bg-[#FFF0E0] rounded-full blur-3xl opacity-60 pointer-events-none mix-blend-multiply animate-blob animation-delay-2000" />
      <div className="fixed -bottom-32 right-1/4 w-80 h-80 bg-[#FFDDC1] rounded-full blur-3xl opacity-60 pointer-events-none mix-blend-multiply animate-blob animation-delay-4000" />

      {/* Header */}
      <div className="relative z-50 pt-6 px-6 md:pt-10 mb-6">
         <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-xl shadow-[0_8px_20px_-5px_rgba(90,58,46,0.1)] border border-white/50 flex items-center justify-center hover:bg-white text-[#5A2D0C] transition-all duration-300 group"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </Button>
                <div>
                   <motion.div 
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex items-center gap-2"
                   >
                     <span className="w-2 h-2 rounded-full bg-[#E0825C] animate-pulse" />
                     <span className="text-xs font-bold text-[#E0825C] uppercase tracking-wider">Daily Log</span>
                   </motion.div>
                   <h1 className="text-3xl font-serif font-bold text-[#5A2D0C]">{dateString}</h1>
                </div>
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 md:px-8 pb-10 overflow-y-auto z-10">
        <div className="max-w-6xl mx-auto w-full">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#7A5C50] text-lg font-medium mb-8 pl-2 md:pl-0"
            >
              How are you feeling today, Mama? 🌸
            </motion.p>

            {loading ? (
                 <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-10 h-10 animate-spin text-cocoa" />
                 </div>
            ) : (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Normal Symptoms Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(90,45,12,0.05)]"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-300 flex items-center justify-center shadow-lg  text-white">
                            <Heart className="w-5 h-5 fill-white/20" />
                        </div>
                        <h2 className="text-xl font-bold text-[#5A2D0C]">  Common Symptoms.Have you feel this Mama 😊?</h2>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                          {normalSymptoms.map((symptom) => {
                          const isSelected = selectedSymptoms.includes(symptom);
                          return (
                              <motion.button
                              layout
                              key={symptom}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleSymptom(symptom)}
                              className={cn(
                                  "relative flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 border border-transparent shadow-sm",
                                  isSelected
                                  ? "bg-[#E91E63] text-white shadow-lg shadow-pink-500/20"
                                  : "bg-white/60 text-[#7A5C50] hover:bg-white hover:border-white/50"
                              )}
                              >
                              <span className="text-sm font-semibold">{symptom}</span>
                              {isSelected && (
                                  <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-1 bg-white/20 rounded-full p-0.5"
                                  >
                                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                  </motion.div>
                              )}
                              </motion.button>
                          );
                          })}
                      </div>
                    </motion.div>

                    {/* Other Observations Section */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(90,45,12,0.05)]"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br from-[#80CBC4] to-[#26A69A] flex items-center justify-center shadow-lg shadow-teal-500/20 text-white">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#5A2D0C]">Noticed anything new Mama? 😊</h2>
                            <p className="text-xs text-[#7A5C50] opacity-80">Just keeping track of the little things</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                          {abnormalSymptoms.map((symptom) => {
                          const isSelected = selectedAbnormal.includes(symptom);
                          return (
                              <motion.button
                              layout
                              key={symptom}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleAbnormal(symptom)}
                              className={cn(
                                  "relative flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 border border-transparent shadow-sm",
                                  isSelected
                                  ? "bg-[#00897B] text-white shadow-lg shadow-teal-500/20"
                                  : "bg-white/60 text-[#7A5C50] hover:bg-white hover:border-white/50"
                              )}
                              >
                              <span className="text-sm font-semibold">{symptom}</span>
                              {isSelected && (
                                  <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-1 bg-white/20 rounded-full p-0.5"
                                  >
                                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                  </motion.div>
                              )}
                              </motion.button>
                          );
                          })}
                      </div>
                    </motion.div>
                </div>

                {/* Apply Button - Placed inline after content */}
                <div className="mt-8 md:mt-12 mb-8 flex justify-center w-full">
                  <Button 
                    className="w-full max-w-md h-14 rounded-full bg-gradient-to-r from-[#5A2D0C] to-[#4A250A] hover:to-[#5A2D0C] text-white font-bold text-lg shadow-[0_8px_25px_-5px_rgba(90,45,12,0.3)] transition-all hover:shadow-[0_12px_30px_-5px_rgba(90,45,12,0.4)] active:scale-[0.98] border border-white/10"
                    onClick={() => navigate(-1)}
                  >
                    <span className="flex items-center gap-2">
                      Save Today's Log
                      <Check className="w-4 h-4 text-[#E0825C]" />
                    </span>
                  </Button>
                </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default SymptomsPage;
