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

// Comparison data with multiple metrics
const comparisonData = [
  { 
    country: "Kashmir (India)", 
    flag: "🇮🇳",
    isOurs: true,
    metrics: {
      quality: 98,
      purity: 99,
      aroma: 96,
      color: 97,
      weight: 95,
      price: 85,
    }
  },
  { 
    country: "Iran", 
    flag: "🇮🇷",
    isOurs: false,
    metrics: {
      quality: 75,
      purity: 72,
      aroma: 78,
      color: 74,
      weight: 70,
      price: 65,
    }
  },
  { 
    country: "Spain", 
    flag: "🇪🇸",
    isOurs: false,
    metrics: {
      quality: 68,
      purity: 65,
      aroma: 70,
      color: 72,
      weight: 62,
      price: 58,
    }
  },
  { 
    country: "Greece", 
    flag: "🇬🇷",
    isOurs: false,
    metrics: {
      quality: 62,
      purity: 60,
      aroma: 64,
      color: 66,
      weight: 58,
      price: 52,
    }
  },
];

type MetricKey = keyof typeof comparisonData[0]["metrics"];

const metricLabels: Record<MetricKey, { label: string; unit: string; description: string }> = {
  quality: { label: "Overall Quality", unit: "%", description: "ISO Grade Assessment" },
  purity: { label: "Purity Level", unit: "%", description: "Lab-tested authenticity" },
  aroma: { label: "Aroma Intensity", unit: "pts", description: "Sensory evaluation score" },
  color: { label: "Color Strength", unit: "pts", description: "Crocin concentration" },
  weight: { label: "Strand Weight", unit: "mg", description: "Per gram density" },
  price: { label: "Value Score", unit: "pts", description: "Quality-to-price ratio" },
};

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

// Interactive Dashboard Component
const QualityDashboard = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("quality");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(dashboardRef, { once: true, margin: "-100px" });

  const sortedData = [...comparisonData].sort(
    (a, b) => b.metrics[selectedMetric] - a.metrics[selectedMetric]
  );

  const maxValue = Math.max(...comparisonData.map(d => d.metrics[selectedMetric]));

  return (
    <motion.div
      ref={dashboardRef}
      className="bg-white rounded-lg shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-charcoal to-charcoal-light px-6 py-5 border-b border-charcoal/10">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif text-xl text-white">Live Quality Metrics</h4>
            <p className="text-white/60 text-sm mt-1">Real-time comparison dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/70 text-xs uppercase tracking-wider">Live Data</span>
          </div>
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(metricLabels) as MetricKey[]).map((metric) => (
            <motion.button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                selectedMetric === metric
                  ? "bg-gradient-to-r from-gold to-gold-dark text-charcoal shadow-md"
                  : "bg-white text-charcoal/70 hover:bg-gray-100 border border-gray-200"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {metricLabels[metric].label}
            </motion.button>
          ))}
        </div>
        <p className="text-charcoal/50 text-xs mt-3">
          {metricLabels[selectedMetric].description}
        </p>
      </div>

      {/* Comparison Results */}
      <div className="p-6 lg:p-8 bg-white">
        <div className="space-y-5">
          {sortedData.map((item, index) => {
            const value = item.metrics[selectedMetric];
            const percentage = (value / maxValue) * 100;
            const isHovered = hoveredCountry === item.country;

            return (
              <motion.div
                key={item.country}
                className={`relative p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                  item.isOurs 
                    ? "bg-gradient-to-r from-gold/10 to-gold/5 border-2 border-gold/30" 
                    : "bg-gray-50 border border-gray-100 hover:border-gray-200"
                } ${isHovered ? "shadow-lg" : ""}`}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCountry(item.country)}
                onMouseLeave={() => setHoveredCountry(null)}
                whileHover={{ y: -2 }}
              >
                {/* Rank Badge */}
                <div className={`absolute -left-3 -top-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 
                    ? "bg-gradient-to-br from-gold to-gold-dark text-charcoal shadow-lg" 
                    : "bg-gray-200 text-charcoal/60"
                }`}>
                  {index + 1}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <span className={`font-medium ${item.isOurs ? "text-charcoal" : "text-charcoal/80"}`}>
                        {item.country}
                      </span>
                      {item.isOurs && (
                        <motion.span
                          className="ml-2 px-2 py-0.5 bg-gradient-to-r from-gold to-gold-dark text-charcoal text-xs font-semibold rounded"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          Our Saffron
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.span 
                      className={`text-2xl font-bold ${item.isOurs ? "text-gold-dark" : "text-charcoal/70"}`}
                      key={`${item.country}-${selectedMetric}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {value}
                    </motion.span>
                    <span className="text-charcoal/40 text-sm ml-1">
                      {metricLabels[selectedMetric].unit}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden ml-4">
                  <motion.div
                    className={`h-full rounded-full ${
                      item.isOurs 
                        ? "bg-gradient-to-r from-gold via-gold-light to-gold" 
                        : "bg-gradient-to-r from-gray-400 to-gray-300"
                    }`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : {}}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.1 + 0.3,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    key={`${item.country}-${selectedMetric}-bar`}
                  />
                </div>

                {/* Gold glow for our saffron */}
                {item.isOurs && (
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 hsla(43, 76%, 55%, 0)",
                        "0 0 20px 2px hsla(43, 76%, 55%, 0.2)",
                        "0 0 0 0 hsla(43, 76%, 55%, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <motion.div 
          className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            { label: "Regions Analyzed", value: "4" },
            { label: "Quality Tests", value: "12+" },
            { label: "Lab Certified", value: "ISO 3632" },
            { label: "Our Rank", value: "#1" },
          ].map((stat, idx) => (
            <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-charcoal font-bold text-lg">{stat.value}</p>
              <p className="text-charcoal/50 text-xs uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </motion.div>
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

        {/* Global Quality Comparison - White Theme Dashboard */}
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

          {/* Interactive Dashboard */}
          <QualityDashboard />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
