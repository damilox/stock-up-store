'use client'
import { useState } from 'react';
import { useCart } from '@/store/useCart';
import { X, MapPin, Send } from 'lucide-react';

export default function OrderModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  
  // Updated state to include City and Campus logic
  const [details, setDetails] = useState({ 
    name: '', 
    city: 'Ilorin', 
    ekitiCampus: 'Oye Ekiti', 
    hostel: '',
    extra: '' 
  });
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleFinalSubmit = () => {
    if (!details.name || !details.hostel) return alert("Please fill in your delivery details");

    setIsSending(true);
    const phoneNumber = "2348102816015"; 

    // Determine the location string based on user choice
    const finalLocation = details.city === 'Ekiti' 
      ? `Ekiti (${details.ekitiCampus} Campus)` 
      : 'Ilorin';

    const header = `*NEW ORDER - STOCKUP Store*%0A%0A`;
    const customerInfo = `*Name:* ${details.name}%0A*Location:* ${finalLocation}%0A*Address:* ${details.hostel}%0A%0A`;
    const itemsTitle = `*Items:*%0A`;
    const itemsList = items.map(item => `- ${item.name}: ${item.quantity}`).join('%0A');
    const extraInfo = details.extra ? `%0A%0A*Additional Request:*%0A${details.extra}` : '';
    
    // Simulate a brief loading state before redirecting
    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${header}${customerInfo}${itemsTitle}${itemsList}${extraInfo}`, '_blank');
      setIsSending(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 shadow-2xl overflow-y-auto max-h-[90vh] animate-in slide-in-from-bottom duration-300">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Review List</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
            <X size={20}/>
          </button>
        </div>

        {/* List of items */}
        <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-800">{item.name}</p>
                <p className="text-xs font-black text-green-600 uppercase tracking-widest">{item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-400 text-[10px] font-black uppercase hover:text-red-600">Remove</button>
            </div>
          ))}
        </div>

        {/* Delivery Details Form */}
        <div className="space-y-4 border-t border-slate-100 pt-6">
          <input 
            placeholder="Your Full Name" 
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 border-2 border-transparent transition-all"
            onChange={(e) => setDetails({...details, name: e.target.value})}
          />

          {/* Location Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
              <MapPin size={12} /> Delivery City
            </label>
            <div className="flex gap-2">
              {['Ilorin', 'Ekiti'].map((city) => (
                <button
                  key={city}
                  onClick={() => setDetails({...details, city: city})}
                  className={`flex-1 py-3 rounded-xl text-sm font-black transition-all border-2 ${
                    details.city === city 
                    ? 'border-green-600 bg-green-50 text-green-700 shadow-sm' 
                    : 'border-slate-100 bg-white text-slate-400'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Campus Selection (Only shows if Ekiti is picked) */}
          {details.city === 'Ekiti' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-black text-green-600 uppercase tracking-widest ml-1">Select Ekiti Campus</label>
              <div className="flex gap-2">
                {['Oye Ekiti', 'Ikole'].map((campus) => (
                  <button
                    key={campus}
                    onClick={() => setDetails({...details, ekitiCampus: campus})}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                      details.ekitiCampus === campus 
                      ? 'bg-slate-800 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {campus}
                  </button>
                ))}
              </div>
            </div>
          )}

          <input 
            placeholder="Hostel & Room Number" 
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 border-2 border-transparent transition-all"
            onChange={(e) => setDetails({...details, hostel: e.target.value})}
          />

          <textarea 
            placeholder="Anything else? (Specific yams, salt, extra items...)" 
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 border-2 border-transparent transition-all h-24 resize-none text-sm"
            onChange={(e) => setDetails({...details, extra: e.target.value})}
          />
        </div>

        <button 
          onClick={handleFinalSubmit}
          disabled={isSending || items.length === 0}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-green-100 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSending ? (
            <div className="h-6 w-6 border-3 border-white/30 border-t-white animate-spin rounded-full" />
          ) : (
            <>
              <Send size={18} />
              Confirm & Send to WhatsApp
            </>
          )}
        </button>
      </div>
    </div>
  );
}