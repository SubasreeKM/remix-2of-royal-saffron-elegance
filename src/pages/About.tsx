import Layout from "@/components/layout/Layout";
import { Award, Target, Users, FileCheck } from "lucide-react";
import kashmir from "@/assets/kashmir-fields.jpg";
import harvest from "@/assets/saffron-harvest.jpg";
import { Suspense, lazy } from "react";

const SaffronBackground3D = lazy(() => import("@/components/about/SaffronBackground3D"));
const corporateDetails = [
  {
    label: "FSSAI License No",
    value: "12423008002367",
    icon: FileCheck,
  },
  {
    label: "GSTIN",
    value: "33ABFA6551N1ZZ",
    icon: Award,
  },
  {
    label: "MSME UAN",
    value: "TN-02-0006511",
    icon: Target,
  },
  {
    label: "Launched By",
    value: "HeyRam Infrastructure",
    icon: Users,
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <Suspense fallback={null}>
          <SaffronBackground3D />
        </Suspense>

        {/* Kolam Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 z-[1]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <pattern id="kolam" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" className="text-gold" />
              <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" className="text-gold" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" className="text-gold" strokeWidth="0.3" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#kolam)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Our Heritage
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            About Z Princess Saffron
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-ivory/80 max-w-2xl mx-auto text-lg leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            More than a saffron brand—a legacy of passion, tradition, and excellence
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
                Our Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mb-6">
                A Legacy of Passion & Excellence
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Z PRINCESS SAFFRON is more than a saffron brand—it is the fruit of passion, tradition, and technological excellence. This project was proudly launched by <strong className="text-foreground">HeyRam Infrastructure</strong>, an IT services, web development, and digital marketing company led by Managing Director Raja K.
                </p>
                <p>
                  With deep roots in innovation and quality, HeyRam Infrastructure envisioned a brand that brings the richness of saffron to the world with modern integrity and ancient reverence.
                </p>
                <p>
                  Our journey blends the digital future with age-old agricultural heritage. Every strand of saffron we offer is a symbol of luxury, purity, and authenticity—sourced directly from the highlands of Kashmir and presented to you with meticulous care and quality assurance.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-sm shadow-elegant">
                <img
                  src={harvest}
                  alt="Saffron Harvesting"
                  className="w-full h-auto"
                />
              </div>
              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold/30 rounded-sm -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-royal-purple-dark text-ivory">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Our Vision
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 leading-relaxed">
              Make Luxury Ethical,<br />
              <span className="text-gold">Authenticity Accessible</span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="text-ivory/80 text-lg leading-relaxed max-w-3xl mx-auto">
              From sacred rituals to Michelin-starred dishes, our saffron enriches every moment. We're proud to redefine saffron—from commodity to craft. Explore our journey, share our story, and taste the legacy in every golden thread.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Essentials */}
      <section id="corporate" className="py-24 bg-ivory-dark">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Trust & Transparency
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-royal-purple mb-6">
              Corporate Essentials
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {corporateDetails.map((item, index) => (
              <div
                key={item.label}
                className="bg-card p-8 rounded-sm shadow-card text-center transition-all duration-500 hover:shadow-elegant hover:-translate-y-2"
              >
                <div className="inline-flex p-4 rounded-full bg-gold/10 text-gold mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                <p className="font-serif text-lg text-royal-purple font-medium">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
