import { useEffect } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/sections/footer";
import { Chatbot } from "@/components/ui/chatbot";
// Import your logo asset
import LogoImage from "@/assets/logo.png";

export default function About() {
  // Set up reveal on scroll animation like other pages
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
            width: "50vw",
            height: "auto",
            filter: "blur(3px)",
            transform: "scale(1.2)",
          }}
        />
      </div>

      <section className="py-24 bg-gradient-to-br from-soft-peach via-white to-soft-teal relative overflow-hidden">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <SectionTitle
              title="About Confidante"
              description="Empowering Youth Through Education and Safe Conversations"
              centered
              accentColor="primary"
            />
          </div>

          <div className="space-y-8 text-neutral-700 text-lg reveal relative z-10">
            {/* Your content paragraphs */}
            <p>
              Confidante is a youth-led initiative that truly believes in creating a safer, more informed world for young people. It was founded by Shreya Mittal with the simple yet powerful idea that everyone deserves access to the right information about their mind, body, and emotions. What started as a response to the silence around topics like mental health, sex education, and emotional growth has grown into a vibrant community that reaches out to students across the country.
            </p>

            <p>
              The vision behind Confidante is to normalize conversations that are often brushed under the rug and to empower the youth to make informed, confident choices. The mission is clear: to create inclusive spaces where learning feels safe and real, and where questions are welcomed, not judged.
            </p>

            <p>
              Though it doesn’t sell a physical product, Confidante’s real "offering" lies in its workshops, digital content, and engaging awareness campaigns. It works mainly through social media and collaborations with schools, colleges, and youth-focused organizations across India, ensuring its message reaches as many young minds as possible. Incubated under Runway, it’s steadily growing with a strong foundation of purpose and empathy.
            </p>

            <p>
              The project is designed for teenagers aged 13 to 16 and focuses on topics such as mental well-being, emotional growth, and self-awareness. The sessions are interactive, thoughtful, and designed to connect with what young people actually experience in their daily lives.
            </p>

            <p>
              The project is helping create safe spaces for conversations that many students don’t usually get to have. These sessions go beyond textbooks and offer tools for personal growth, understanding emotions, and building confidence. The idea is to not just inform but to genuinely connect with young minds and support their journey in becoming emotionally strong and aware individuals.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </motion.div>
  );
}
