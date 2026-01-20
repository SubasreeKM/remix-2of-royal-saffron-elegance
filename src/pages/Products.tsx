import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Share2, Star, Filter, ChevronDown } from "lucide-react";
import Layout from "@/components/layout/Layout";
import productJar from "@/assets/product-saffron-jar.jpg";
import giftBox from "@/assets/product-gift-box.jpg";

const products = [
  {
    id: 1,
    name: "Royal Saffron Threads - 1g",
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 128,
    image: productJar,
    tag: "Best Seller",
    category: "threads",
    description: "Premium Grade A+ Kashmiri saffron threads. Hand-picked and naturally dried.",
  },
  {
    id: 2,
    name: "Royal Saffron Threads - 2g",
    price: 2799,
    originalPrice: 3499,
    rating: 4.9,
    reviews: 89,
    image: productJar,
    tag: "Popular",
    category: "threads",
    description: "Double pack of our finest saffron. Perfect for regular culinary use.",
  },
  {
    id: 3,
    name: "Premium Gift Collection",
    price: 12999,
    originalPrice: 15999,
    rating: 5.0,
    reviews: 45,
    image: giftBox,
    tag: "Gift Set",
    category: "gift",
    description: "Luxury velvet box with 5 premium saffron vials. Perfect for gifting.",
  },
  {
    id: 4,
    name: "Royal Saffron Threads - 5g",
    price: 6499,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 67,
    image: productJar,
    tag: "Value Pack",
    category: "threads",
    description: "Family pack of authentic Kashmiri saffron. Best value for regular users.",
  },
  {
    id: 5,
    name: "Saffron Powder - Pure",
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 92,
    image: productJar,
    category: "powder",
    description: "Finely ground saffron powder. Perfect for desserts and beverages.",
  },
  {
    id: 6,
    name: "Bridal Gift Box",
    price: 24999,
    originalPrice: 29999,
    rating: 5.0,
    reviews: 23,
    image: giftBox,
    tag: "Exclusive",
    category: "gift",
    description: "Premium bridal collection with multiple saffron varieties and accessories.",
  },
];

const offers = [
  "🎁 Use code ROYAL25 for 25% off on all gift boxes!",
  "✨ Free shipping on orders above ₹2000",
  "💫 Buy 2 Get 1 Free on all 1g packs",
];

const Products = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = products.filter((product) => {
    if (activeFilter === "all") return true;
    return product.category === activeFilter;
  });

  return (
    <Layout>
      {/* Animated Offers Banner */}
      <div className="pt-20 bg-royal-purple-dark">
        <div className="overflow-hidden py-3 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20">
          <div className="animate-marquee whitespace-nowrap flex gap-16">
            {[...offers, ...offers].map((offer, index) => (
              <span key={index} className="text-ivory font-sans text-sm tracking-wide">
                {offer}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-4">
              Our Collection
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-royal-purple mb-6">
              Premium Saffron Products
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              {[
                { key: "all", label: "All Products" },
                { key: "threads", label: "Saffron Threads" },
                { key: "powder", label: "Saffron Powder" },
                { key: "gift", label: "Gift Boxes" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-royal-purple text-ivory"
                      : "bg-ivory-dark text-foreground hover:bg-gold/20"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-ivory-dark border border-border text-sm focus:outline-none focus:border-gold"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-card rounded-sm shadow-card overflow-hidden transition-all duration-700 hover:shadow-elegant hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Tag */}
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 bg-gold text-royal-purple-dark text-xs font-semibold tracking-wider uppercase">
                      {product.tag}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <button
                    className="w-10 h-10 bg-ivory/90 backdrop-blur-sm rounded-full flex items-center justify-center text-royal-purple hover:bg-gold hover:text-royal-purple-dark transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    className="w-10 h-10 bg-ivory/90 backdrop-blur-sm rounded-full flex items-center justify-center text-royal-purple hover:bg-gold hover:text-royal-purple-dark transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-purple-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Quick Add Button */}
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-ivory text-royal-purple font-medium text-sm uppercase tracking-wider opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-gold hover:text-royal-purple-dark flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? "fill-gold text-gold"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-serif text-lg text-royal-purple mb-1 group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>

                  {/* Description on Hover */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xl font-bold text-gold">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
