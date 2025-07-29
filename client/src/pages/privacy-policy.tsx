import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/sections/footer";
import { Chatbot } from "@/components/ui/chatbot";
import { SectionTitle } from "@/components/ui/section-title";
// Import your logo asset
import LogoImage from "@/assets/logo.png";

export default function PrivacyPolicy() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    // Simple reveal animation for elements
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Navigation />

      {/* Blurred logo background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 flex justify-center items-center -z-10"
        style={{ userSelect: "none", overflow: "hidden" }}
      >
        <img
          src={LogoImage}
          alt="Confidante Logo Background"
          className="max-w-full opacity-10 blur-3xl select-none"
          style={{
            width: "70vw",
            height: "auto",
            filter: "blur(10px)",
            transform: "scale(1.2)",
          }}
        />
      </div>

      <section className="py-24 bg-gradient-to-br from-soft-peach via-white to-soft-teal relative overflow-hidden">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <SectionTitle
              title="Privacy Policy"
              description="Your privacy matters. Here's how we protect it."
              centered
              accentColor="primary"
            />
          </div>
          <div className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg text-neutral-800 space-y-8 text-base reveal relative z-10">
            <p>
              <b>Last updated:</b> July 30, 2025
            </p>
            <p>
              <b>Confidante</b> is committed to protecting your privacy. We want you to understand exactly how we handle your information when you visit our website (<span className="text-primary"></span>).
            </p>
            <h2 className="font-bold mt-4 mb-2 text-lg">No Data Collection</h2>
            <p>
              We do <b>not</b> collect any personal information from visitors. Our website <b>does not</b> use sign-ups, contact forms requiring personal information, or user account systems.
            </p>
            <h2 className="font-bold mt-4 mb-2 text-lg">No Cookies or Tracking</h2>
            <p>
              We do <b>not</b> use cookies, analytics services, or any automatic tracking technologies. Your visit to our website is completely anonymous.
            </p>
            <h2 className="font-bold mt-4 mb-2 text-lg">Content-Only Site</h2>
            <p>
              Our website is strictly informational. You can browse all sections of Confidante.co.in without sharing any personal data.
            </p>
            <h2 className="font-bold mt-4 mb-2 text-lg">Links to Other Websites</h2>
            <p>
              Our website may contain links to external sites (such as our social media pages). We do not control the privacy practices of those websites. Please review their privacy policies if you visit them.
            </p>
            <h2 className="font-bold mt-4 mb-2 text-lg">Children’s Privacy</h2>
            <p>
              Our website is safe for all ages and does not knowingly collect data from children or anyone else.
            </p>
            <h2 className="font-bold mt-4 mb-2 text-lg">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please email us at: <a href="mailto:helpatconfidante@gmail.com" className="text-primary hover:underline">helpatconfidante@gmail.com</a>
            </p>
            <p>
              By using our website, you acknowledge and agree to this policy.
            </p>
          </div>
        </div>
      </section>
      <Footer />
      <Chatbot />
    </motion.div>
  );
}
