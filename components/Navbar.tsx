
import React from 'react';
import { useStore } from '../store/useStore';

export const Navbar: React.FC = () => {
  const { user } = useStore();

  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-slate-800 hidden md:block">
          {user?.brand?.companyName || 'Welcome'}
        </h2>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Credits:</span>
          <div className="flex space-x-3">
            <span className="text-sm font-bold text-indigo-600">🖼️ {user?.credits.images}</span>
            <span className="text-sm font-bold text-rose-600">🎥 {user?.credits.videos}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 border-l pl-6 border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900 leading-none">{user?.name}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase">{user?.role}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-indigo-200">
            {user?.name.charAt(0)}
          </div>
        </div>
      </div>
    </nav>
  );
};
