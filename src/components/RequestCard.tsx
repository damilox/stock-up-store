'use client'
import { PlusCircle } from 'lucide-react';

export default function RequestCard() {
  const phoneNumber = "2348102816015";
  const message = "Hello StockUp! I want to order something not on the list.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      className="bg-white group rounded-[2.5rem] p-6 border-2 border-dashed border-green-200 flex flex-col items-center justify-center text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer min-h-[300px] w-full block no-underline"
    >
      <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
        <PlusCircle size={40} />
      </div>
      <h3 className="font-black text-xl text-slate-800 tracking-tight">Don't see it?</h3>
      <p className="text-sm text-slate-500 mt-2 font-medium">
        Click here to tell us what you need from the market!
      </p>
      <div className="mt-4 px-6 py-2 bg-green-600 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-md">
        Request Custom Item
      </div>
    </a>
  );
}