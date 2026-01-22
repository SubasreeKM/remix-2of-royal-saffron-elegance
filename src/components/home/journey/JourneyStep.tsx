import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";

interface JourneyStepProps {
  stepNumber: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
  isPast: boolean;
  progress: MotionValue<number>;
  index: number;
  totalSteps: number;
}

const JourneyStep = ({
  stepNumber,
  title,
  description,
  image,
  isActive,
  isPast,
  progress,
  index,
}: JourneyStepProps) => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isActive ? 1 : isPast ? 0.15 : 0,
        scale: isPast ? 0.92 : 1,
        filter: isPast ? "blur(8px)" : "blur(0px)",
      }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        zIndex: isActive ? 10 : isPast ? 5 - index : 0,
      }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isActive ? 1.08 : 1,
        }}
        transition={{
          duration: 8,
          ease: "easeOut",
        }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)]" />
        
        {/* Film Grain */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Gold Rim Light for Active Step */}
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "radial-gradient(ellipse at 50% 50%, hsla(43, 74%, 49%, 0.15) 0%, transparent 60%)",
            }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          {/* Step Number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 30,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="mb-6"
          >
            <span className="font-sans text-gold/70 text-sm tracking-[0.4em] uppercase">
              {stepNumber} — {title}
            </span>
          </motion.div>

          {/* Gold Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 40,
            }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-ivory/90 leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyStep;
