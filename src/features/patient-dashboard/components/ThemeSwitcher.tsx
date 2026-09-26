import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { useState, useId } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { createPortal } from 'react-dom';

export const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const instanceId = useId();

  const themes = [
    {
      id: 'theme-peach',
      name: 'Peach & Rose',
      color: 'bg-orange-300',
      description: 'Warm, nurturing, and affectionate.',
    },
    {
      id: 'theme-lavender',
      name: 'Lavender & Amethyst',
      color: 'bg-purple-300',
      description: 'Soothing, restful, and balancing.',
    },
    {
      id: 'theme-aqua',
      name: 'Serene Aqua',
      color: 'bg-teal-300',
      description: 'Calming, refreshing, and natural.',
    }
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/40 hover:bg-white shadow-sm hover:shadow-md"
      >
        <Palette className="w-5 h-5 text-patient-primary" />
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              key="theme-modal"
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2 }}
            >
              <div
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-sm p-5 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[2rem] shadow-2xl z-10"
              >
                <div className="flex justify-between items-center mb-5 px-1 border-b border-white/30 pb-3">
                  <h3 className="text-lg font-bold text-gray-800">Choose Your Theme</h3>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-black/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id as any);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 ${
                        theme === t.id 
                          ? 'bg-white/90 border-white shadow-md border' 
                          : 'bg-white/40 hover:bg-white/60 border border-transparent hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full ${t.color} shadow-sm border-2 border-white`} />
                      <div className="text-left flex-1">
                        <p className="text-base font-bold text-gray-800">{t.name}</p>
                        <p className="text-xs text-gray-500 leading-snug mt-0.5">{t.description}</p>
                      </div>
                      {theme === t.id && (
                        <motion.div 
                          layoutId={`theme-indicator-${instanceId}`}
                          className="w-3 h-3 rounded-full bg-patient-primary shadow-sm"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
