import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import harvestImage from "@/assets/saffron-harvest.jpg";
import fieldsImage from "@/assets/kashmir-fields.jpg";
import jarImage from "@/assets/product-saffron-jar.jpg";
import giftBoxImage from "@/assets/product-gift-box.jpg";

// Journey stages data
const journeyStages = [
  {
    id: 1,
    step: "01",
    title: "Cultivation",
    subtitle: "The Sacred Fields",
    description: "In the sacred valleys of Kashmir, nature begins her finest work.",
    image: fieldsImage,
  },
  {
    id: 2,
    step: "02",
    title: "Hand Picking",
    subtitle: "Dawn's Delicate Harvest",
    description: "Before sunrise, skilled hands gather blooms at their peak of perfection.",
    image: harvestImage,
  },
  {
    id: 3,
    step: "03",
    title: "Stigma Extraction",
    subtitle: "The Art of Separation",
    description: "Three precious threads emerge from each flower — nature's crimson treasure.",
    image: jarImage,
  },
  {
    id: 4,
    step: "04",
    title: "Drying & Grading",
    subtitle: "Preserved Excellence",
    description: "Traditional methods transform delicate threads into enduring gold.",
    image: harvestImage,
  },
  {
    id: 5,
    step: "05",
    title: "Royal Packaging",
    subtitle: "The Final Touch",
    description: "Sealed with heritage, delivered with pride — from Kashmir to you.",
    image: giftBoxImage,
  },
];

// Floating particles component
const SaffronParticles = ({ scrollProgress }: { scrollProgress: number }) => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gold/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30 * scrollProgress, -60 * scrollProgress],
            x: [0, Math.sin(particle.delay) * 20],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Single stage component with full-screen overlay
const JourneyStage = ({
  stage,
  progress,
  isActive,
  isMobile,
}: {
  stage: (typeof journeyStages)[0];
  progress: number;
  isActive: boolean;
  isMobile: boolean;
}) => {
  // Calculate opacity and transforms based on progress
  const opacity = isActive ? Math.min(progress * 3, 1) : Math.max(1 - (progress - 1) * 3, 0);
  const scale = isActive ? 1 + (1 - progress) * 0.1 : 1 - progress * 0.05;
  const imageScale = 1.1 - progress * 0.1;
  const textOpacity = isActive && progress > 0.3 ? Math.min((progress - 0.3) * 2, 1) : 0;
  const textY = isActive ? Math.max(30 - progress * 60, 0) : 30;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        opacity,
        zIndex: isActive ? 10 : 5,
      }}
    >
      {/* Background image with cinematic zoom */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: imageScale,
        }}
      >
        <img
          src={stage.image}
          alt={stage.title}
          className="w-full h-full object-cover"
        />
        {/* Cinematic vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/90 via-royal-purple-dark/40 to-royal-purple-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-purple-dark/50 via-transparent to-royal-purple-dark/50" />
        {/* Film grain texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Content overlay */}
      <div className={`relative z-10 ${isMobile ? 'px-6' : 'px-12 lg:px-24'} max-w-4xl mx-auto text-center`}>
        {/* Stage number - large translucent */}
        <motion.span
          className={`block font-serif ${isMobile ? 'text-[120px]' : 'text-[180px] lg:text-[240px]'} font-bold text-gold/10 leading-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          style={{
            opacity: textOpacity * 0.5,
          }}
        >
          {stage.step}
        </motion.span>

        {/* Text content */}
        <motion.div
          className="relative"
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          {/* Subtitle */}
          <p className={`font-sans text-gold ${isMobile ? 'text-xs' : 'text-sm'} tracking-[0.4em] uppercase mb-3`}>
            {stage.subtitle}
          </p>

          {/* Title */}
          <h3 className={`font-serif ${isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} text-ivory mb-6 tracking-tight`}>
            {stage.title}
          </h3>

          {/* Gold divider */}
          <motion.div
            className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
            style={{
              scaleX: textOpacity,
            }}
          />

          {/* Description */}
          <p className={`font-sans text-ivory/70 ${isMobile ? 'text-base' : 'text-lg lg:text-xl'} leading-relaxed max-w-lg mx-auto italic`}>
            "{stage.description}"
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Progress indicator
const ProgressIndicator = ({ 
  currentStage, 
  totalStages,
  isMobile,
}: { 
  currentStage: number; 
  totalStages: number;
  isMobile: boolean;
}) => {
  return (
    <div className={`absolute ${isMobile ? 'bottom-8 left-1/2 -translate-x-1/2 flex-row gap-3' : 'right-8 top-1/2 -translate-y-1/2 flex-col gap-4'} flex z-20`}>
      {Array.from({ length: totalStages }, (_, i) => (
        <motion.div
          key={i}
          className={`${isMobile ? 'w-2 h-2' : 'w-2 h-8'} rounded-full transition-all duration-500`}
          style={{
            backgroundColor: i <= currentStage 
              ? 'hsl(43, 76%, 55%)' 
              : 'hsla(40, 40%, 97%, 0.3)',
          }}
          animate={{
            scale: i === currentStage ? 1.2 : 1,
          }}
        />
      ))}
    </div>
  );
};

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress for the entire pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track current stage based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stageIndex = Math.min(
      Math.floor(latest * journeyStages.length),
      journeyStages.length - 1
    );
    setCurrentStageIndex(stageIndex);
  });

  // Calculate progress for each stage
  const getStageProgress = (stageIndex: number, scrollProgress: number) => {
    const stageSize = 1 / journeyStages.length;
    const stageStart = stageIndex * stageSize;
    const stageEnd = (stageIndex + 1) * stageSize;
    
    if (scrollProgress < stageStart) return 0;
    if (scrollProgress > stageEnd) return 1;
    return (scrollProgress - stageStart) / stageSize;
  };

  // Background gradient transition
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.9, 1, 1, 0.8]
  );

  // Final transition to ivory
  const finalOverlayOpacity = useTransform(
    scrollYProgress,
    [0.85, 1],
    [0, 1]
  );

  return (
    <>
      {/* Scroll container - 500vh to create scroll distance */}
      <div 
        ref={containerRef} 
        className="relative"
        style={{ height: `${journeyStages.length * 100}vh` }}
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background base */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark via-royal-purple to-royal-purple-dark"
            style={{ opacity: bgOpacity }}
          />

          {/* Particles */}
          <SaffronParticles scrollProgress={currentStageIndex / journeyStages.length} />

          {/* Section header - only visible at start */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
            }}
          >
            <div className="text-center px-6">
              <motion.p 
                className={`font-sans text-gold ${isMobile ? 'text-xs' : 'text-sm'} tracking-[0.4em] uppercase mb-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                The Sacred Process
              </motion.p>
              <motion.h2 
                className={`font-serif ${isMobile ? 'text-3xl' : 'text-5xl lg:text-6xl'} text-ivory mb-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Journey of Saffron
              </motion.h2>
              <motion.div 
                className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.p
                className={`font-sans text-ivory/50 ${isMobile ? 'text-sm' : 'text-base'} mt-6`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Scroll to begin the story
              </motion.p>
            </div>
          </motion.div>

          {/* Journey stages */}
          {journeyStages.map((stage, index) => {
            const stageProgress = getStageProgress(index, scrollYProgress.get());
            const isActive = index === currentStageIndex;
            const isPast = index < currentStageIndex;

            return (
              <motion.div
                key={stage.id}
                className="absolute inset-0"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [
                      index / journeyStages.length - 0.05,
                      index / journeyStages.length,
                      (index + 1) / journeyStages.length - 0.1,
                      (index + 1) / journeyStages.length,
                    ],
                    [0, 1, 1, index === journeyStages.length - 1 ? 1 : 0]
                  ),
                  scale: useTransform(
                    scrollYProgress,
                    [
                      index / journeyStages.length,
                      (index + 0.5) / journeyStages.length,
                      (index + 1) / journeyStages.length,
                    ],
                    [1.05, 1, isPast ? 0.95 : 1]
                  ),
                }}
              >
                <JourneyStage
                  stage={stage}
                  progress={stageProgress}
                  isActive={isActive || index === currentStageIndex}
                  isMobile={isMobile}
                />
              </motion.div>
            );
          })}

          {/* Progress indicator */}
          <ProgressIndicator 
            currentStage={currentStageIndex} 
            totalStages={journeyStages.length}
            isMobile={isMobile}
          />

          {/* Final transition overlay to ivory */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory to-ivory pointer-events-none z-40"
            style={{ opacity: finalOverlayOpacity }}
          />

          {/* Closing message */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
            style={{
              opacity: useTransform(scrollYProgress, [0.92, 0.98], [0, 1]),
            }}
          >
            <div className="text-center px-6">
              <p className={`font-serif ${isMobile ? 'text-2xl' : 'text-3xl lg:text-4xl'} text-royal-purple italic`}>
                "Premium quality isn't claimed. It's crafted."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default JourneySection;
