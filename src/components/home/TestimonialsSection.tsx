import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, PenLine, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { motion, useInView } from "framer-motion";
import WriteReviewModal from "./WriteReviewModal";

interface Review {
  id: string;
  reviewer_name: string;
  location: string | null;
  rating: number;
  review_text: string;
  created_at: string;
}

// Default testimonials for when database is empty
const defaultTestimonials: Review[] = [
  {
    id: "1",
    reviewer_name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review_text: "The quality of saffron is absolutely exceptional. The aroma in my biryani is now unmatched. My family can't stop praising the rich color and flavor.",
    created_at: "2024-12-15T00:00:00Z",
  },
  {
    id: "2",
    reviewer_name: "Rajesh Menon",
    location: "Chennai",
    rating: 5,
    review_text: "Purchased the gift box for my mother's birthday. The packaging is luxurious and the saffron quality is premium. Worth every rupee spent.",
    created_at: "2024-11-20T00:00:00Z",
  },
  {
    id: "3",
    reviewer_name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    review_text: "Using Z Princess Saffron in my daily milk has improved my skin significantly. The glow is real! Authentic Kashmiri quality delivered to my doorstep.",
    created_at: "2025-01-10T00:00:00Z",
  },
  {
    id: "4",
    reviewer_name: "Dr. Vikram Patel",
    location: "Delhi",
    rating: 5,
    review_text: "As a nutritionist, I recommend only the purest saffron. Z Princess meets all quality standards. My clients trust this brand completely.",
    created_at: "2024-12-05T00:00:00Z",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(defaultTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ avgRating: 5, totalReviews: 4 });
  const [isHovered, setIsHovered] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const cardInView = useInView(cardRef, { once: true, margin: "-100px" });

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      setReviews(data);
      const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
      setStats({ avgRating: Math.round(avg * 10) / 10, totalReviews: data.length });
    }
  };

  useEffect(() => {
    fetchReviews();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("reviews-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews" },
        () => fetchReviews()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-ivory-dark to-ivory relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(212,175,55,0.3)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(75,35,90,0.2)_0%,_transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          ref={headerRef}
          className="text-center max-w-2xl mx-auto mb-16"
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
            Customer Stories
          </motion.p>
          <motion.h2 
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Trusted by Thousands
          </motion.h2>
          
          {/* Rating Stats */}
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(stats.avgRating)
                      ? "fill-gold text-gold"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-foreground font-medium">{stats.avgRating}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{stats.totalReviews} Reviews</span>
          </motion.div>

          <motion.div 
            className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon with shimmer */}
          <motion.div 
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-10"
            animate={{
              filter: isHovered 
                ? "drop-shadow(0 0 12px hsla(43, 76%, 55%, 0.6))" 
                : "drop-shadow(0 0 6px hsla(43, 76%, 55%, 0.3))",
            }}
            transition={{ duration: 0.5 }}
          >
            <Quote className="w-12 h-12 text-gold/50 rotate-180" />
          </motion.div>

          {/* Card with hover effects */}
          <motion.div 
            ref={cardRef}
            className="relative overflow-hidden rounded-sm cursor-pointer"
            initial={{ opacity: 0, y: 60 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            }}
          >
            <motion.div
              className="bg-card p-10 md:p-14 border border-gold/20"
              animate={{
                boxShadow: isHovered 
                  ? "0 25px 50px -12px hsla(270, 50%, 20%, 0.25), 0 0 30px hsla(43, 76%, 55%, 0.1)"
                  : "0 10px 40px -15px hsla(270, 50%, 20%, 0.15)",
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Gold glow effect */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: isHovered 
                    ? "linear-gradient(135deg, hsla(43, 76%, 55%, 0.08) 0%, transparent 50%, hsla(43, 76%, 55%, 0.05) 100%)"
                    : "linear-gradient(135deg, hsla(43, 76%, 55%, 0.03) 0%, transparent 50%, transparent 100%)",
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-gold/40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-gold/40" />

              <div className="text-center relative z-10">
                {/* Stars with glow */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <Star
                        className={`w-6 h-6 transition-all ${
                          i < currentReview.rating
                            ? "fill-gold text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <motion.p 
                  className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic"
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  "{currentReview.review_text}"
                </motion.p>

                {/* Author with Verified Badge */}
                <motion.div
                  key={`author-${currentReview.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <p className="font-serif text-lg text-royal-purple font-medium">
                      {currentReview.reviewer_name}
                    </p>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-gold/10 rounded-sm">
                      <BadgeCheck className="w-4 h-4 text-gold" />
                      <span className="text-xs text-gold font-medium">Verified Customer</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {currentReview.location && `${currentReview.location} • `}
                    {formatDate(currentReview.created_at)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div 
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-royal-purple/30 flex items-center justify-center text-royal-purple transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/5 hover:shadow-[0_0_20px_hsla(43,76%,55%,0.2)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gold shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                      : "w-2 bg-royal-purple/30 hover:bg-royal-purple/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-royal-purple/30 flex items-center justify-center text-royal-purple transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/5 hover:shadow-[0_0_20px_hsla(43,76%,55%,0.2)]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Write a Review Button */}
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-gold to-gold-light text-royal-purple font-semibold px-8 py-6 text-base hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 group"
            >
              <PenLine className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Write a Review
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onReviewSubmitted={fetchReviews}
      />
    </section>
  );
};

export default TestimonialsSection;
