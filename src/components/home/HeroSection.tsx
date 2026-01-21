import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlay - fades to ivory at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal-purple-dark/60 via-royal-purple/40 via-60% to-ivory/95" />
      </div>

      {/* Floating Saffron Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-gold to-gold/0 rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Decorative Line */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 animate-fade-in" />
          
          {/* Subtitle */}
          <p 
            className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Premium Kashmiri Saffron
          </p>

          {/* Main Heading */}
          <h1 
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ivory leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            The Gold of Kings,
            <br />
            <span className="text-gold-gradient">Now Yours</span>
          </h1>

          {/* Description */}
          <p 
            className="font-sans text-ivory/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Experience the world's finest Kashmiri saffron, hand-picked from the pristine valleys of Pampore with centuries of heritage.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link
              to="/products"
              className="group relative overflow-hidden px-10 py-4 bg-gold text-royal-purple-dark font-sans font-semibold text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-gold-glow"
            >
              <span className="relative z-10">Discover Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-light bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            
            <Link
              to="/about"
              className="px-10 py-4 border-2 border-ivory/30 text-ivory font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/5"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gold/70" />
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-gold/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-gold/20" />
    </section>
  );
};

export default HeroSection;
