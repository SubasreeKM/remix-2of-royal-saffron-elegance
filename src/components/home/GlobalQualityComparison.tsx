import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award } from "lucide-react";

// Comprehensive comparison data
const comparisonAttributes = [
  {
    attribute: "Origin",
    zPrincess: "Pampore, Kashmir",
    spanish: "La Mancha",
    iranian: "Khorasan",
    greek: "Kozani",
  },
  {
    attribute: "Grade",
    zPrincess: "Super Negin (A++)",
    spanish: "Coupe (A)",
    iranian: "Sargol (A)",
    greek: "Grade A",
  },
  {
    attribute: "Aroma Strength",
    zPrincess: 5,
    spanish: 3,
    iranian: 4,
    greek: 3,
    isRating: true,
  },
  {
    attribute: "Color Intensity",
    zPrincess: "Deep Crimson",
    spanish: "Red",
    iranian: "Red-Orange",
    greek: "Orange-Red",
  },
  {
    attribute: "Usage",
    zPrincess: "Culinary • Medicinal • Beauty",
    spanish: "Culinary",
    iranian: "Culinary",
    greek: "Culinary",
  },
];

const countries = [
  { key: "zPrincess", name: "Z Princess Saffron", isOurs: true },
  { key: "spanish", name: "Spanish", isOurs: false },
  { key: "iranian", name: "Iranian", isOurs: false },
  { key: "greek", name: "Greek", isOurs: false },
];

// Star rating component
const StarRating = ({ rating, isOurs }: { rating: number; isOurs: boolean }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className={`text-sm ${
            i < rating
              ? isOurs
                ? "text-gold"
                : "text-charcoal/40"
              : "text-charcoal/20"
          }`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
};

// Comparison card for each country
const ComparisonCard = ({
  country,
  index,
}: {
  country: (typeof countries)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-sm overflow-hidden ${
        country.isOurs ? "col-span-full lg:col-span-1" : ""
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card background */}
      <div
        className={`p-6 lg:p-8 h-full transition-all duration-500 ${
          country.isOurs
            ? "bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border-2 border-gold/30"
            : "bg-charcoal/5 border border-charcoal/10"
        }`}
      >
        {/* Gold glow for our saffron */}
        {country.isOurs && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? "inset 0 0 60px hsla(43, 76%, 55%, 0.15)"
                : "inset 0 0 30px hsla(43, 76%, 55%, 0.08)",
            }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h4
            className={`font-serif text-lg lg:text-xl ${
              country.isOurs ? "text-gold" : "text-charcoal/70"
            }`}
          >
            {country.name}
          </h4>
          {country.isOurs && (
            <motion.span
              className="px-3 py-1 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-semibold tracking-wide rounded-sm shadow-lg"
              animate={{
                boxShadow: [
                  "0 4px 20px hsla(43, 76%, 55%, 0.3)",
                  "0 4px 30px hsla(43, 76%, 55%, 0.5)",
                  "0 4px 20px hsla(43, 76%, 55%, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Our Saffron
            </motion.span>
          )}
        </div>

        {/* Gold divider */}
        <motion.div
          className={`h-px mb-6 ${
            country.isOurs
              ? "bg-gradient-to-r from-gold via-gold-light to-gold"
              : "bg-charcoal/20"
          }`}
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
        />

        {/* Attributes */}
        <div className="space-y-4">
          {comparisonAttributes.map((attr, attrIndex) => {
            const value = attr[country.key as keyof typeof attr];
            return (
              <motion.div
                key={attr.attribute}
                className="flex justify-between items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15 + attrIndex * 0.08 + 0.4,
                }}
              >
                <span
                  className={`text-sm ${
                    country.isOurs ? "text-charcoal/80" : "text-charcoal/50"
                  }`}
                >
                  {attr.attribute}
                </span>
                <span
                  className={`text-sm text-right font-medium ${
                    country.isOurs ? "text-charcoal" : "text-charcoal/60"
                  }`}
                >
                  {attr.isRating ? (
                    <StarRating
                      rating={value as number}
                      isOurs={country.isOurs}
                    />
                  ) : (
                    value
                  )}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Quality progress bar */}
        <div className="mt-6 pt-6 border-t border-charcoal/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-charcoal/50 uppercase tracking-wider">
              Overall Quality
            </span>
          </div>
          <div className="relative h-2 rounded-full overflow-hidden bg-charcoal/10">
            <motion.div
              className={`absolute inset-y-0 left-0 rounded-full ${
                country.isOurs
                  ? "bg-gradient-to-r from-gold via-gold-light to-gold"
                  : "bg-charcoal/30"
              }`}
              initial={{ width: 0 }}
              animate={
                isInView
                  ? {
                      width: country.isOurs
                        ? "98%"
                        : country.key === "iranian"
                          ? "75%"
                          : country.key === "spanish"
                            ? "68%"
                            : "62%",
                    }
                  : {}
              }
              transition={{
                duration: 1.2,
                delay: index * 0.15 + 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
            {/* Glow effect for our saffron */}
            {country.isOurs && (
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: "98%" }}
                animate={{
                  boxShadow: [
                    "0 0 10px hsla(43, 76%, 55%, 0.4)",
                    "0 0 20px hsla(43, 76%, 55%, 0.6)",
                    "0 0 10px hsla(43, 76%, 55%, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GlobalQualityComparison = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const badgeRef = useRef<HTMLDivElement>(null);
  const badgeInView = useInView(badgeRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-white"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
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
            Quality Comparison
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            How We Compare
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
            See why Z Princess Saffron is the world's most sought-after saffron.
          </motion.p>
        </motion.div>

        {/* Comparison Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {countries.map((country, index) => (
            <ComparisonCard key={country.key} country={country} index={index} />
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          ref={badgeRef}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={badgeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
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
