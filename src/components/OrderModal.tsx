'use client'
import { useState } from 'react';
import { useCart } from '@/store/useCart';
import { X } from 'lucide-react';

export default function OrderModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const [details, setDetails] = useState({ name: '', hostel: '' });

  if (!isOpen) return null;

  const handleFinalSubmit = () => {
    if (!details.name || !details.hostel) return alert("Please fill in your delivery details");

    const phoneNumber = "2348102816015"; 
    const header = `*NEW ORDER - STOCKUP*%0A%0A*Name:* ${details.name}%0A*Hostel:* ${details.hostel}%0A%0A*Items:*%0A`;
    const itemsList = items.map(item => `- ${item.name}: ${item.quantity}`).join('%0A');
    
    window.open(`https://wa.me/${phoneNumber}?text=${header}${itemsList}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Review Market List</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
        </div>

        {/* List of items */}
        <div className="space-y-3 mb-6">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
              <div>
                <p className="font-bold text-slate-800">{item.name}</p>
                <p className="text-sm text-green-600">{item.quantity}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-400 text-xs font-bold uppercase">Remove</button>
            </div>
          ))}
        </div>

        {/* Delivery Details */}
        <div className="space-y-3 border-t pt-4">
          <input 
            placeholder="Your Full Name" 
            className="w-full p-4 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setDetails({...details, name: e.target.value})}
          />
          <input 
            placeholder="Hostel & Room Number (e.g. Mariere Rm 204)" 
            className="w-full p-4 bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setDetails({...details, hostel: e.target.value})}
          />
        </div>

        <button 
          onClick={handleFinalSubmit}
          className="w-full mt-6 bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200"
        >
          Confirm & Send to WhatsApp
        </button>
      </div>
    </div>
  );
}