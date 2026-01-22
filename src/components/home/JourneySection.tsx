import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import JourneyStep from "./journey/JourneyStep";
import FloatingSaffronDust from "./journey/FloatingSaffronDust";
import ScrollProgressIndicator from "./journey/ScrollProgressIndicator";
import { useScrollLock } from "./journey/useScrollLock";

// Journey steps data with cinematic imagery
const journeySteps = [
  {
    step: "01",
    title: "Cultivation",
    description:
      "Crocus sativus flowers are grown in the pristine valleys of Kashmir at optimal altitude.",
    image:
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "02",
    title: "Hand Picking",
    description:
      "Each flower is delicately hand-picked at dawn before the petals fully open.",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "03",
    title: "Extraction",
    description:
      "The precious three stigmas are carefully extracted by skilled artisans.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "04",
    title: "Drying & Grading",
    description:
      "Stigmas are dried and graded based on color, aroma, and crocin content.",
    image:
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    step: "05",
    title: "Royal Packaging",
    description:
      "The finest threads are packaged in airtight containers to preserve freshness.",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=2070&auto=format&fit=crop",
  },
];

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { sectionRef, currentStep, isLocked, isComplete } = useScrollLock({
    totalSteps: journeySteps.length,
    scrollSensitivity: 0.6,
    stepThreshold: 80,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-royal-purple-dark"
    >
      {/* Sticky Container */}
      <div 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ 
          position: isLocked ? "fixed" : "relative",
          top: isLocked ? 0 : "auto",
          left: 0,
          right: 0,
          zIndex: isLocked ? 40 : 1,
        }}
      >
        {/* Deep Background Layer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark via-[hsl(270,35%,8%)] to-royal-purple-dark"
          style={{ y: backgroundY }}
        />

        {/* Ambient Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(43,74%,49%,0.03)_0%,_transparent_50%)]" />

        {/* Floating Saffron Dust */}
        <FloatingSaffronDust count={40} />

        {/* Section Header - Fades out as journey progresses */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-20 pt-20 pb-8"
          animate={{
            opacity: currentStep === 0 && isLocked ? 1 : 0,
            y: currentStep === 0 && isLocked ? 0 : -30,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="text-center max-w-2xl mx-auto px-6">
            <motion.p
              className="font-sans text-gold/70 text-xs tracking-[0.4em] uppercase mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              From Flower to You
            </motion.p>
            <motion.h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Journey of a Saffron Thread
            </motion.h2>
            <motion.div
              className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Journey Steps - Stacked Full Screen */}
        <div className="absolute inset-0">
          {journeySteps.map((step, index) => (
            <JourneyStep
              key={step.step}
              stepNumber={step.step}
              title={step.title}
              description={step.description}
              image={step.image}
              isActive={currentStep === index}
              isPast={currentStep > index}
              progress={scrollYProgress}
              index={index}
              totalSteps={journeySteps.length}
            />
          ))}
        </div>

        {/* Scroll Progress Indicator */}
        {isLocked && (
          <ScrollProgressIndicator
            currentStep={currentStep}
            totalSteps={journeySteps.length}
          />
        )}

        {/* Scroll Hint */}
        {isLocked && currentStep === 0 && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="w-6 h-10 border border-gold/30 rounded-full mx-auto mb-3 relative"
              animate={{ borderColor: ["hsla(43, 74%, 49%, 0.3)", "hsla(43, 74%, 49%, 0.6)", "hsla(43, 74%, 49%, 0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-1 h-2 bg-gold/60 rounded-full"
                animate={{ 
                  top: ["20%", "60%", "20%"],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <p className="text-ivory/40 text-xs tracking-[0.2em] uppercase font-sans">
              Scroll to explore
            </p>
          </motion.div>
        )}

        {/* Complete Transition Overlay */}
        <motion.div
          className="absolute inset-0 bg-royal-purple-dark pointer-events-none z-30"
          animate={{
            opacity: isComplete ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Bottom Vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-royal-purple-dark via-royal-purple-dark/50 to-transparent pointer-events-none z-20" />
      </div>

      {/* Spacer for scroll flow */}
      <div 
        className="h-screen" 
        style={{ 
          visibility: isLocked ? "visible" : "hidden",
          pointerEvents: "none",
        }} 
      />
    </section>
  );
};

export default JourneySection;
