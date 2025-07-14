// src/pages/Help.jsx
import DashboardLayout from "../../layouts/DashboardLayout";
import { useState } from "react";
import { HelpCircle, ChevronDown, Mail } from "lucide-react";

const faqs = [
  {
    question: "What is a Mtaa Address?",
    answer:
      "A Mtaa Address is a unique digital identifier tied to a specific location and a recognizable landmark, helping you share your place even without a street name or formal address.",
  },
  {
    question: "How do I create my own address?",
    answer:
      "Click on 'Create Address' in the dashboard, select your location on the map, enter your landmark, and submit. You’ll get a shareable code instantly.",
  },
  {
    question: "Who can use MtaaAddress?",
    answer:
      "Anyone! It's designed for residents, delivery drivers, emergency services, and even local authorities.",
  },
  {
    question: "Is my location data secure?",
    answer:
      "Yes. We only store necessary data and follow best practices to keep your location and personal info private.",
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-2">
          <HelpCircle /> Help & Support
        </h1>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left hover:bg-accent/10 dark:hover:bg-gray-700 transition"
              >
                <span className="font-medium text-base">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${openIndex === index ? "rotate-180 text-accent" : ""}`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            If your question isn’t answered here, you can reach us anytime.
          </p>
          <a
            href="mailto:support@mtaaaddress.africa"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2 rounded-md shadow transition"
          >
            <Mail size={18} /> Contact Support
          </a>
        </div>
      </div>
  );
}
