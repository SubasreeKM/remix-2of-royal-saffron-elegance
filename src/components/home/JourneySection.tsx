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
    description:
      "In the pristine valleys of Kashmir, at an altitude of 1,600 meters, Crocus sativus flowers are cultivated with ancestral wisdom passed down through generations. The unique microclimate and mineral-rich soil create conditions found nowhere else on earth.",
    image: fieldsImage,
  },
  {
    step: "02",
    title: "Hand Picking",
    subtitle: "Dawn's Delicate Harvest",
    description:
      "Each autumn morning, before the first rays of sunlight touch the petals, skilled harvesters delicately pluck each flower by hand. This sacred ritual must be completed within hours, as the blooms are at their peak for mere moments.",
    image: harvestImage,
  },
  {
    step: "03",
    title: "Extraction",
    subtitle: "The Art of Separation",
    description:
      "Master artisans carefully extract the three precious stigmas from each flower—a process requiring immense patience and precision. It takes over 150,000 flowers to produce a single kilogram of this crimson treasure.",
    image: jarImage,
  },
  {
    step: "04",
    title: "Royal Packaging",
    subtitle: "Preserved Perfection",
    description:
      "The finest threads are gently dried using traditional methods, then graded by our experts for color, aroma, and crocin content. Each batch is sealed in airtight vessels to preserve its extraordinary potency and fragrance.",
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
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y, scale }}
      className="min-h-[85vh] flex items-center justify-center px-4 md:px-8 lg:px-16"
    >
      <div
        className={`
          relative w-full max-w-6xl rounded-sm overflow-hidden
          bg-gradient-to-br from-royal-purple/40 via-royal-purple-dark/60 to-royal-purple/30
          border border-gold/20 shadow-2xl backdrop-blur-sm
        `}
      >
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3 pointer-events-none" />

        <div
          className={`
            relative grid grid-cols-1 lg:grid-cols-2 gap-0
            ${isEven ? "" : "lg:grid-flow-col-dense"}
          `}
        >
          {/* Image Side */}
          <div
            className={`
              relative h-72 lg:h-[500px] overflow-hidden
              ${isEven ? "lg:order-1" : "lg:order-2"}
            `}
          >
            <img
              src={step.image}
              alt={step.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Image overlay for depth */}
            <div
              className={`
                absolute inset-0 
                ${isEven 
                  ? "bg-gradient-to-r from-transparent via-transparent to-royal-purple-dark/80" 
                  : "bg-gradient-to-l from-transparent via-transparent to-royal-purple-dark/80"
                }
              `}
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/40 via-transparent to-transparent" />
          </div>

          {/* Content Side */}
          <div
            className={`
              relative p-8 md:p-12 lg:p-16 flex flex-col justify-center
              ${isEven ? "lg:order-2" : "lg:order-1"}
            `}
          >
            {/* Large Step Number */}
            <span className="font-serif text-8xl md:text-9xl lg:text-[12rem] font-bold text-gold/15 absolute top-4 right-8 lg:top-8 lg:right-12 select-none pointer-events-none leading-none">
              {step.step}
            </span>

            {/* Content */}
            <div className="relative z-10">
              {/* Subtitle */}
              <p className="font-sans text-gold text-xs md:text-sm tracking-[0.35em] uppercase mb-3 md:mb-4">
                {step.subtitle}
              </p>

              {/* Title */}
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory mb-4 md:mb-6 tracking-tight">
                {step.title}
              </h3>

              {/* Gold divider */}
              <div className="w-16 h-px bg-gradient-to-r from-gold via-gold/60 to-transparent mb-6 md:mb-8" />

              {/* Description */}
              <p className="font-sans text-ivory/75 text-base md:text-lg leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
    </motion.div>
  );
};

const JourneySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-royal-purple-dark overflow-hidden"
    >
      {/* Subtle background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark via-royal-purple/90 to-royal-purple-dark pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(270,45%,20%,0.4)_0%,_transparent_70%)] pointer-events-none" />

      {/* Section Header */}
      <div className="relative pt-24 pb-8 md:pt-32 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto px-6"
        >
          <p className="font-sans text-gold text-sm tracking-[0.35em] uppercase mb-4">
            From Flower to You
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-6">
            Journey of Saffron
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
          <p className="font-sans text-ivory/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Witness the meticulous artistry behind the world's most precious spice, 
            from the misty fields of Kashmir to your table.
          </p>
        </motion.div>
      </div>

      {/* Journey Cards */}
      <div className="relative pb-24 md:pb-32">
        {journeySteps.map((step, index) => (
          <JourneyCard key={step.step} step={step} index={index} />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-royal-purple-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default JourneySection;
