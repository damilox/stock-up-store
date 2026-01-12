'use client'

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import OrderModal from '@/components/OrderModal';
import LoadingSpinner from '@/components/LoadingSpinner'; 
import RequestCard from '@/components/RequestCard'; // ✅ Cleanly Imported
import { useCart } from '@/store/useCart';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  Clock, 
  CheckCircle, 
  HelpCircle,
  AlertCircle,
  Share2
} from 'lucide-react';

export default function Home() {
  const items = useCart((state) => state.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const faqs = [
    { q: "How do I pay?", a: "After you send your list to WhatsApp, we confirm today's market prices and send you a total. You can then pay via Bank Transfer or Cash on Delivery." },
    { q: "Why are there no fixed prices?", a: "Market prices for raw foodstuffs change daily. We ensure you get the freshest items at the actual current market price plus a small service fee." },
    { q: "How long is delivery?", a: "We deliver to your hostel room within 60-90 minutes of order confirmation." },
    { q: "Can I request items not on the list?", a: "Yes! Use the search bar; if you don't find what you need, click the 'Request Item' button that appears." }
  ];

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="bg-green-600 p-4 rounded-3xl mb-4 animate-bounce shadow-xl shadow-green-100">
          <ShoppingBag className="text-white" size={40} />
        </div>
        <h1 className="text-3xl font-black text-slate-800 italic uppercase tracking-tighter">StockUp</h1>
        <div className="mt-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-32">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
                <ShoppingBag className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter italic">StockUp</h1>
          </div>
          
          <div className="relative p-2 bg-slate-100 rounded-full cursor-pointer hover:bg-slate-200" onClick={() => items.length > 0 && setIsModalOpen(true)}>
            <ShoppingBag className="text-slate-700" size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {items.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-10 pb-20 border-b border-slate-100">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-70"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
            Live Market Delivery
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Skip the Market Stress. <br />
            <span className="text-green-600 underline decoration-green-100 decoration-8 underline-offset-4">StockUp Your Room.</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed max-w-lg mx-auto md:mx-0">
            Order your foodstuffs directly to your hostel. Market-best prices, delivered to your door in Ilorin and Ekiti.
          </p>
        </div>
      </section>

      {/* Referral Banner */}
      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-30">
        <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-[2.5rem] p-6 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
          <div className="flex items-center gap-4">
            <Share2 className="text-white" size={28} />
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">Refer a Roommate!</h3>
              <p className="text-green-50 text-sm font-medium">Help a friend skip the market stress.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              const shareMsg = `Omo, have you seen StockUp? 🛍️ Order market items from your room! Link: ${window.location.href}`;
              window.location.href = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;
            }}
            className="bg-white text-green-700 font-black px-8 py-3 rounded-2xl active:scale-95"
          >
            Share on WhatsApp
          </button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6 mt-6">
        {/* Search & Filter */}
        <div className="space-y-6 mb-10">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder="Search rice, beans, oil..." 
              className="w-full p-5 pl-14 bg-white rounded-[2rem] border-none shadow-md focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-green-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => <ProductCard key={p.id} {...p} />)}
          <RequestCard /> {/* ✅ Used here as a clean component */}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 mt-8 shadow-inner">
            <AlertCircle className="mx-auto mb-6 text-slate-300" size={48}/>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Can't find "{searchTerm}"?</h3>
            <button 
              onClick={() => {
                const msg = `Hello StockUp! 👋 I'm looking for *${searchTerm}* but couldn't find it. Can you help?`;
                window.location.href = `https://wa.me/2348102816015?text=${encodeURIComponent(msg)}`;
              }}
              className="mt-8 bg-green-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl active:scale-95 transition-transform"
            >
              Request on WhatsApp
            </button>
          </div>
        )}

        {/* FAQ Section */}
        <section className="mt-24 max-w-2xl mx-auto px-2">
          <div className="flex items-center justify-center gap-3 mb-8">
            <HelpCircle className="text-green-600" />
            <h2 className="text-2xl font-black text-slate-800">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center font-bold text-slate-700">
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-green-600"/> : <ChevronDown size={20}/>}
                </button>
                {openFaq === idx && <div className="px-6 pb-6 text-slate-500 text-sm border-t border-slate-50 pt-4 font-medium italic">"{faq.a}"</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 text-center border-t border-slate-100 pt-16">
          <div className="flex justify-center items-center gap-2 mb-4">
             <ShoppingBag className="text-green-600" size={24} />
             <span className="text-2xl font-black text-slate-800 italic uppercase">StockUp</span>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest border-t pt-8">
            Created by <a href="https://ajetomobi-damilola.vercel.app" target="_blank" className="text-slate-900 underline underline-offset-4 decoration-2">Damilola</a>
          </p>
        </footer>
      </div>

      {/* Floating Checkout */}
      {items.length > 0 && (
        <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full max-w-md mx-auto bg-green-600 text-white p-1 rounded-[2.5rem] shadow-2xl flex items-center justify-between border-4 border-white transition-all active:scale-95"
          >
            <div className="pl-6 py-4 flex flex-col items-start">
              <span className="text-[10px] uppercase font-black text-green-100 tracking-widest">{items.length} items</span>
              <span className="font-bold text-xl tracking-tight italic">View List</span>
            </div>
            <div className="bg-white m-1 p-5 rounded-[2rem] text-green-600 font-bold"><Truck size={28} /></div>
          </button>
        </div>
      )}

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}