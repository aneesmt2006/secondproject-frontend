import { motion, AnimatePresence } from 'framer-motion';
import { SymptomsData } from '../../types';

interface SymptomsPreviewModalProps {
  previewData: SymptomsData | null;
  onClose: () => void;
}

export const SymptomsPreviewModal = ({ previewData, onClose }: SymptomsPreviewModalProps) => {
  return (
    <AnimatePresence>
      {previewData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#FDF6E9] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-6 border-b border-rose/10 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-10">
              <h3 className="text-xl font-serif text-[#3E2723]">Week {previewData.week} Symptoms Preview</h3>
              <button onClick={onClose} className="text-cocoa/60 hover:text-rose">Close</button>
            </div>
            
            <div className="p-8 space-y-8">
              {/* Normal Symptoms Section */}
              <div className="bg-[#FFFBF5] rounded-[2rem] p-6 shadow-sm border border-[#EFEBE9]">
                <h4 className="text-lg font-bold text-[#3E2723] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  Normal Symptoms
                </h4>
                <div 
                  className="prose prose-brown max-w-none text-[#5D4037]"
                  dangerouslySetInnerHTML={{ __html: previewData.normalSymptoms }}
                />
              </div>

              {/* Abnormal Symptoms Section */}
              <div className="bg-[#FFF0F0] rounded-[2rem] p-6 shadow-sm border border-rose/20">
                <h4 className="text-lg font-bold text-[#C62828] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Abnormal Symptoms (Consult Doctor)
                </h4>
                <div 
                  className="prose prose-red max-w-none text-[#5D4037]"
                  dangerouslySetInnerHTML={{ __html: previewData.abnormalSymptoms }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
