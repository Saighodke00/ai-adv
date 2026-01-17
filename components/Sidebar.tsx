
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Settings, UserCircle, ShieldCheck, PenTool } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useStore();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Marketplace', icon: ShoppingBag, path: '/marketplace' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  if (user?.role === 'ADMIN') {
    menuItems.push({ name: 'Admin Panel', icon: ShieldCheck, path: '/admin' });
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white font-brand flex items-center gap-2">
          <span className="bg-indigo-600 p-1.5 rounded-lg">AS</span>
          <span className="tracking-tight">AutoBrand</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
          <UserCircle className="mr-3 h-5 w-5 text-slate-400" />
          Log Out
        </button>
      </div>
    </aside>
  );
};
