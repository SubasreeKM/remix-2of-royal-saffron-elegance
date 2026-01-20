import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`w-12 h-12 rounded-full bg-royal-purple text-ivory shadow-elegant flex items-center justify-center transition-all duration-500 hover:bg-royal-purple-light hover:shadow-gold ${
          showScrollTop 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Chat Assistant */}
      <a
        href="https://wa.me/917200150588"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-gold text-royal-purple-dark shadow-gold-glow flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-gold"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingActions;
