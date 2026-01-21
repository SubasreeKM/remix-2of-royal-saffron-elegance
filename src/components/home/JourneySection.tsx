import harvestImage from "@/assets/saffron-harvest.jpg";
import fieldsImage from "@/assets/kashmir-fields.jpg";

const journeySteps = [
  {
    step: "01",
    title: "Cultivation",
    description: "Crocus sativus flowers are grown in the pristine valleys of Kashmir at optimal altitude.",
    image: fieldsImage,
  },
  {
    step: "02", 
    title: "Hand Picking",
    description: "Each flower is delicately hand-picked at dawn before the petals fully open.",
    image: harvestImage,
  },
  {
    step: "03",
    title: "Extraction",
    description: "The precious three stigmas are carefully extracted by skilled artisans.",
  },
  {
    step: "04",
    title: "Drying & Grading",
    description: "Stigmas are dried and graded based on color, aroma, and crocin content.",
  },
  {
    step: "05",
    title: "Royal Packaging",
    description: "The finest threads are packaged in airtight containers to preserve freshness.",
  },
];

const JourneySection = () => {
  return (
    <section className="py-24 bg-royal-purple-dark text-ivory overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            From Flower to You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory mb-6">
            Journey of Saffron
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/50 to-transparent hidden lg:block" />

          {journeySteps.map((step, index) => (
            <div
              key={step.step}
              className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                <div className={`inline-block ${index % 2 === 0 ? "lg:ml-auto" : ""}`}>
                  <span className="font-serif text-5xl text-gold/30 font-bold">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-2xl text-ivory mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-ivory/70 max-w-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Center Node */}
              <div className="hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-royal-purple border-4 border-gold shadow-gold-glow z-10">
                <span className="font-serif text-gold font-bold">{step.step}</span>
              </div>

              {/* Image or Empty Space */}
              <div className="flex-1 hidden lg:block">
                {step.image && (
                  <div className={`max-w-sm ${index % 2 === 0 ? "" : "ml-auto"}`}>
                    <div className="relative overflow-hidden rounded-sm shadow-elegant">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 border border-gold/20" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
