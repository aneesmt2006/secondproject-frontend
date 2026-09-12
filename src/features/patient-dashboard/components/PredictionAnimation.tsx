import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";

interface PredictionLottieProps {
  show: boolean;
  onComplete: () => void;
  animationPath: string; // e.g. '/assets/update.lottie'
  darkMode?: boolean;
}

export const PredictionLottie: React.FC<PredictionLottieProps> = ({
  show,
  onComplete,
  animationPath,
  darkMode = false,
}) => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setFinished(true);
        setTimeout(() => {
          onComplete();
          setFinished(false);
        }, 1000);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="lottie-overlay"
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md ${
            darkMode ? "bg-black/60" : "bg-white/70"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!finished ? (
            <>
              <DotLottieReact
                src={animationPath}
                loop
                autoplay
                style={{ width: 220, height: 220 }}
              />
              <p
                className={`text-lg mt-3 font-medium ${
                  darkMode ? "text-white/90" : "text-gray-700"
                }`}
              >
                Updating predictions...
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center"
            >
              <DotLottieReact
                src="https://lottie.host/7ab69c90-f711-4ba5-b901-d10d2201a608/U7r6qvgQrz.lottie"
                autoplay
                loop={false}
                style={{ width: 200, height: 200 }}
              />
              <p
                className={`text-lg font-semibold mt-3 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Predictions updated!
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
