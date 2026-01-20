import { Heart, Sparkles, ChefHat, Shield } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Boosts immunity, aids in pregnancy wellness, promotes cardiovascular health, and enhances mood naturally.",
    color: "text-rose-500",
  },
  {
    icon: Sparkles,
    title: "Beauty Benefits", 
    description: "Reveals radiant, glowing skin. Natural antioxidants combat aging while evening skin tone for a luminous complexion.",
    color: "text-gold",
  },
  {
    icon: ChefHat,
    title: "Culinary Excellence",
    description: "Elevate your biryanis, desserts, and beverages with the unmistakable aroma and rich golden hue of pure saffron.",
    color: "text-orange-500",
  },
  {
    icon: Shield,
    title: "Certified Purity",
    description: "ISO certified, lab-tested for authenticity. Every thread meets the highest international quality standards.",
    color: "text-emerald-500",
  },
];

const comparisonData = [
  { country: "Kashmir (India)", quality: 98, color: "bg-gold", label: "Our Saffron" },
  { country: "Iran", quality: 75, color: "bg-royal-purple/60" },
  { country: "Spain", quality: 68, color: "bg-royal-purple/40" },
  { country: "Greece", quality: 62, color: "bg-royal-purple/30" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-ivory to-ivory-dark">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Unparalleled Quality
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6">
            Why Choose Our Saffron
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group p-8 bg-card rounded-sm shadow-card transition-all duration-500 hover:shadow-elegant hover:-translate-y-2 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex p-4 rounded-full bg-ivory-dark ${benefit.color} mb-6 transition-transform group-hover:scale-110`}>
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl text-royal-purple mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Comparison */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl text-royal-purple text-center mb-10">
            Global Quality Comparison
          </h3>
          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <div key={item.country} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-sm text-foreground font-medium">
                    {item.country}
                    {item.label && (
                      <span className="ml-2 px-2 py-0.5 bg-gold text-royal-purple-dark text-xs font-semibold rounded">
                        {item.label}
                      </span>
                    )}
                  </span>
                  <span className="font-sans text-sm text-muted-foreground">
                    {item.quality}%
                  </span>
                </div>
                <div className="h-3 bg-ivory-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${item.quality}%`,
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
