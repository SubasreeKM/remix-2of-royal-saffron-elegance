import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import productJar from "@/assets/product-saffron-jar.jpg";
import giftBox from "@/assets/product-gift-box.jpg";

const products = [
  {
    id: 1,
    name: "Royal Saffron Threads",
    price: "₹4,999",
    image: productJar,
    tag: "Best Seller",
    description: "Hand-harvested from the pristine valleys of Kashmir, each strand embodies centuries of tradition and unparalleled purity.",
  },
  {
    id: 2,
    name: "Premium Gift Collection",
    price: "₹12,999",
    image: giftBox,
    tag: "Gift Set",
    description: "An exquisite presentation of our finest saffron, elegantly packaged for those who appreciate the art of gifting.",
  },
];

const ProductShowcase = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-32 bg-ivory">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Curated Excellence
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-royal-purple mb-6">
            Discover Our Products
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            Each strand of saffron is a symbol of luxury, purity, and authenticity—sourced directly from the highlands of Kashmir.
          </p>
        </div>

        {/* Product Cards - Gallery Style */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto mb-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Main Card Container */}
              <div className="relative overflow-hidden bg-card rounded-sm transition-all duration-700 hover:shadow-[0_25px_80px_-15px_rgba(139,92,246,0.25)]">
                {/* Tag */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-5 py-2 bg-gold text-royal-purple-dark text-xs font-semibold tracking-wider uppercase shadow-lg">
                    {product.tag}
                  </span>
                </div>

                {/* Image Container - Hero Style */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* Main Image with Cinematic Zoom */}
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredId === product.id ? 1.08 : 1,
                    }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  />

                  {/* Vignette Overlay - Appears on Hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at center, transparent 40%, rgba(26, 17, 43, 0.4) 100%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Golden Glow Effect - Bottom */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse at bottom center, rgba(212, 175, 55, 0.15) 0%, transparent 60%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                  />

                  {/* Dark Gradient Overlay for Text Readability */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/80 via-royal-purple-dark/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Hover Description - Floats Over Image */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-8 z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: hoveredId === product.id ? 1 : 0,
                      y: hoveredId === product.id ? 0 : 30,
                    }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <p className="font-sans text-ivory/90 text-sm leading-relaxed max-w-sm">
                      {product.description}
                    </p>
                  </motion.div>
                </div>

                {/* Content Footer */}
                <div className="p-8 bg-card relative">
                  {/* Subtle Gold Top Border */}
                  <motion.div
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredId === product.id ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                  />

                  <h3 className="font-serif text-2xl text-royal-purple mb-3 group-hover:text-gold transition-colors duration-500">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xl font-semibold text-gold">
                    {product.price}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredId === product.id ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-10 py-5 bg-royal-purple text-ivory font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:bg-royal-purple-light hover:shadow-elegant group"
          >
            View All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
