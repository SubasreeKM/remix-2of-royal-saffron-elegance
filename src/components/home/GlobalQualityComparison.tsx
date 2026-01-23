import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Quality metrics data with scores (out of 100)
const qualityMetrics = [
  {
    id: "aroma",
    name: "Aroma Intensity",
    tooltip: "Higher aroma intensity means a richer, more complex fragrance that elevates every dish.",
    scores: {
      zPrincess: 98,
      iranian: 78,
      spanish: 72,
      greek: 65,
    },
  },
  {
    id: "color",
    name: "Color Richness",
    tooltip: "Deeper color means more crocin content — the compound that gives saffron its prized golden hue.",
    scores: {
      zPrincess: 96,
      iranian: 75,
      spanish: 70,
      greek: 62,
    },
  },
  {
    id: "purity",
    name: "Purity Grade",
    tooltip: "Purity grade indicates the absence of additives and the concentration of pure saffron threads.",
    scores: {
      zPrincess: 99,
      iranian: 80,
      spanish: 75,
      greek: 70,
    },
  },
  {
    id: "crocin",
    name: "Crocin Content",
    tooltip: "Higher crocin content means deeper color, stronger aroma, and longer-lasting flavor in your dishes.",
    scores: {
      zPrincess: 97,
      iranian: 76,
      spanish: 68,
      greek: 60,
    },
  },
  {
    id: "overall",
    name: "Overall Premium Score",
    tooltip: "A comprehensive quality score based on laboratory testing, sensory evaluation, and culinary performance.",
    scores: {
      zPrincess: 98,
      iranian: 77,
      spanish: 71,
      greek: 64,
    },
  },
];

const brands = [
  { key: "zPrincess", name: "Z Princess Saffron", isPremium: true },
  { key: "iranian", name: "Iranian Saffron", isPremium: false },
  { key: "spanish", name: "Spanish Saffron", isPremium: false },
  { key: "greek", name: "Greek Saffron", isPremium: false },
];

// Convert score to star rating display
const ScoreToStars = ({ score, isPremium }: { score: number; isPremium: boolean }) => {
  const stars = Math.round(score / 20); // Convert 0-100 to 0-5 stars
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xs ${
            i < stars
              ? isPremium
                ? "text-gold"
                : "text-charcoal/40"
              : "text-charcoal/20"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// Animated horizontal bar component
const AnimatedBar = ({
  metric,
  brand,
  metricIndex,
  brandIndex,
  isInView,
}: {
  metric: typeof qualityMetrics[0];
  brand: typeof brands[0];
  metricIndex: number;
  brandIndex: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const score = metric.scores[brand.key as keyof typeof metric.scores];
  
  // Premium brand animates first and slower
  const baseDelay = metricIndex * 0.2;
  const brandDelay = brand.isPremium ? 0 : 0.15 + brandIndex * 0.08;
  const totalDelay = baseDelay + brandDelay;
  const duration = brand.isPremium ? 1.4 : 1;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Brand label and score */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    brand.isPremium
                      ? "text-gold"
                      : isHovered
                        ? "text-charcoal/80"
                        : "text-charcoal/50"
                  }`}
                >
                  {brand.name}
                </span>
                {brand.isPremium && (
                  <motion.span
                    className="px-2 py-0.5 bg-gradient-to-r from-gold/20 to-gold/10 text-gold text-[10px] font-semibold tracking-wider rounded-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: totalDelay + 0.3, duration: 0.4 }}
                  >
                    PREMIUM
                  </motion.span>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: totalDelay + 0.5, duration: 0.4 }}
              >
                <ScoreToStars score={score} isPremium={brand.isPremium} />
              </motion.div>
            </div>

            {/* Bar track */}
            <div className="relative h-3 rounded-full overflow-hidden bg-charcoal/5">
              {/* Animated fill */}
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  brand.isPremium
                    ? "bg-gradient-to-r from-gold via-gold-light to-gold"
                    : "bg-gradient-to-r from-charcoal/20 to-charcoal/30"
                }`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${score}%` } : {}}
                transition={{
                  duration: duration,
                  delay: totalDelay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
                style={{ width: `${score}%` }}
                animate={{
                  boxShadow: isHovered
                    ? brand.isPremium
                      ? "0 0 20px hsla(43, 76%, 55%, 0.5)"
                      : "0 0 12px hsla(0, 0%, 30%, 0.2)"
                    : "0 0 0px transparent",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Premium pulse glow */}
              {brand.isPremium && (
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
                  initial={{ width: 0 }}
                  animate={
                    isInView
                      ? {
                          width: `${score}%`,
                          boxShadow: [
                            "0 0 8px hsla(43, 76%, 55%, 0.3)",
                            "0 0 16px hsla(43, 76%, 55%, 0.5)",
                            "0 0 8px hsla(43, 76%, 55%, 0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    width: { duration: duration, delay: totalDelay, ease: [0.25, 0.1, 0.25, 1] },
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: totalDelay + duration,
                    },
                  }}
                />
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs bg-charcoal text-ivory px-4 py-3 rounded-sm border-none shadow-2xl"
        >
          <p className="text-sm leading-relaxed">{metric.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Metric section with all brand bars
const MetricSection = ({
  metric,
  metricIndex,
  isInView,
}: {
  metric: typeof qualityMetrics[0];
  metricIndex: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      className="mb-12 last:mb-0"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: metricIndex * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Metric heading */}
      <div className="flex items-center gap-4 mb-6">
        <motion.h3
          className="font-serif text-xl md:text-2xl text-charcoal"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: metricIndex * 0.15 + 0.1 }}
        >
          {metric.name}
        </motion.h3>
        <motion.div
          className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: metricIndex * 0.15 + 0.2 }}
        />
      </div>

      {/* All brand bars for this metric */}
      <div className="space-y-4">
        {brands.map((brand, brandIndex) => (
          <AnimatedBar
            key={brand.key}
            metric={metric}
            brand={brand}
            metricIndex={metricIndex}
            brandIndex={brandIndex}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
};

const GlobalQualityComparison = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const chartsInView = useInView(chartsRef, { once: true, margin: "-50px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.p
            className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How We Compare
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Quality That Speaks
          </motion.h2>
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p
            className="text-charcoal/60 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Measured by quality that matters — not mass production.
          </motion.p>
        </motion.div>

        {/* Animated Bar Charts */}
        <div
          ref={chartsRef}
          className="max-w-4xl mx-auto mb-16"
        >
          {qualityMetrics.map((metric, index) => (
            <MetricSection
              key={metric.id}
              metric={metric}
              metricIndex={index}
              isInView={chartsInView}
            />
          ))}
        </div>

        {/* Footer emphasis line + Trust Badge */}
        <motion.div
          ref={footerRef}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Emphasis line */}
          <motion.p
            className="font-serif text-xl md:text-2xl text-charcoal/80 italic mb-10"
            initial={{ opacity: 0 }}
            animate={footerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "Premium quality isn't claimed. It's demonstrated."
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-sm border border-gold/20"
            animate={{
              boxShadow: [
                "0 0 20px hsla(43, 76%, 55%, 0.1)",
                "0 0 40px hsla(43, 76%, 55%, 0.2)",
                "0 0 20px hsla(43, 76%, 55%, 0.1)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Award className="w-8 h-8 text-gold" />
            </motion.div>
            <div className="text-left">
              <p className="font-serif text-lg text-charcoal font-medium">
                Premium Quality
              </p>
              <p className="text-sm text-charcoal/60">
                Experience the Difference
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalQualityComparison;
