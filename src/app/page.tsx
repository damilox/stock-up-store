'use client'
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import OrderModal from '@/components/OrderModal';
import LoadingSpinner from '@/components/LoadingSpinner'; 
import { useCart } from '@/store/useCart';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Truck, 
  Clock, 
  CheckCircle, 
  HelpCircle,
  AlertCircle,
  Share2,
  PlusCircle
} from 'lucide-react';

// RequestCard Component defined internally for convenience
function RequestCard() {
  return (
    <div className="bg-white group rounded-[2.5rem] p-6 border-2 border-dashed border-green-200 flex flex-col items-center justify-center text-center hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer min-h-[300px]"
         onClick={() => window.open(`https://wa.me/234XXXXXXXXXX?text=Hello StockUp! 👋 I want to order something not on the list.`)}>
      <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4 group-hover:scale-110 transition-transform">
        <PlusCircle size={40} />
      </div>
      <h3 className="font-black text-xl text-slate-800 tracking-tight">Don't see it?</h3>
      <p className="text-sm text-slate-500 mt-2 font-medium">
        Click here to tell us what you need from the market!
      </p>
      <span className="mt-4 text-xs font-black uppercase text-green-600 tracking-widest">Request Custom Item</span>
    </div>
  );
}

export default function Home() {
  const items = useCart((state) => state.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial App Loader logic
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
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

  // Loading Screen Interface
  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="bg-green-600 p-4 rounded-3xl mb-4 animate-bounce">
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
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-1.5 rounded-lg">
                <ShoppingBag className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter italic">StockUp</h1>
          </div>
          
          <div className="relative p-2 bg-slate-100 rounded-full cursor-pointer" onClick={() => items.length > 0 && setIsModalOpen(true)}>
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
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                LIVE MARKET DELIVERY
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Skip the Market Stress. <br />
                <span className="text-green-600">StockUp Your Room.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                Order Rice, Beans, Yam, and all your raw foodstuffs directly to your hostel. 
                Fresh produce, market-best prices, delivered to your door.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                <div className="flex items-center gap-1.5 font-bold text-slate-700"><CheckCircle className="text-green-500" size={18} /> No Heavy Bags</div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700"><CheckCircle className="text-green-500" size={18} /> Market Rates</div>
                <div className="flex items-center gap-1.5 font-bold text-slate-700"><CheckCircle className="text-green-500" size={18} /> Doorstep Delivery</div>
              </div>
            </div>
            <div className="flex-1 hidden md:block text-right">
              <div className="text-[140px] filter drop-shadow-2xl animate-pulse duration-[3000ms]">🛍️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Banner */}
      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-30">
        <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-[2.5rem] p-6 shadow-xl shadow-green-200 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-white/20 p-3 rounded-2xl"><Share2 className="text-white" size={28} /></div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">Refer a Roommate!</h3>
              <p className="text-green-50 text-sm font-medium">Share StockUp and help a friend skip the market stress.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              const shareMsg = `Omo, have you seen StockUp? 🛍️ You can order rice, beans, and yams from your room and they deliver to the hostel! Check it out here: ${window.location.href}`;
              window.open(`https://wa.me/?text=${shareMsg}`, '_blank');
            }}
            className="bg-white text-green-700 font-black px-8 py-3 rounded-2xl hover:bg-green-50 transition-all shadow-lg active:scale-95 whitespace-nowrap"
          >
            Share on WhatsApp
          </button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6 mt-6">
        {/* Step Guide */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-2xl text-green-700"><ShoppingBag size={20}/></div>
            <div><p className="text-sm font-black text-slate-800 underline decoration-green-200 decoration-4">1. Build List</p><p className="text-xs text-slate-500 mt-1">Add items & quantities.</p></div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-700"><Clock size={20}/></div>
            <div><p className="text-sm font-black text-slate-800 underline decoration-blue-200 decoration-4">2. Get Quote</p><p className="text-xs text-slate-500 mt-1">Prices sent to WhatsApp.</p></div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-2xl text-purple-700"><Truck size={20}/></div>
            <div><p className="text-sm font-black text-slate-800 underline decoration-purple-200 decoration-4">3. Delivery</p><p className="text-xs text-slate-500 mt-1">Straight to your room.</p></div>
          </div>
        </section>

        {/* Search & Filter */}
        <div className="space-y-6 mb-10">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input 
              type="text" 
              placeholder="Search rice, beans, oil..." 
              className="w-full p-5 pl-14 bg-white rounded-[2rem] border-none shadow-md shadow-slate-200/50 focus:ring-2 focus:ring-green-500 outline-none transition-all text-lg font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap font-bold text-sm transition-all border ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:border-green-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid with Permanent Request Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => <ProductCard key={p.id} {...p} />)}
          <RequestCard />
        </div>

        {/* Empty State / Request Feature */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 mt-8">
            <div className="bg-slate-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300"><AlertCircle size={48}/></div>
            <h3 className="text-2xl font-black text-slate-800">Can't find "{searchTerm}"?</h3>
            <p className="text-slate-500 mt-2 mb-8 max-w-xs mx-auto font-medium">We can still source it for you! Just send a request.</p>
            <button 
              onClick={() => {
                const phoneNumber = "2348102816015"; 
                const msg = `Hello StockUp! 👋 I'm looking for *${searchTerm}* but couldn't find it on the site. Can you help me find it?`;
                window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
              }}
              className="bg-green-600 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-green-200 active:scale-95 transition-transform"
            >
              Request "{searchTerm}" on WA
            </button>
          </div>
        )}

        {/* About Section */}
        <section className="mt-24 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="text-green-600" size={32} /></div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">The StockUp Promise</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto leading-relaxed font-medium">We negotiate the best deals for you at the market and deliver straight to your room. No more heavy bags or long bus rides.</p>
        </section>

        {/* FAQ Section */}
        <section className="mt-24 max-w-2xl mx-auto px-2">
          <div className="flex items-center justify-center gap-3 mb-8"><HelpCircle className="text-green-600" /><h2 className="text-2xl font-black text-slate-800">Common Questions</h2></div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center font-bold text-slate-700 transition-all hover:bg-slate-50">
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-green-600"/> : <ChevronDown size={20}/>}
                </button>
                {openFaq === idx && <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4 font-medium italic">"{faq.a}"</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Footer */}
        <footer className="mt-32 bg-white border-t border-slate-100 pt-16 pb-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-600 p-1.5 rounded-lg"><ShoppingBag className="text-white" size={18} /></div>
                  <span className="text-xl font-black text-slate-800">StockUp</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">Making campus life easier by delivering fresh market produce directly to your hostel room.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-slate-500 font-medium font-bold">
                  <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-green-600 transition-colors">Order Foodstuffs</button></li>
                  <li><button onClick={() => setOpenFaq(0)} className="hover:text-green-600 transition-colors">How it Works</button></li>
                  <li><a href="https://wa.me/234XXXXXXXXXX" className="hover:text-green-600 transition-colors">Contact Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Service Area</h4>
                <div className="flex items-start gap-2 text-sm text-slate-500 font-medium">
                  <Truck size={16} className="text-green-600 mt-0.5" />
                  <p>Currently serving all Hostels across the University Campus.</p>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-xs font-medium">© {new Date().getFullYear()} StockUp Store. All rights reserved.</p>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Developed by</span>
                <a href="https://ajetomobi-damilola.vercel.app" target="_blank" className="text-slate-900 hover:text-green-600 transition-colors underline">Ajetomobi Damilola</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Checkout Button */}
      {items.length > 0 && (
        <div className="fixed bottom-8 left-0 right-0 px-6 z-50">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full max-w-md mx-auto bg-green-600 text-white p-1 rounded-[2.5rem] shadow-2xl flex items-center justify-between transition-all active:scale-95 group border-4 border-white"
          >
            <div className="pl-6 py-4 flex flex-col items-start text-left">
              <span className="text-[10px] uppercase font-black text-green-100 tracking-[0.15em] mb-1">{items.length} items selected</span>
              <span className="font-bold text-xl tracking-tight text-white italic">View Market List</span>
            </div>
            <div className="bg-white m-1 p-5 rounded-[2rem] text-green-600 group-hover:bg-slate-50 transition-colors shadow-inner font-bold"><Truck size={28} /></div>
          </button>
        </div>
      )}

      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}