import { useEffect } from "react";
import { motion } from "framer-motion";
import { ServicesSection } from "@/sections/services-section";
import { ContactSection } from "@/sections/contact-section";
import { Footer } from "@/sections/footer";
import { Navigation } from "@/components/ui/navigation";
import { Chatbot } from "@/components/ui/chatbot";
import { Button } from "@/components/ui/button";

export default function Services() {
  // Set up reveal on scroll animation (same as your home page)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Scroll to contact function (Very similar to your ServicesSection version)
  const scrollToContact = (subjectText?: string) => {
    if (subjectText) {
      localStorage.setItem("contactSubject", subjectText);
    }

    // Redirect to homepage contact section for proper scroll
    window.location.href = "/#contact";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navigation />

      {/* Your existing Services Section */}
      <ServicesSection />

      {/* Additional Services Information */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Our Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-primary text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Evidence-Based Approach</h3>
                  <p className="text-neutral-600">All our programs are grounded in the latest research and best practices in health education.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-primary text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customizable Solutions</h3>
                  <p className="text-neutral-600">We adapt our services to meet the unique needs of your organization and community.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-primary text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Ongoing Support</h3>
                  <p className="text-neutral-600">We provide continuous support and resources to ensure program success.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-primary text-sm"></i>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Expert Team</h3>
                  <p className="text-neutral-600">Our team consists of experienced health educators, researchers, and program developers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Need a customized solution?" block added here */}
      <div className="mt-16 text-center reveal">
        <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/80">
          <h3 className="font-heading text-2xl font-semibold mb-4">Need a customized solution?</h3>
          <p className="text-neutral-700 mb-6">We can create tailored programs to meet your organization's specific needs.</p>
          <Button
            size="lg"
            className="font-medium px-10"
            onClick={() => scrollToContact("Customized solution inquiry")}
          >
            Contact Our Team
            <i className="fas fa-chevron-right ml-2"></i>
          </Button>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </motion.div>
  );
}
