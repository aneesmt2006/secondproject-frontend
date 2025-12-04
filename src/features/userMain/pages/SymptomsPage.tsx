import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Loader2 } from "lucide-react";
import { Button } from "../components/button";
import { cn } from "../../shared/utils/utils";
import { useSymptomsData } from "../hooks/useSymptomsData";

const colors = [
  "bg-orange-100 text-orange-600",
  "bg-pink-100 text-pink-600",
  "bg-purple-100 text-purple-600",
  "bg-red-100 text-red-600",
  "bg-gray-100 text-gray-600",
  "bg-yellow-100 text-yellow-600",
  "bg-indigo-100 text-indigo-600",
  "bg-blue-100 text-blue-600",
];

const getColor = (index: number) => colors[index % colors.length];

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

  const pageVariants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  };
  

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="min-h-screen bg-cream flex flex-col relative"
    >
      {/* Header */}
      <div className="relative z-50 bg-cream pt-6 px-4 pb-4 md:px-12 md:pt-10">
         <div className="max-w-6xl mx-auto w-full">
            <div className="flex items-center gap-4 mb-6">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full bg-gray-100 hover:bg-gray-200 w-10 h-10 transition-colors"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </Button>
            </div>
            
            <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Today, {dateString}</h1>
            <p className="text-gray-500 mt-2 text-lg">Have you feel this?</p>
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-28 md:px-12">
        <div className="max-w-6xl mx-auto w-full">
            {loading ? (
                 <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                 </div>
            ) : (
                <div id="symptoms-container" className="md:bg-white md:rounded-[3rem] md:p-8 md:shadow-sm md:grid md:grid-cols-2 md:gap-12 md:items-start">
                    {/* Symptoms Section */}
                    <section className="mb-8 md:mb-0">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-sm">🩺</span>
                        Symptoms
                    </h2>
                    <div className="flex flex-wrap gap-3 md:grid md:grid-cols-2">
                        {normalSymptoms.map((symptom, index) => {
                        const isSelected = selectedSymptoms.includes(symptom);
                        return (
                            <motion.button
                            layout
                            key={symptom}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleSymptom(symptom)}
                            className={cn(
                                "relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 border",
                                isSelected
                                ? "bg-white border-purple-500 ring-1 ring-purple-500 shadow-sm"
                                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            )}
                            >
                            <span className={cn("w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold", getColor(index))}>
                                {symptom.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-sm font-medium text-gray-700">{symptom}</span>
                            {isSelected && (
                                <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute -top-2 -right-1"
                                >
                                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                </motion.div>
                            )}
                            </motion.button>
                        );
                        })}
                    </div>
                    </section>

                    {/* Abnormal Symptoms Section */}
                    <section>
                    <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-sm">⚠️</span>
                        Abnormal symptoms
                    </h2>
                    <div className="flex flex-wrap gap-3 md:grid md:grid-cols-2">
                        {abnormalSymptoms.map((symptom, index) => {
                        const isSelected = selectedAbnormal.includes(symptom);
                        return (
                            <motion.button
                            layout
                            key={symptom}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleAbnormal(symptom)}
                            className={cn(
                                "relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 border",
                                isSelected
                                ? "bg-white border-purple-500 ring-1 ring-purple-500 shadow-sm"
                                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            )}
                            >
                            <span className={cn("w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold", getColor(index + normalSymptoms.length))}>
                                {symptom.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-sm font-medium text-gray-700">{symptom}</span>
                            {isSelected && (
                                <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute -top-2 -right-1"
                                >
                                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                </div>
                                </motion.div>
                            )}
                            </motion.button>
                        );
                        })}
                    </div>
                    </section>
                </div>
            )}
        </div>
      </div>

      {/* Apply Button */}
      <div className="fixed bottom-6 left-4 right-4 z-50 md:static md:flex md:justify-center md:pb-10 md:pt-4">
        <Button 
          className="w-full md:w-64 h-14 rounded-full bg-periwinkle hover:bg-rose text-white font-bold text-lg shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate(-1)}
        >
          Apply
        </Button>
      </div>
    </motion.div>
  );
};

export default SymptomsPage;
