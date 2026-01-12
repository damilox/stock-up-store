'use client'
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    q: "How do I pay?",
    a: "After you send your order to WhatsApp, we will confirm the total price based on market rates. You can then pay via Bank Transfer to the account details we provide."
  },
  {
    q: "How long does delivery take?",
    a: "We usually deliver within 45 to 90 minutes depending on your hostel location and market traffic."
  },
  {
    q: "Why are there no fixed prices?",
    a: "Foodstuff prices in the market change daily. We ensure you get the freshest items at the actual current market price plus a small service fee."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-20 border-t pt-10 px-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, i) => (
          <div key={i} className="border-b border-slate-200 pb-4 cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <div className="flex justify-between items-center font-semibold text-slate-700">
              <span>{item.q}</span>
              {openIndex === i ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
            </div>
            {openIndex === i && <p className="mt-2 text-slate-500 text-sm leading-relaxed">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}