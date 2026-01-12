'use client'
import { useState } from 'react';
import { useCart } from '@/store/useCart';
import { ShoppingBasket, Plus } from 'lucide-react';

interface ProductProps {
  id: string;
  name: string;
  image: string; // Changed from emoji to image URL
}

export default function ProductCard({ id, name, image }: ProductProps) {
  const [qty, setQty] = useState('');
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    if (!qty.trim()) return alert("Please specify how much you want!");
    addItem({ id, name, quantity: qty });
    setQty(''); // Clear input
    alert(`Added ${name} to your list!`);
  };

  return (
    <div className="bg-white group rounded-[2.5rem] p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative h-48 w-full mb-4 overflow-hidden rounded-[2rem] bg-slate-100">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="px-2">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black text-xl text-slate-800 tracking-tight">{name}</h3>
          <div className="bg-green-100 text-green-700 p-1 rounded-lg">
             <Plus size={16} strokeWidth={3} />
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Market Price Today</p>
        
        <div className="mt-5 space-y-3">
          <label className="text-[11px] font-bold text-slate-500 ml-1">Quantity/Amount</label>
          <input 
            type="text" 
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            placeholder="e.g. 2 Paint buckets"
            className="w-full p-4 text-sm bg-slate-50 border-2 border-transparent rounded-2xl focus:border-green-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
          />
          
          <button 
            onClick={handleAdd}
            className="w-full bg-slate-900 hover:bg-green-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-95"
          >
            <ShoppingBasket size={18} />
            Add to Market List
          </button>
        </div>
      </div>
    </div>
  );
}