import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
  options?: string[];
}

// Define the conversation tree structure
const conversationTree: Record<string, { response: string; options?: string[]; action?: string }> = {
  // Main menu
  "Learn about our programs": {
    response: "We offer several specialized programs. Which area interests you most?",
    options: ["School Programs", "Mental Health Education", "Community Workshops", "Professional Development"]
  },
  
  "Talk to a specialist": {
    response: "I'd be happy to connect you with one of our specialists. What area do you need support with?",
    options: ["Mental Health", "Emotional Wellness", "Social Health", "General Wellness"]
  },
  
  "How does Confidante work?": {
    response: "Confidante provides holistic health education that goes beyond physical health. We bring mental, emotional, and social health education to schools and communities through tailored programs and expert-led workshops.",
    options: ["Learn more about our approach", "See our success stories", "Book a consultation", "Back to main menu"]
  },
  
  "Schedule a consultation": {
    response: "Great! To schedule a consultation, we'll need a few details. What type of consultation are you looking for?",
    options: ["Individual consultation", "School/Organization consultation", "Community workshop planning", "Professional development"]
  },

  // School Programs branch (simplified)
  "School Programs": {
    response: "Our school programs are designed to support students' mental and emotional wellbeing across all grade levels. We focus on emotional awareness, social skills, stress management, and creating supportive school environments.",
    options: ["Contact our team", "Learn about other programs", "Back to main menu"]
  },

  // Mental Health branch
  "Mental Health": {
    response: "Our mental health specialists can help with various concerns. What best describes what you're experiencing?",
    options: ["Stress & Anxiety", "Depression & Mood", "Relationship Issues", "Life Transitions", "Academic/Work Pressure"]
  },

  "Stress & Anxiety": {
    response: "Stress and anxiety are very common. We can help you develop coping strategies. What triggers your stress most?",
    options: ["Work/School pressure", "Social situations", "Health concerns", "Financial worries", "General anxiety"]
  },

  "Work/School pressure": {
    response: "Academic and work stress can be overwhelming. We offer practical strategies to help you manage. What would help you most?",
    options: ["Time management techniques", "Study/work strategies", "Relaxation methods", "Goal setting support"]
  },

  "Social situations": {
    response: "Social anxiety is very treatable. We can work on building your confidence in social settings. What specific situations are challenging?",
    options: ["Public speaking", "Meeting new people", "Group settings", "Dating/relationships", "Workplace interactions"]
  },

  "Depression & Mood": {
    response: "Thank you for reaching out about this. Depression is treatable and you don't have to face it alone. What symptoms are you experiencing?",
    options: ["Low mood/sadness", "Loss of interest", "Sleep problems", "Energy issues", "I'd prefer to speak privately"]
  },

  // Emotional Wellness branch
  "Emotional Wellness": {
    response: "Emotional wellness is about understanding and managing your emotions effectively. What area would you like to work on?",
    options: ["Emotional awareness", "Anger management", "Building resilience", "Self-compassion", "Mindfulness practices"]
  },

  "Emotional awareness": {
    response: "Learning to identify and understand your emotions is foundational to wellness. How would you like to start?",
    options: ["Emotion identification exercises", "Journaling techniques", "Body awareness practices", "Trigger recognition"]
  },

  "Anger management": {
    response: "Learning healthy ways to express and manage anger is important. What situations typically trigger your anger?",
    options: ["Family conflicts", "Work situations", "Traffic/daily hassles", "Feeling misunderstood", "Past trauma"]
  },

  // Community Workshops branch
  "Community Workshops": {
    response: "Our community workshops bring mental health education to neighborhoods and organizations. What type of workshop interests you?",
    options: ["Stress management", "Parenting support", "Workplace wellness", "Senior mental health", "Youth programs"]
  },

  "Stress management": {
    response: "Our stress management workshops teach practical techniques for daily life. What format works best for you?",
    options: ["Single session workshop", "4-week series", "Online workshop", "In-person group", "Private session"]
  },

  "Parenting support": {
    response: "Parenting workshops help families build stronger relationships and communication. What's your main concern?",
    options: ["Communication with teens", "Managing behavior", "Supporting anxious children", "Screen time boundaries", "Family stress"]
  },

  // Consultation types
  "Individual consultation": {
    response: "Individual consultations are 50-60 minutes and can be in-person or virtual. What would you prefer?",
    options: ["In-person meeting", "Virtual consultation", "Phone consultation", "Check availability"]
  },

  "School/Organization consultation": {
    response: "We work with schools and organizations to develop comprehensive wellness programs. What's your role?",
    options: ["School administrator", "Teacher/counselor", "HR professional", "Community leader", "Parent advocate"]
  },

  // Contact options with specific actions
  "Contact our team": {
    response: "We'd love to hear from you! How would you prefer to get in touch?",
    options: ["Send us an email", "Call us now", "Fill contact form", "Back to main menu"]
  },

  "Send us an email": {
    response: "You can reach us directly at: helpatconfidante@gmail.com\n\nFeel free to share your questions, concerns, or program interests. We typically respond within 24 hours.",
    action: "email",
    options: ["Call us instead", "Fill contact form", "Back to main menu"]
  },

  "Call us now": {
    response: "You can call us at:\n📞 +91 98391 54888\n📞 +91 75058 43873\n\nOur team is available during business hours to discuss your needs and answer any questions.",
    action: "phone",
    options: ["Send us an email", "Fill contact form", "Back to main menu"]
  },

  "Fill contact form": {
    response: "Perfect! Our contact form allows you to share detailed information about your needs. You'll find it on our website's contact section.",
    action: "form",
    options: ["Send us an email", "Call us now", "Back to main menu"]
  },

  // Back navigation
  "Back to main menu": {
    response: "Welcome back! How can I help you today?",
    options: ["Learn about our programs", "Talk to a specialist", "How does Confidante work?", "Schedule a consultation"]
  },

  // Final action items
  "Book consultation now": {
    response: "Perfect! To book your consultation, please contact us directly and we'll schedule a time that works for you.",
    options: ["Contact our team", "Back to main menu"]
  },

  "Get more information": {
    response: "I'd be happy to provide more detailed information about our programs and services.",
    options: ["Contact our team", "Back to main menu"]
  },

  // Simplified end nodes
  "Time management techniques": {
    response: "Our specialists teach proven time management strategies including prioritization, scheduling, and boundary setting. Ready to get started?",
    options: ["Contact our team", "Explore other topics", "Back to main menu"]
  },

  "Public speaking": {
    response: "We offer specialized support for public speaking anxiety using gradual exposure and confidence-building techniques. This is very treatable!",
    options: ["Contact our team", "Join our group workshop", "Back to main menu"]
  },

  "Explore other topics": {
    response: "What other area would you like to explore?",
    options: ["Mental Health", "Emotional Wellness", "Community Workshops", "Back to main menu"]
  },

  "Join our group workshop": {
    response: "Our group workshops are a great way to practice skills in a supportive environment. We offer various workshop formats throughout the month.",
    options: ["Contact our team", "Back to main menu"]
  }
};

const initialOptions = [
  "Learn about our programs",
  "Talk to a specialist", 
  "How does Confidante work?",
  "Schedule a consultation"
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show greeting message after a brief delay
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        const welcomeMessage: Message = { 
          text: "Hello! I'm Confidante's wellness assistant. I'm here to help you find the right support for your mental health and wellness journey. Please choose from the options below:", 
          isUser: false,
          options: initialOptions
        };
        setMessages([welcomeMessage]);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Handle option selection
  const handleOptionClick = (option: string) => {
    // Add user message
    const userMessage: Message = { text: option, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    
    setTimeout(() => {
      const response = conversationTree[option];
      
      if (response) {
        const botMessage: Message = { 
          text: response.response, 
          isUser: false,
          options: response.options || ["Contact our team", "Back to main menu"]
        };
        setMessages((prev) => [...prev, botMessage]);
        
        // Handle special actions
        if (response.action === 'email') {
          // Could trigger email client
          setTimeout(() => {
            window.location.href = 'mailto:helpatconfidante@gmail.com?subject=Inquiry from Confidante Website';
          }, 2000);
        } else if (response.action === 'phone') {
          // Could trigger phone call on mobile
          setTimeout(() => {
            const phone = '+919839154858'; // Using first number, formatted for tel: link
            window.location.href = `tel:${phone}`;
          }, 2000);
        } else if (response.action === 'form') {
          // Could scroll to contact form or trigger modal
          setTimeout(() => {
            // Assuming contact form is on the same page
            const contactForm = document.getElementById('contact-form') || document.querySelector('form');
            if (contactForm) {
              contactForm.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1000);
        }
        
      } else {
        // Fallback response
        const botMessage: Message = { 
          text: "I'd be happy to help you with that! Let me connect you with the right resources.", 
          isUser: false,
          options: ["Contact our team", "Back to main menu"]
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    }, 800);
  };

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 15, stiffness: 300 }}
              className="mb-4 w-[340px] bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/10"
            >
              <div className="bg-accent/20 backdrop-blur-sm p-4 flex justify-between items-center border-b border-accent/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shadow-inner">
                    <i className="fas fa-heart text-accent"></i>
                  </div>
                  <div>
                    <h3 className="text-neutral-800 font-medium">Confidante Wellness</h3>
                    <div className="flex items-center text-xs text-neutral-600">
                      <span className="block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                      Choose an option below
                    </div>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChat}
                  className="text-neutral-600 hover:text-neutral-800 transition-colors p-1.5 rounded-full hover:bg-neutral-100"
                >
                  <i className="fas fa-times"></i>
                </motion.button>
              </div>
              
              <div className="p-4 h-[380px] overflow-y-auto bg-soft-teal/10">
                {messages.map((msg, index) => (
                  <motion.div 
                    key={index} 
                    className={cn(
                      "flex items-start gap-2 mb-4",
                      msg.isUser && "justify-end"
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {!msg.isUser && (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <i className="fas fa-heart text-accent text-sm"></i>
                      </div>
                    )}
                    <div 
                      className={cn(
                        "rounded-2xl p-3 max-w-[85%] shadow-sm",
                        msg.isUser 
                          ? "bg-primary text-white rounded-tr-none" 
                          : "bg-white rounded-tl-none"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      
                      {msg.options && msg.options.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.options.map((option, i) => (
                            <motion.button
                              key={i}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left text-xs py-2.5 px-3 rounded-lg bg-gradient-to-r from-neutral-50 to-neutral-100 hover:from-accent/10 hover:to-accent/5 transition-all duration-200 text-neutral-800 border border-neutral-200 hover:border-accent/30"
                              whileHover={{ scale: 1.02, x: 2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span className="flex items-center justify-between">
                                {option}
                                <i className="fas fa-chevron-right text-neutral-400 text-xs"></i>
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-4 border-t border-neutral-200 bg-white">
                <div className="text-center">
                  <p className="text-xs text-neutral-500 mb-2">Choose from the options above to continue</p>
                  <div className="flex justify-center gap-2">
                    <motion.button
                      onClick={() => handleOptionClick("Back to main menu")}
                      className="text-xs bg-neutral-100 text-neutral-600 py-2 px-4 rounded-full hover:bg-neutral-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-home mr-1"></i>
                      Main Menu
                    </motion.button>
                    <motion.button
                      onClick={() => handleOptionClick("Contact our team")}
                      className="text-xs bg-accent/10 text-accent py-2 px-4 rounded-full hover:bg-accent/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-envelope mr-1"></i>
                      Contact Us
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-accent shadow-lg flex items-center justify-center text-white hover:bg-accent/90 transition-all"
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-heart"} text-xl`}></i>
        </motion.button>
      </div>
    </div>
  );
}