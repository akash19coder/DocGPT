'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a wide range of services including web design, development, SEO, and digital marketing solutions tailored to meet your specific needs."
  },
  {
    question: "How long does it take to complete a project?",
    answer: "Project timelines vary depending on the scope and complexity. Typically, a standard website takes 4-8 weeks, while more complex projects may take longer. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we offer various support and maintenance packages to ensure your website remains up-to-date, secure, and performing optimally. We can discuss these options based on your specific requirements."
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing is project-based and depends on the specific requirements and scope of work. We offer competitive rates and will provide a detailed quote after our initial consultation."
  },
  {
    question: "Can you help with content creation?",
    answer: "We have a team of experienced copywriters who can help create engaging and SEO-friendly content for your website. This service can be included in your project package."
  }
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    (<section className="relative w-full py-16 bg-black text-white overflow-hidden">
      <div
        className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/20 rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left bg-white/5 hover:bg-white/10 transition-colors"
                onClick={() => toggleAccordion(index)}>
                <span className="text-lg font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-white/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white/5">
                  <p className="text-white/80">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>)
  );
}