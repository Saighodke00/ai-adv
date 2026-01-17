
import React from 'react';
import { Search, SlidersHorizontal, Tag, Download, UserCheck } from 'lucide-react';

export const Marketplace: React.FC = () => {
  const mockMarketItems = [
    { id: 'm1', title: 'Premium Diwali 4K Motion', creator: 'VisualArts', price: 499, thumbnail: 'https://picsum.photos/seed/m1/400/500', type: 'video' },
    { id: 'm2', title: 'Traditional Holi Poster Set', creator: 'DesiDesigns', price: 199, thumbnail: 'https://picsum.photos/seed/m2/400/500', type: 'image' },
    { id: 'm3', title: 'Eid Greetings Bundle', creator: 'CraftyMinds', price: 299, thumbnail: 'https://picsum.photos/seed/m3/400/500', type: 'image' },
    { id: 'm4', title: 'Republic Day Animated Overlay', creator: 'ProEditor', price: 349, thumbnail: 'https://picsum.photos/seed/m4/400/500', type: 'video' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-brand">Creative Marketplace</h1>
          <p className="text-slate-500 mt-2">Exclusive templates from independent creators.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
          Sell Your Assets
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm" placeholder="Search premium templates..." />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm font-semibold text-slate-700 hover:bg-slate-50">
          <SlidersHorizontal className="h-5 w-5" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockMarketItems.map(item => (
          <div key={item.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col cursor-pointer">
            <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
              <img src={item.thumbnail} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" alt={item.title} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg flex items-center gap-1.5">
                <Tag className="h-3 w-3 text-indigo-600" />
                <span className="text-[10px] font-bold text-slate-900 uppercase">Premium</span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
              <div className="flex items-center mt-2 mb-4 gap-2">
                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                  UC
                </div>
                <span className="text-xs text-slate-500 font-medium">by {item.creator}</span>
              </div>
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xl font-black text-slate-900">INR {item.price}</span>
                <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
