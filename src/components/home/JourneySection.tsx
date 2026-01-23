import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Journey stage images
import cultivationImage from "@/assets/journey-cultivation.jpg";
import pickingImage from "@/assets/journey-picking.jpg";
import extractionImage from "@/assets/journey-extraction.jpg";
import dryingImage from "@/assets/journey-drying.jpg";
import packagingImage from "@/assets/journey-packaging.jpg";

interface JourneyStage {
  id: string;
  title: string;
  poeticLine: string;
  image: string;
}

const journeyStages: JourneyStage[] = [
  {
    id: "cultivation",
    title: "Cultivation",
    poeticLine: "Where mist meets mountain, life begins.",
    image: cultivationImage,
  },
  {
    id: "picking",
    title: "Hand Picking",
    poeticLine: "Each bloom, a moment. Each touch, a prayer.",
    image: pickingImage,
  },
  {
    id: "extraction",
    title: "Extraction",
    poeticLine: "Three crimson threads. One golden promise.",
    image: extractionImage,
  },
  {
    id: "drying",
    title: "Drying & Grading",
    poeticLine: "Patience transforms nature into treasure.",
    image: dryingImage,
  },
  {
    id: "packaging",
    title: "Royal Packaging",
    poeticLine: "Sealed with craft. Delivered with pride.",
    image: packagingImage,
  },
];

const STAGE_HEIGHT = 100; // vh per stage for scroll calculation

const JourneyStage = ({
  stage,
  index,
  totalStages,
  scrollYProgress,
}: {
  stage: JourneyStage;
  index: number;
  totalStages: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  // Calculate the scroll range for this stage
  const stageStart = index / totalStages;
  const stageEnd = (index + 1) / totalStages;
  const stageMid = (stageStart + stageEnd) / 2;

  // Image visibility and zoom
  const imageOpacity = useTransform(
    scrollYProgress,
    [
      stageStart,
      stageStart + 0.02,
      stageEnd - 0.02,
      stageEnd,
    ],
    [0, 1, 1, 0]
  );

  // Slow cinematic zoom (starts at 1.15, settles to 1)
  const imageScale = useTransform(
    scrollYProgress,
    [stageStart, stageMid, stageEnd],
    [1.15, 1.05, 1]
  );

  // Subtle parallax - image moves slower than scroll
  const imageY = useTransform(
    scrollYProgress,
    [stageStart, stageEnd],
    ["5%", "-5%"]
  );

  // Text appears after image settles
  const textOpacity = useTransform(
    scrollYProgress,
    [stageStart + 0.04, stageStart + 0.08, stageEnd - 0.06, stageEnd - 0.02],
    [0, 1, 1, 0]
  );

  const textY = useTransform(
    scrollYProgress,
    [stageStart + 0.04, stageStart + 0.08],
    [30, 0]
  );

  // Gold highlight flash
  const goldOpacity = useTransform(
    scrollYProgress,
    [stageStart + 0.02, stageStart + 0.06, stageStart + 0.12],
    [0, 0.15, 0]
  );

  // Stage number reveal
  const numberOpacity = useTransform(
    scrollYProgress,
    [stageStart + 0.03, stageStart + 0.07],
    [0, 0.08]
  );

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      style={{ opacity: imageOpacity }}
    >
      {/* Full-bleed background image with zoom and parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ scale: imageScale, y: imageY }}
      >
        <img
          src={stage.image}
          alt={stage.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Soft vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

      {/* Gold highlight flash during transition */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gold/30 via-gold/10 to-transparent pointer-events-none"
        style={{ opacity: goldOpacity }}
      />

      {/* Stage number - subtle background element */}
      <motion.span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20rem] md:text-[30rem] text-white select-none pointer-events-none leading-none"
        style={{ opacity: numberOpacity }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Text content - appears after image settles */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-6 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        {/* Stage title */}
        <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-4 tracking-wide">
          {stage.title}
        </h3>

        {/* Gold divider */}
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6" />

        {/* Poetic line */}
        <p className="font-serif text-lg md:text-xl lg:text-2xl text-white/90 italic max-w-lg">
          {stage.poeticLine}
        </p>
      </motion.div>
    </motion.div>
  );
};

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress indicator dots
  const ProgressIndicator = () => {
    return (
      <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {journeyStages.map((stage, index) => {
          const stageStart = index / journeyStages.length;
          const stageEnd = (index + 1) / journeyStages.length;
          
          return (
            <ProgressDot
              key={stage.id}
              index={index}
              stageStart={stageStart}
              stageEnd={stageEnd}
              scrollYProgress={scrollYProgress}
              title={stage.title}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${journeyStages.length * STAGE_HEIGHT}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Journey stages */}
        {journeyStages.map((stage, index) => (
          <JourneyStage
            key={stage.id}
            stage={stage}
            index={index}
            totalStages={journeyStages.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Progress indicator */}
        <ProgressIndicator />

        {/* Scroll hint on first stage */}
        <ScrollHint scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
};

// Progress dot component
const ProgressDot = ({
  index,
  stageStart,
  stageEnd,
  scrollYProgress,
  title,
}: {
  index: number;
  stageStart: number;
  stageEnd: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  title: string;
}) => {
  const isActive = useTransform(scrollYProgress, (progress) => {
    return progress >= stageStart && progress < stageEnd;
  });

  const dotScale = useTransform(scrollYProgress, (progress) => {
    return progress >= stageStart && progress < stageEnd ? 1.5 : 1;
  });

  const dotOpacity = useTransform(scrollYProgress, (progress) => {
    return progress >= stageStart && progress < stageEnd ? 1 : 0.4;
  });

  return (
    <motion.div
      className="relative group flex items-center justify-end"
      style={{ scale: dotScale }}
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-gold transition-all duration-500"
        style={{ opacity: dotOpacity }}
      />
      {/* Tooltip on hover */}
      <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        <span className="text-sm text-white/80 font-sans tracking-wide">
          {title}
        </span>
      </div>
    </motion.div>
  );
};

// Scroll hint component
const ScrollHint = ({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) => {
  const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ opacity }}
    >
      <span className="text-white/60 text-sm font-sans tracking-widest uppercase">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
      />
    </motion.div>
  );
};

export default JourneySection;
