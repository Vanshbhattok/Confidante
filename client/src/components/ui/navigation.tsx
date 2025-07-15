import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface NavLink {
  name: string;
  href: string;
}

const navigationLinks: NavLink[] = [
  { name: "Home", href: "/#hero" },
  { name: "Insights", href: "/#insights" },
  { name: "About", href: "/#about" },
  { name: "Team", href: "/#team" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" }
];

// SVG Hamburger Icon Component
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {isOpen ? (
      <>
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </>
    ) : (
      <>
        <path d="M3 12h18" />
        <path d="M3 6h18" />
        <path d="M3 18h18" />
      </>
    )}
  </svg>
);

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/#hero");
  const [location, setLocation] = useLocation();

  // Function to handle scroll and update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Only update active link based on scroll position if we're on the home page
      if (location === '/' || location === '') {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 80;
        
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveLink(`/#${sectionId}`);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Set active link based on current location
  useEffect(() => {
    if (location === '/' || location === '') {
      // On home page, set active based on scroll position or default to hero
      const sections = document.querySelectorAll('section[id]');
      if (sections.length > 0) {
        const scrollPosition = window.scrollY + 80;
        let foundActive = false;
        
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveLink(`/#${sectionId}`);
            foundActive = true;
          }
        });
        
        if (!foundActive) {
          setActiveLink("/#hero");
        }
      } else {
        setActiveLink("/#hero");
      }
    } else {
      // On other pages, clear active link or set based on route
      if (location.startsWith('/blog')) {
        setActiveLink('/#insights'); // Keep insights highlighted when on blog pages
      } else {
        setActiveLink(location);
      }
    }
  }, [location]);

  const toggleMobileMenu = () => {
    console.log('Hamburger clicked:', !isMobileMenuOpen); // Debug log
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Enhanced smooth scroll function for anchor links with better mobile support
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, href: string) => {
    console.log('Smooth scroll called with:', href); // Debug log
    
    if (href.startsWith('/#')) {
      e.preventDefault();
      e.stopPropagation();
      
      // Close mobile menu immediately for better UX
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Update active link immediately
      setActiveLink(href);
      
      const targetId = href.replace('/#', '');
      console.log('Target ID:', targetId); // Debug log
      
      // Function to perform the scroll
      const performScroll = () => {
        const element = document.getElementById(targetId);
        console.log('Element found:', element); // Debug log
        
        if (element) {
          // Highlight the target section temporarily
          element.classList.add('scroll-highlight');
          
          // Calculate offset
          const offsetTop = element.offsetTop - 80;
          console.log('Scrolling to:', offsetTop); // Debug log
          
          // Use different scroll methods for better mobile compatibility
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          } else {
            // Fallback for older browsers/devices
            window.scrollTo(0, offsetTop);
          }
          
          // Remove highlight after animation completes
          setTimeout(() => {
            element.classList.remove('scroll-highlight');
          }, 1500);
        } else {
          console.error('Element not found:', targetId);
        }
      };
      
      // If we're not on the home page, navigate to home first
      if (location !== '/' && location !== '') {
        console.log('Navigating to home first');
        setLocation('/');
        // Wait for navigation to complete, then scroll
        setTimeout(performScroll, 200);
      } else {
        // We're already on home page, just scroll
        console.log('Already on home page, scrolling directly');
        // Small delay to ensure any animations complete
        setTimeout(performScroll, 50);
      }
    }
  };
  
  // Enhanced function to scroll to insights section
  const scrollToInsights = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    console.log('Scroll to insights called'); // Debug log
    smoothScroll(e, '/#insights');
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        isScrolled 
          ? "py-2 bg-white/95 backdrop-blur-md shadow-lg shadow-neutral-200/30" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex justify-between items-center">
          <motion.a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setLocation('/');
              setActiveLink("/#hero");
            }}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-12 w-12 mr-2 flex items-center justify-center">
              <motion.img 
                src="/src/assets/new-logo.png"
                alt="Confidante Logo" 
                className="h-full w-full object-contain"
                initial={{ rotate: -5 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              />
            </div>
            <span className="text-2xl font-heading font-semibold text-primary">Confidante</span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navigationLinks.map((link, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -2 }}
                className="relative px-1"
              >
                <a 
                  href={link.href}
                  onClick={(e) => smoothScroll(e, link.href)}
                  className={cn(
                    "relative font-medium px-4 py-2 transition-all duration-300 inline-flex items-center",
                    activeLink === link.href 
                      ? "text-primary" 
                      : "text-neutral-600 hover:text-primary"
                  )}
                >
                  {link.name}
                  
                  {/* Animated underline indicator */}
                  <div className="absolute left-0 right-0 bottom-0 h-0.5 flex justify-center">
                    {activeLink === link.href && (
                      <motion.span 
                        className="h-full bg-primary rounded-full"
                        layoutId="navIndicator"
                        style={{ width: '50%' }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </div>
                </a>
              </motion.div>
            ))}
            
            <Button
              onClick={scrollToInsights}
              variant="default"
              size="sm"
              className="ml-4 shadow-md"
            >
              Get Started
            </Button>
          </motion.nav>
          
          {/* Mobile Navigation Toggle - Fixed with better touch handling */}
          <button 
            className="md:hidden p-3 rounded-full bg-primary/10 text-primary focus:outline-none active:bg-primary/20 transition-colors touch-manipulation"
            onClick={toggleMobileMenu}
            onTouchStart={(e) => e.preventDefault()} // Prevent double-tap zoom
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              minWidth: '44px',
              minHeight: '44px'
            }}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>
        
        {/* Mobile Navigation Menu with animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-neutral-100"
              style={{ zIndex: 40 }}
            >
              <div className="py-3 px-2 space-y-1">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        console.log('Mobile link clicked:', link.name, link.href); // Debug log
                        smoothScroll(e, link.href);
                      }}
                      onTouchStart={(e) => {
                        // Prevent iOS double-tap zoom
                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)';
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                      }}
                      className={cn(
                        "block py-3 px-4 font-medium rounded-xl transition-all touch-manipulation",
                        activeLink === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
                      )}
                      style={{ 
                        WebkitTapHighlightColor: 'transparent',
                        minHeight: '44px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {link.name}
                      {activeLink === link.href && (
                        <motion.span 
                          className="inline-block w-1.5 h-1.5 rounded-full bg-primary ml-2"
                          layoutId="mobileIndicator"
                        />
                      )}
                    </a>
                  </motion.div>
                ))}
                
                <Button
                  onClick={(e) => {
                    console.log('Mobile Get Started clicked'); // Debug log
                    scrollToInsights(e);
                  }}
                  variant="default"
                  size="lg" 
                  className="w-full mt-2 justify-center touch-manipulation"
                  style={{ minHeight: '44px' }}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Add styles for the section highlight effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scroll-highlight {
          position: relative;
        }
        
        .scroll-highlight::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid var(--accent);
          opacity: 0;
          z-index: -1;
          border-radius: 1rem;
          animation: pulse-border 1.5s ease-out;
        }
        
        @keyframes pulse-border {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          70% {
            transform: scale(1.02);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        `
      }} />
    </header>
  );
}