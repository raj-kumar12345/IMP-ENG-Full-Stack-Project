import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "If I buy this course, will I really be able to speak English fluently in 90 days?",
      a: "Yes. Our curriculum is designed for result-oriented learning. By combining live expert sessions with our 24/7 AI Speaking Partner, most students see a 40% improvement in confidence within the first month.",
    },
    {
      q: "What if I don't like the teaching style? Is my money safe?",
      a: "Absolutely. We offer a 7-Day No-Questions-Asked Refund Policy. If you feel the course isn't a perfect fit after the first week, we will refund 100% of your payment instantly.",
    },
    {
      q: "I have a job/college. What happens if I miss a live class?",
      a: "Every live session is recorded in HD and uploaded to your personal dashboard within 2 hours. You can watch these recordings anytime, as many times as you need.",
    },
    {
      q: "I don't have anyone to practice English with at home. How will I improve?",
      a: "This is our specialty. You get access to a Private Discord Community of 500k+ learners and our Talk-AI tool to practice conversations 24/7.",
    },
    {
      q: "I am a complete beginner. Will the Advanced English cohort be too hard?",
      a: "We recommend our Beginner English Cohort for foundation building. You can take our free AI level test on the home page to find your perfect starting point.",
    },
    {
      q: "Will I get a certificate for my Resume or LinkedIn?",
      a: "Yes! Upon successful completion, you will receive an Industry-Recognized Digital Certificate to validate your communication skills to employers.",
    },
    {
      q: "Do I lose access to the materials once the 3 months are over?",
      a: "Never. You get Lifetime Access to all recorded lectures, PDF notes, and the community—even after the live cohort ends.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#0a0a0a] py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f06525]"></span>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold">Support Center</p>
          </div>
          <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter">
            Still Have <span className="text-zinc-600">Questions?</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index 
                ? "border-[#f06525] bg-zinc-900/40" 
                : "border-zinc-800 bg-transparent hover:border-zinc-700"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors ${
                  openIndex === index ? "text-white" : "text-zinc-400"
                }`}>
                  {faq.q}
                </span>
                <span className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <FiMinus className="text-[#f06525] text-2xl" />
                  ) : (
                    <FiPlus className="text-zinc-600 text-2xl" />
                  )}
                </span>
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-800/50 mt-2">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;