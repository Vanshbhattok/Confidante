import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { useState } from "react";

// ✅ Importing images from src/assets
import shreyaImg from "@/assets/Shreya_mittal.jpg";
import muskaanImg from "@/assets/Psychologist_mentor.jpg";
import vanshImg from "@/assets/vansh_bhatt.jpg";
import arushiImg from "@/assets/blank-profile-picture.png";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  roleColor: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
    website?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Shreya Mittal",
    role: "Founder",
    bio: "Passionate about transforming health education for schools and communities.",
    image: shreyaImg,
    roleColor: "text-primary",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/your-confidante/posts/?feedView=all",
      instagram: "https://www.instagram.com/your.confidante/"
    }
  },
  {
    name: "Muskaan Sharma",
    role: "Psychologist (Mentor)",
    bio: "Dedicated to promoting mental wellness and psychological support for young minds.",
    image: muskaanImg,
    roleColor: "text-secondary",
    socialLinks: {
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    name: "Vansh Bhatt",
    role: "Technical Lead",
    bio: "Leading the technical development and innovation to create scalable health education solutions.",
    image: vanshImg,
    roleColor: "text-primary",
    socialLinks: {
      linkedin: "#",
      github: "#",
      instagram: "#"
    }
  },
  {
    name: "Arushi",
    role: "Team Member",
    bio: "Contributing to the mission of making health education accessible and impactful for everyone.",
    image: arushiImg,
    roleColor: "text-muted-foreground",
    socialLinks: {
      linkedin: "#",
      instagram: "#"
    }
  }
];

export function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const membersPerView = 3;
  const maxIndex = Math.max(0, teamMembers.length - membersPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <SectionTitle
            title="Our Team"
            description="Meet the passionate experts behind Confidante who are dedicated to transforming health education."
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Team Members Container */}
          <div className="overflow-hidden px-12">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: `translateX(-${currentIndex * (100 / membersPerView)}%)` }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-xl shadow-sm bg-neutral-100 reveal card-hover flex-shrink-0"
                  style={{ 
                    width: `calc(${100 / membersPerView}% - 2rem)`,
                    animationDelay: `${index * 0.2}s` 
                  }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-medium mb-1">{member.name}</h3>
                    <p className={`${member.roleColor} mb-4`}>{member.role}</p>
                    <p className="text-neutral-800/70 text-sm">{member.bio}</p>

                    <div className="flex gap-3 mt-4">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} className="text-neutral-800/60 hover:text-primary transition-colors">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      )}
                      {member.socialLinks.instagram && (
                        <a href={member.socialLinks.instagram} className="text-neutral-800/60 hover:text-primary transition-colors">
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} className="text-neutral-800/60 hover:text-primary transition-colors">
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}
                      {member.socialLinks.github && (
                        <a href={member.socialLinks.github} className="text-neutral-800/60 hover:text-primary transition-colors">
                          <i className="fab fa-github"></i>
                        </a>
                      )}
                      {member.socialLinks.website && (
                        <a href={member.socialLinks.website} className="text-neutral-800/60 hover:text-primary transition-colors">
                          <i className="fas fa-globe"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-primary' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}