import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  User, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X,
  ChevronDown
} from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-ivory/95 backdrop-blur-md shadow-elegant py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Z Princess Saffron" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-sans text-sm tracking-widest uppercase transition-colors duration-300
                  ${location.pathname === link.path 
                    ? "text-gold" 
                    : isScrolled ? "text-royal-purple hover:text-gold" : "text-ivory hover:text-gold"
                  }
                  after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 
                  after:bg-gold after:origin-right after:scale-x-0 after:transition-transform 
                  after:duration-300 hover:after:origin-left hover:after:scale-x-100
                  ${location.pathname === link.path ? "after:scale-x-100 after:origin-left" : ""}
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            <Link
              to="/auth"
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? "text-royal-purple hover:text-gold hover:bg-gold/10" 
                  : "text-ivory hover:text-gold hover:bg-ivory/10"
              }`}
              aria-label="Login or Sign Up"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className={`p-2 rounded-full transition-all duration-300 relative ${
                isScrolled 
                  ? "text-royal-purple hover:text-gold hover:bg-gold/10" 
                  : "text-ivory hover:text-gold hover:bg-ivory/10"
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className={`p-2 rounded-full transition-all duration-300 relative ${
                isScrolled 
                  ? "text-royal-purple hover:text-gold hover:bg-gold/10" 
                  : "text-ivory hover:text-gold hover:bg-ivory/10"
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-royal-purple-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? "text-royal-purple hover:text-gold" 
                  : "text-ivory hover:text-gold"
              }`}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-ivory/98 backdrop-blur-lg shadow-elegant transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col py-6 px-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-3 font-sans text-sm tracking-widest uppercase border-b border-border/50 transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-royal-purple hover:text-gold hover:pl-2"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
