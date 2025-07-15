import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";

const FeatureIcon = ({ icon, text, color, bgColor }: { icon: string; text: string; color: string; bgColor: string }) => (
  <motion.div 
    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md"
    whileHover={{ y: -3, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className={`w-14 h-14 ${bgColor} rounded-xl shadow-sm flex items-center justify-center flex-shrink-0`}>
      <i className={`${icon} ${color} text-xl`}></i>
    </div>
    <div>
      <span className="font-medium block mb-1">{text}</span>
      <span className="text-sm text-neutral-600">Holistic support</span>
    </div>
  </motion.div>
);

export function AboutSection() {
  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-soft-peach via-white to-soft-teal relative overflow-hidden">
      {/* Simplified decorative elements */}
      <div className="absolute top-1/4 left-0 w-full h-[500px] -skew-y-6 bg-primary/5 -z-10"></div>
      
      {/* Reduced floating shapes - only one subtle animation */}
      <motion.div 
        className="absolute top-[15%] right-[8%] w-12 h-12 rounded-full bg-primary/8 hidden lg:block"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="About Confidante"
            description="Learn how we're reimagining health and wellness education for today's world."
            centered={true}
            accentColor="primary"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.p variants={itemVariants} className="text-lg text-neutral-700 leading-relaxed">
                Confidante is a health and well-being startup dedicated to educating and supporting all aspects of health—beyond the physical. While many focus on physical health, we address the often-overlooked areas of mental, emotional, and social well-being.
              </motion.p>
              
              <motion.p variants={itemVariants} className="text-lg text-neutral-700 leading-relaxed">
                Our mission is to bring essential health education to schools and build an accessible platform where learning about these critical topics is easier than ever. We don't just start conversations, we turn them into real change.
              </motion.p>
              
              <motion.div variants={itemVariants} className="py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureIcon
                  icon="fas fa-brain"
                  text="Mental Health"
                  color="text-primary"
                  bgColor="bg-primary/10"
                />
                <FeatureIcon
                  icon="fas fa-heart"
                  text="Emotional Wellness"
                  color="text-secondary"
                  bgColor="bg-secondary/10"
                />
                <FeatureIcon
                  icon="fas fa-users"
                  text="Social Health"
                  color="text-accent"
                  bgColor="bg-accent/10"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="pt-4">
                <Button 
                  variant="soft" 
                  size="lg" 
                  className="font-medium group"
                >
                  Learn more about our approach
                  <i className="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Simplified decorative patterns */}
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary/15 rounded-3xl transform rotate-3"></div>
              <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-accent/15 rounded-3xl transform -rotate-3"></div>
              
              {/* Main image with subtle hover effect */}
              <motion.div 
                className="relative bg-white p-3 rounded-3xl shadow-xl overflow-hidden"
                whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800" 
                  alt="Confidante wellness center" 
                  className="rounded-2xl w-full h-auto"
                />
                
                {/* Simple badge overlay instead of stats */}
                <motion.div 
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-neutral-700">Active</span>
                  </div>
                </motion.div>
                
                {/* Mission badge */}
                <motion.div 
                  className="absolute bottom-6 left-6 bg-primary/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <i className="fas fa-heart text-white text-sm"></i>
                    <span className="text-sm font-medium text-white">Making Impact</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}