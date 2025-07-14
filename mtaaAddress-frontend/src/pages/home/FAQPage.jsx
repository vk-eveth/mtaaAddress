import { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";

const faqItems = [
  {
    question: "What is a digital address?",
    answer:
      "A digital address is a unique identifier for your location that can be shared easily and used for deliveries, services, and identification.",
  },
  {
    question: "How do I create my MtaaAddress?",
    answer:
      "You create your MtaaAddress by pinning your location on the map, adding a nearby landmark, and submitting it for verification.",
  },
  {
    question: "Who can see my digital address?",
    answer:
      "Your verified digital address can be shared by you with anyone you choose. It’s private until you decide to share it.",
  },
  {
    question: "Can I update my address if something changes?",
    answer:
      "Yes! You can update your landmark or location anytime through your dashboard to keep your address accurate.",
  },
  {
    question: "Is MtaaAddress free to use?",
    answer:
      "Absolutely. Creating and using your digital address is completely free.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-green-900 dark:via-green-700 dark:to-green-600 dark:text-white font-sans transition-colors duration-500">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <h1 className="text-4xl font-extrabold text-green-700 mb-12 text-center">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqItems.map(({ question, answer }, index) => (
            <button
              key={index}
              onClick={() => toggle(index)}
              className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow hover:shadow-lg"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-green-700 dark:text-green-400 font-semibold text-lg">
                  <FaQuestionCircle aria-hidden="true" />
                  <span>{question}</span>
                </div>
                <div className="text-green-700 dark:text-green-400">
                  {openIndex === index ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
                </div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
