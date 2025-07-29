import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import shreyaImg from "@/assets/Shreya_mittal.jpg";
import muskaanImg from "@/assets/Psychologist_mentor.jpg";
import vanshImg from "@/assets/Vansh_bhatt.jpg";
import arushiImg from "@/assets/blank-profile-picture.png";
import { useLocation } from "wouter";

export function HeroSection() {
  const [, setLocation] = useLocation();

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 100,
        delay: 0.5
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(255, 174, 66, 0.25), 0 10px 10px -5px rgba(255, 174, 66, 0.15)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const floatingImageVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.8
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 pb-8 overflow-hidden">
      {/* Enhanced background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-soft-peach via-white to-soft-teal"
        aria-hidden="true"
      />
      
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft shapes - enhanced for mobile */}
        <div className="absolute top-1/4 right-[5%] sm:right-[10%] w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] rounded-full bg-primary/5 blur-[40px] sm:blur-[60px]" />
        <div className="absolute bottom-1/3 left-[5%] w-[180px] sm:w-[250px] lg:w-[350px] h-[180px] sm:h-[250px] lg:h-[350px] rounded-full bg-accent/5 blur-[50px] sm:blur-[80px]" />
        <div className="absolute top-1/3 left-[10%] sm:left-[15%] w-[120px] sm:w-[150px] lg:w-[200px] h-[120px] sm:h-[150px] lg:h-[200px] rounded-full bg-secondary/5 blur-[30px] sm:blur-[40px]" />
        
        {/* Animated circles - hidden on small screens, visible on medium+ */}
        <motion.div 
          className="hidden sm:block absolute top-[20%] right-[15%] w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full bg-primary/20 backdrop-blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="hidden sm:block absolute bottom-[25%] left-[20%] w-[20px] md:w-[30px] h-[20px] md:h-[30px] rounded-full bg-secondary/30 backdrop-blur-sm"
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Gentle floating elements for tranquility */}
        <motion.div 
          className="absolute top-[15%] left-[85%] w-[15px] h-[15px] rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[40%] right-[90%] w-[12px] h-[12px] rounded-full bg-accent/25"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Soft meditation elements */}
        <motion.div 
          className="absolute top-[60%] left-[5%] w-[8px] h-[8px] rounded-full bg-soft-peach/40"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-[25%] right-[5%] w-[10px] h-[10px] rounded-full bg-soft-teal/40"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span 
              variants={itemVariants} 
              className="inline-block px-4 py-2 rounded-full bg-primary/8 text-primary text-sm font-medium mb-6 backdrop-blur-sm border border-primary/10"
            >
              🌱 Your journey to inner peace starts here
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6 leading-tight"
            >
              Health and well-being, 
              <span className="block text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                beyond the physical
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-neutral-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              At Confidante, we believe true wellness encompasses mental, emotional, and social health—not just physical. Discover a holistic approach to wellness that nurtures every aspect of your being.
            </motion.p>
            
            <motion.div
              variants={buttonVariants}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8"
            >
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/90 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base border-0 min-w-[180px]"
                  onClick={(e) => {
                    e.preventDefault();
                    
                    if (window.location.pathname === "/") {
                      const aboutSection = document.getElementById("about");
                      if (aboutSection) {
                        aboutSection.classList.add("scroll-highlight");

                        window.scrollTo({
                          top: aboutSection.offsetTop - 80,
                          behavior: "smooth",
                        });

                        setTimeout(() => {
                          aboutSection.classList.remove("scroll-highlight");
                        }, 1500);
                      }
                    } else {
                      window.location.href = "/";

                      setTimeout(() => {
                        const aboutSection = document.getElementById("about");
                        if (aboutSection) {
                          aboutSection.classList.add("scroll-highlight");

                          window.scrollTo({
                            top: aboutSection.offsetTop - 80,
                            behavior: "smooth",
                          });

                          setTimeout(() => {
                            aboutSection.classList.remove("scroll-highlight");
                          }, 1500);
                        }
                      }, 300);
                    }
                  }}
                >
                  Get Started
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Button>
              </motion.div>
              
              <motion.a 
                href="/services" 
                onClick={(e) => {
                  e.preventDefault();
                  setLocation("/services");
                  window.scrollTo(0, 0);
                }}
                className="flex items-center text-neutral-700 font-medium hover:text-primary transition-all duration-300 group py-2 px-4 rounded-full hover:bg-primary/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">Explore Services</span>
                <motion.i 
                  className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.a>
            </motion.div>
            
            {/* Peaceful community section */}
            <motion.div 
              variants={statsVariants}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                    <img 
                      src={shreyaImg} 
                      alt="Shreya Mittal - Founder" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                    <img 
                      src={muskaanImg} 
                      alt="Muskaan Sharma - Psychologist" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                    <img 
                      src={vanshImg} 
                      alt="Vansh Bhatt - Team Member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-md backdrop-blur-sm">
                    <span className="text-xs font-semibold text-primary">+1</span>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-sm text-neutral-600">Join our peaceful community</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5 mt-8 lg:mt-0"
            variants={floatingImageVariants}
            animate="animate"
          >
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Background decorative elements */}
              <div className="absolute -left-4 lg:-left-6 -top-4 lg:-top-6 w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl transform rotate-3 backdrop-blur-sm"></div>
              <div className="absolute -right-4 lg:-right-6 -bottom-4 lg:-bottom-6 w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl transform -rotate-3 backdrop-blur-sm"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Holistic health and wellness - person in peaceful meditation" 
                className="relative z-10 rounded-3xl shadow-2xl object-cover h-[400px] sm:h-[450px] lg:h-[500px] w-full"
              />
              
              {/* Enhanced floating cards */}
              <motion.div 
                className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 z-20 border border-white/50"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: "spring", damping: 15 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-soft-peach to-primary/20 rounded-full flex items-center justify-center shadow-inner">
                    <i className="fas fa-heart text-primary text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 text-sm">Holistic Care</h4>
                    <p className="text-xs text-neutral-600">Mind, body & spirit</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-3 sm:-top-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 z-20 border border-white/50"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.6, type: "spring", damping: 15 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-soft-teal to-accent/20 rounded-full flex items-center justify-center shadow-inner">
                    <i className="fas fa-brain text-accent text-lg"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-800 text-sm">Mental Health</h4>
                    <p className="text-xs text-neutral-600">Expert support</p>
                  </div>
                </div>
              </motion.div>

              {/* New mindfulness quote */}
              <motion.div 
                className="absolute top-1/2 -left-2 sm:-left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 z-20 border border-white/50 max-w-[140px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-soft-teal to-accent/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i className="fas fa-leaf text-accent text-xs"></i>
                  </div>
                  <div className="text-xs font-medium text-neutral-700 leading-relaxed">
                    "Peace comes from within"
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Breathing indicator for mindfulness */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-neutral-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-3 h-3 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 mb-2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <span className="text-xs">Breathe</span>
      </motion.div>
    </section>
  );
}
