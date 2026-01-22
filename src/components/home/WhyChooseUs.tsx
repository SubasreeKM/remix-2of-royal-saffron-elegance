import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Benefit data with cinematic imagery
const benefits = [
  {
    id: "health",
    title: "Health Benefits",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80",
    points: [
      "Promotes pregnancy wellness",
      "Boosts immunity",
      "Improves mood",
      "Supports heart health naturally",
    ],
  },
  {
    id: "beauty",
    title: "Beauty Benefits",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=80",
    points: [
      "Enhances natural glow",
      "Promotes fairness",
      "Reduces blemishes",
      "Revitalizes skin radiance",
    ],
  },
  {
    id: "culinary",
    title: "Culinary Benefits",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80",
    points: [
      "Elevates biryani aroma",
      "Enriches desserts",
      "Adds golden hue",
      "Creates unforgettable flavors",
    ],
  },
];

const comparisonData = [
  { country: "Kashmir (India)", quality: 98, isOurs: true },
  { country: "Iran", quality: 75, isOurs: false },
  { country: "Spain", quality: 68, isOurs: false },
  { country: "Greece", quality: 62, isOurs: false },
];

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: [null, "-20%"],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Cinematic benefit card component
const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-sm group cursor-pointer"
      style={{ height: "500px" }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cinematic image with zoom effect */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img
          src={benefit.image}
          alt={benefit.title}
          className="w-full h-full object-cover"
        />
        {/* Film grain overlay */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/95 via-royal-purple-dark/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-royal-purple-dark/60" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
        {/* Title with gold underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
        >
          <h3 className="font-serif text-2xl lg:text-3xl text-ivory mb-3">
            {benefit.title}
          </h3>
          <motion.div
            className="h-px bg-gradient-to-r from-gold via-gold-light to-transparent mb-6"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isHovered ? { scaleX: 1 } : { scaleX: 0.5 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>

        {/* Benefit points */}
        <ul className="space-y-2">
          {benefit.points.map((point, pointIndex) => (
            <motion.li
              key={point}
              className="flex items-center gap-3 text-ivory/90 text-sm lg:text-base"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 + 0.4 + pointIndex * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {point}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          boxShadow: "inset 0 0 100px hsla(43, 76%, 55%, 0.15)",
        }}
      />
    </motion.div>
  );
};

// Quality comparison bar component
const QualityBar = ({ item, index }: { item: typeof comparisonData[0]; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={barRef}
      className={`relative py-6 ${item.isOurs ? "z-10" : ""}`}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Country label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`font-sans text-base ${item.isOurs ? "text-ivory font-medium" : "text-ivory/60"}`}>
            {item.country}
          </span>
          {item.isOurs && (
            <motion.span
              className="px-3 py-1 bg-gradient-to-r from-gold to-gold-dark text-royal-purple-dark text-xs font-semibold tracking-wide rounded-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
            >
              Our Saffron
            </motion.span>
          )}
        </div>
      </div>

      {/* Glowing quality bar */}
      <div className={`relative h-3 rounded-full overflow-hidden ${item.isOurs ? "shadow-gold-glow" : ""}`}>
        {/* Background track */}
        <div className="absolute inset-0 bg-royal-purple-light/30 backdrop-blur-sm" />
        
        {/* Animated fill bar */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${
            item.isOurs 
              ? "bg-gradient-to-r from-gold via-gold-light to-gold" 
              : "bg-royal-purple-light/50"
          }`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.quality}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.15 + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Gold glow pulse for our saffron */}
        {item.isOurs && (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${item.quality}%` }}
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: [0.3, 0.6, 0.3],
              boxShadow: [
                "0 0 20px hsla(43, 76%, 55%, 0.3)",
                "0 0 40px hsla(43, 76%, 55%, 0.5)",
                "0 0 20px hsla(43, 76%, 55%, 0.3)",
              ]
            } : {}}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, hsl(270 50% 12%) 0%, hsl(270 45% 15%) 50%, hsl(270 50% 12%) 100%)" 
      }}
    >
      {/* Floating particles */}
      <FloatingParticles />

      {/* Parallax background texture */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            opacity: 0.15,
          }}
        />
      </motion.div>

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-royal-purple-dark/80" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-20"
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
            Unmatched Excellence
          </motion.p>
          <motion.h2 
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Why Choose Our Saffron
          </motion.h2>
          <motion.div 
            className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p 
            className="text-ivory/70 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Discover the three pillars that make Z Princess Saffron the choice of connoisseurs worldwide.
          </motion.p>
        </motion.div>

        {/* Cinematic Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-32">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>

        {/* Global Quality Comparison */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-gold/80 text-sm tracking-[0.3em] uppercase mb-4">
              Global Excellence
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-ivory mb-4">
              Quality Comparison
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto" />
          </motion.div>

          {/* Quality bars container */}
          <div 
            className="relative p-8 lg:p-12 rounded-sm"
            style={{
              background: "linear-gradient(135deg, hsla(270, 45%, 20%, 0.5) 0%, hsla(270, 50%, 15%, 0.5) 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Subtle background pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, hsla(43, 76%, 55%, 0.1) 0%, transparent 50%)",
              }}
            />
            
            <div className="relative space-y-2">
              {comparisonData.map((item, index) => (
                <QualityBar key={item.country} item={item} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
