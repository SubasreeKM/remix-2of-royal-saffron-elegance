import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import harvestImage from "@/assets/saffron-harvest.jpg";
import fieldsImage from "@/assets/kashmir-fields.jpg";
import jarImage from "@/assets/product-saffron-jar.jpg";
import giftBoxImage from "@/assets/product-gift-box.jpg";

const journeySteps = [
  {
    step: "01",
    title: "Cultivation",
    subtitle: "The Sacred Fields",
    description: [
      "In the pristine valleys of Kashmir, at an altitude of 1,600 meters,",
      "Crocus sativus flowers are cultivated with ancestral wisdom",
      "passed down through generations. The unique microclimate",
      "and mineral-rich soil create conditions found nowhere else on earth.",
    ],
    image: fieldsImage,
  },
  {
    step: "02",
    title: "Hand Picking",
    subtitle: "Dawn's Delicate Harvest",
    description: [
      "Each autumn morning, before the first rays of sunlight touch the petals,",
      "skilled harvesters delicately pluck each flower by hand.",
      "This sacred ritual must be completed within hours,",
      "as the blooms are at their peak for mere moments.",
    ],
    image: harvestImage,
  },
  {
    step: "03",
    title: "Extraction",
    subtitle: "The Art of Separation",
    description: [
      "Master artisans carefully extract the three precious stigmas",
      "from each flower—a process requiring immense patience and precision.",
      "It takes over 150,000 flowers to produce",
      "a single kilogram of this crimson treasure.",
    ],
    image: jarImage,
  },
  {
    step: "04",
    title: "Royal Packaging",
    subtitle: "Preserved Perfection",
    description: [
      "The finest threads are gently dried using traditional methods,",
      "then graded by our experts for color, aroma, and crocin content.",
      "Each batch is sealed in airtight vessels",
      "to preserve its extraordinary potency and fragrance.",
    ],
    image: giftBoxImage,
  },
];

const JourneyCard = ({
  step,
  index,
}: {
  step: (typeof journeySteps)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Card container - smooth rise with fade and blur clearing
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.65, 0.8], [0, 0.3, 1, 1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.65, 0.8], [150, 60, 0, 0, -80]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 0.8], [0.88, 1, 1, 0.95]);
  const cardBlur = useTransform(scrollYProgress, [0, 0.25, 0.35], [8, 2, 0]);
  const cardBrightness = useTransform(scrollYProgress, [0.65, 0.8], [1, 0.7]);

  // Image cinematic zoom with parallax (moves slower than card)
  const imageScale = useTransform(scrollYProgress, [0, 0.35, 0.7], [1.12, 1.04, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -30]); // Parallax effect
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [0.4, 0.8, 1]);
  
  // Image mask reveal - clip from bottom to top
  const imageMaskY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  // Step number fade-in (appears first as background layer)
  const stepOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 0.06, 0.12]);
  const stepY = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);
  const stepScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);

  // Gold glow pulse during entry
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.5], [0, 0.2, 0.04]);

  // Gold divider expansion
  const dividerWidth = useTransform(scrollYProgress, [0.28, 0.5], [0, 72]);
  const dividerOpacity = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);

  // Subtitle animation
  const subtitleOpacity = useTransform(scrollYProgress, [0.2, 0.38], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.2, 0.38], [25, 0]);

  // Title animation - slides up after subtitle
  const titleOpacity = useTransform(scrollYProgress, [0.25, 0.42], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.25, 0.42], [30, 0]);

  // Line-by-line description animation
  const getLineAnimation = (lineIndex: number) => {
    const baseStart = 0.32 + lineIndex * 0.04;
    const baseEnd = baseStart + 0.12;
    return {
      opacity: useTransform(scrollYProgress, [baseStart, baseEnd], [0, 1]),
      y: useTransform(scrollYProgress, [baseStart, baseEnd], [18, 0]),
    };
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        opacity: cardOpacity, 
        y: cardY, 
        scale: cardScale,
        filter: useTransform(cardBlur, (v) => `blur(${v}px)`),
      }}
      className="min-h-[90vh] flex items-center justify-center px-4 md:px-8 lg:px-16 py-8"
    >
      <motion.div
        style={{ filter: useTransform(cardBrightness, (v) => `brightness(${v})`) }}
        className={`
          relative w-full max-w-6xl rounded-sm overflow-hidden
          bg-gradient-to-br from-royal-purple/50 via-royal-purple-dark/70 to-royal-purple/40
          border border-gold/25 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop-blur-sm
        `}
      >
        {/* Animated gold glow effect during entry */}
        <motion.div 
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(43,70%,50%,0.25)_0%,_transparent_60%)] pointer-events-none"
        />
        
        {/* Static inner shimmer */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3 pointer-events-none" />

        <div
          className={`
            relative grid grid-cols-1 lg:grid-cols-2 gap-0
            ${isEven ? "" : "lg:grid-flow-col-dense"}
          `}
        >
          {/* Image Side with cinematic reveal */}
          <div
            className={`
              relative h-80 lg:h-[520px] overflow-hidden
              ${isEven ? "lg:order-1" : "lg:order-2"}
            `}
          >
            {/* Image container with parallax and mask */}
            <motion.div
              style={{ 
                scale: imageScale, 
                y: imageY,
                opacity: imageOpacity,
              }}
              className="absolute inset-0 overflow-hidden"
            >
              {/* Mask reveal from bottom */}
              <motion.div
                style={{ 
                  clipPath: useTransform(imageMaskY, (v) => `inset(${v}% 0 0 0)`),
                }}
                className="absolute inset-0"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            
            {/* Image overlay for depth blending */}
            <div
              className={`
                absolute inset-0 
                ${isEven 
                  ? "bg-gradient-to-r from-transparent via-transparent to-royal-purple-dark/90" 
                  : "bg-gradient-to-l from-transparent via-transparent to-royal-purple-dark/90"
                }
              `}
            />
            {/* Cinematic vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/50 via-transparent to-royal-purple-dark/20" />
            {/* Soft light overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Content Side */}
          <div
            className={`
              relative p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center min-h-[320px]
              ${isEven ? "lg:order-2" : "lg:order-1"}
            `}
          >
            {/* Large Step Number - fades in first as background layer */}
            <motion.span 
              style={{ opacity: stepOpacity, y: stepY, scale: stepScale }}
              className="font-serif text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-bold text-gold absolute top-2 right-6 lg:top-4 lg:right-10 select-none pointer-events-none leading-none"
            >
              {step.step}
            </motion.span>

            {/* Content with staggered animations */}
            <div className="relative z-10">
              {/* Subtitle */}
              <motion.p 
                style={{ opacity: subtitleOpacity, y: subtitleY }}
                className="font-sans text-gold text-xs md:text-sm tracking-[0.35em] uppercase mb-3 md:mb-4"
              >
                {step.subtitle}
              </motion.p>

              {/* Title */}
              <motion.h3 
                style={{ opacity: titleOpacity, y: titleY }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-ivory mb-5 md:mb-7 tracking-tight"
              >
                {step.title}
              </motion.h3>

              {/* Gold divider - expands with glow */}
              <motion.div 
                style={{ width: dividerWidth, opacity: dividerOpacity }}
                className="h-px bg-gradient-to-r from-gold via-gold/70 to-transparent mb-6 md:mb-8 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
              />

              {/* Description - line by line animation */}
              <div className="space-y-1">
                {step.description.map((line, lineIndex) => {
                  const lineAnim = getLineAnimation(lineIndex);
                  return (
                    <motion.p 
                      key={lineIndex}
                      style={{ opacity: lineAnim.opacity, y: lineAnim.y }}
                      className="font-sans text-ivory/80 text-base md:text-lg leading-relaxed"
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gold accent line with subtle glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent shadow-[0_-2px_10px_rgba(212,175,55,0.15)]" />
      </motion.div>
    </motion.div>
  );
};

const JourneySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Background gradient shift based on overall scroll position
  const bgHue = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [270, 280, 275, 268]);
  const bgSaturation = useTransform(scrollYProgress, [0, 0.5, 1], [45, 40, 48]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Dynamic background that shifts subtly */}
      <motion.div 
        style={{
          background: useTransform(
            [bgHue, bgSaturation],
            ([h, s]) => `linear-gradient(180deg, 
              hsl(${h}, ${s}%, 12%) 0%, 
              hsl(${Number(h) + 5}, ${Number(s) - 5}%, 15%) 25%,
              hsl(${Number(h) - 3}, ${s}%, 13%) 50%,
              hsl(${Number(h) + 2}, ${Number(s) + 3}%, 11%) 75%,
              hsl(${h}, ${s}%, 10%) 100%
            )`
          ),
        }}
        className="absolute inset-0"
      />
      
      {/* Subtle radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsla(270,45%,25%,0.3)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsla(280,40%,18%,0.4)_0%,_transparent_60%)] pointer-events-none" />

      {/* Section Header */}
      <div className="relative pt-24 pb-12 md:pt-36 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto px-6"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-gold text-sm tracking-[0.4em] uppercase mb-5"
          >
            From Flower to You
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-7"
          >
            Journey of Saffron
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-28 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 origin-center"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-ivory/55 text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Witness the meticulous artistry behind the world's most precious spice, 
            from the misty fields of Kashmir to your table.
          </motion.p>
        </motion.div>
      </div>

      {/* Journey Cards */}
      <div className="relative pb-24 md:pb-36">
        {journeySteps.map((step, index) => (
          <JourneyCard key={step.step} step={step} index={index} />
        ))}
      </div>

      {/* Bottom atmospheric fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-royal-purple-dark via-royal-purple-dark/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default JourneySection;
