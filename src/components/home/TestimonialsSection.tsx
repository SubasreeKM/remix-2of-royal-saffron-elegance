import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality of saffron is absolutely exceptional. The aroma in my biryani is now unmatched. My family can't stop praising the rich color and flavor.",
    date: "December 2024",
  },
  {
    id: 2,
    name: "Rajesh Menon",
    location: "Chennai",
    rating: 5,
    text: "Purchased the gift box for my mother's birthday. The packaging is luxurious and the saffron quality is premium. Worth every rupee spent.",
    date: "November 2024",
  },
  {
    id: 3,
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    text: "Using Z Princess Saffron in my daily milk has improved my skin significantly. The glow is real! Authentic Kashmiri quality delivered to my doorstep.",
    date: "January 2025",
  },
  {
    id: 4,
    name: "Dr. Vikram Patel",
    location: "Delhi",
    rating: 5,
    text: "As a nutritionist, I recommend only the purest saffron. Z Princess meets all quality standards. My clients trust this brand completely.",
    date: "December 2024",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-ivory-dark to-ivory">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Customer Stories
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6">
            Trusted by Thousands
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
            <Quote className="w-12 h-12 text-gold/30 rotate-180" />
          </div>

          {/* Card */}
          <div className="bg-card p-10 md:p-14 rounded-sm shadow-elegant border border-gold/10 relative overflow-hidden">
            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-gold/30" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-gold/30" />

            <div className="text-center">
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-serif text-lg text-royal-purple font-medium">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-royal-purple/30 flex items-center justify-center text-royal-purple transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "w-8 bg-gold" 
                      : "bg-royal-purple/30 hover:bg-royal-purple/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-royal-purple/30 flex items-center justify-center text-royal-purple transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
