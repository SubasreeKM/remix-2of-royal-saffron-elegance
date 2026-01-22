import { motion } from "framer-motion";

interface ScrollProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ScrollProgressIndicator = ({ currentStep, totalSteps }: ScrollProgressIndicatorProps) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
      {Array.from({ length: totalSteps }, (_, i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          {/* Connector Line */}
          {i < totalSteps - 1 && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-3 bg-ivory/20" />
          )}
          
          {/* Dot */}
          <motion.div
            className="w-2 h-2 rounded-full border transition-all duration-500"
            animate={{
              backgroundColor: i === currentStep ? "hsl(43, 74%, 49%)" : "transparent",
              borderColor: i <= currentStep ? "hsl(43, 74%, 49%)" : "hsla(60, 33%, 99%, 0.3)",
              scale: i === currentStep ? 1.3 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Active Glow */}
          {i === currentStep && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 0 0 hsla(43, 74%, 49%, 0.4)",
                  "0 0 0 8px hsla(43, 74%, 49%, 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
        </motion.div>
      ))}
      
      {/* Progress Label */}
      <motion.div
        className="mt-4 text-gold/60 text-xs font-sans tracking-wider"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {String(currentStep + 1).padStart(2, "0")}
      </motion.div>
    </div>
  );
};

export default ScrollProgressIndicator;
