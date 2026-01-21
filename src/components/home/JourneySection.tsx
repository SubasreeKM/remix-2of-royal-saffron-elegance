import { motion } from "framer-motion";
import cultivationImage from "@/assets/journey-cultivation.jpg";
import pickingImage from "@/assets/journey-picking.jpg";
import extractionImage from "@/assets/journey-extraction.jpg";
import dryingImage from "@/assets/journey-drying.jpg";
import packagingImage from "@/assets/journey-packaging.jpg";

const journeySteps = [
  {
    step: "01",
    title: "Cultivation",
    subtitle: "Where It Begins",
    description: "In the pristine valleys of Pampore, Kashmir, at the perfect altitude where morning mists kiss the earth, our Crocus sativus flowers begin their sacred journey.",
    image: cultivationImage,
  },
  {
    step: "02",
    title: "Hand Picking",
    subtitle: "The Dawn Ritual",
    description: "Before sunrise, skilled artisans delicately harvest each flower by hand. This ancient tradition, passed through generations, ensures only the finest blooms are selected.",
    image: pickingImage,
  },
  {
    step: "03",
    title: "Extraction",
    subtitle: "Precious Threads",
    description: "With practiced precision, each flower yields just three crimson stigmas. Our master craftsmen extract these treasures with reverence, honoring centuries of tradition.",
    image: extractionImage,
  },
  {
    step: "04",
    title: "Drying & Grading",
    subtitle: "The Art of Perfection",
    description: "Each thread is carefully dried and graded by color intensity, aroma depth, and crocin content. Only the highest grade earns the Z Princess seal.",
    image: dryingImage,
  },
  {
    step: "05",
    title: "Royal Packaging",
    subtitle: "A Gift of Luxury",
    description: "Finally, our finest saffron is sealed in airtight vessels, preserving its essence until the moment it graces your table.",
    image: packagingImage,
  },
];

const JourneySection = () => {
  return (
    <section className="bg-royal-purple-dark">
      {/* Section Header */}
      <div className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6"
        >
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            From Flower to You
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-6">
            Journey of Saffron
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </motion.div>
      </div>

      {/* Timeline Steps */}
      <div className="relative">
        {/* Vertical Golden Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/60 to-gold hidden lg:block transform -translate-x-1/2 z-10" />

        {journeySteps.map((step, index) => (
          <div
            key={step.step}
            className="relative min-h-[80vh] lg:min-h-screen flex items-center"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark via-royal-purple-dark/95 to-royal-purple-dark" />

            <div className="container mx-auto px-6 relative z-20">
              <div
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Side */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex-1 w-full"
                >
                  <div className="relative overflow-hidden rounded-sm shadow-2xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-[50vh] lg:h-[70vh] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/40 to-transparent" />
                    <div className="absolute inset-0 border border-gold/20" />
                  </div>
                </motion.div>

                {/* Center Node - Desktop Only */}
                <div className="hidden lg:flex flex-col items-center justify-center z-30">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-20 h-20 rounded-full bg-royal-purple-dark border-4 border-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                  >
                    <span className="font-serif text-gold text-xl font-bold">
                      {step.step}
                    </span>
                  </motion.div>
                </div>

                {/* Text Side */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className={`flex-1 ${
                    index % 2 === 0 ? "lg:text-left" : "lg:text-right"
                  } text-center`}
                >
                  {/* Large Background Step Number */}
                  <div className="relative">
                    <span
                      className={`absolute ${
                        index % 2 === 0 ? "lg:-left-8" : "lg:-right-8"
                      } -top-16 font-serif text-[12rem] lg:text-[16rem] text-gold/10 font-bold leading-none pointer-events-none select-none hidden lg:block`}
                    >
                      {step.step}
                    </span>

                    {/* Mobile Step Number */}
                    <span className="lg:hidden font-serif text-6xl text-gold/30 font-bold mb-4 block">
                      {step.step}
                    </span>

                    <div className="relative z-10">
                      <p className="font-sans text-gold/80 text-sm tracking-[0.2em] uppercase mb-2">
                        {step.subtitle}
                      </p>
                      <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory mb-6">
                        {step.title}
                      </h3>
                      <p className="text-ivory/70 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Fade */}
      <div className="h-32 bg-gradient-to-b from-royal-purple-dark to-royal-purple-dark" />
    </section>
  );
};

export default JourneySection;
