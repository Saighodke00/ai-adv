
import React from 'react';
import { Database, UploadCloud, Users, ShoppingCart, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 font-brand">Admin Control Center</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
            <UploadCloud className="h-5 w-5" /> Sync Dev Data
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Assets Ingested', value: '458', icon: Database, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Market Sales', value: '₹42,000', icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'System Health', value: 'Stable', icon: CheckCircle, color: 'text-slate-600', bg: 'bg-slate-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center">
            <div className={`h-14 w-14 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon className={`h-7 w-7 ${stat.color}`} />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" /> Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-slate-100 rounded-full"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">User_92{i} downloaded Independence Day Asset</p>
                    <p className="text-xs text-slate-400">2 minutes ago</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">SUCCESS</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
            <AlertTriangle className="text-amber-400" /> System Status
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>FFmpeg Workers</span>
                <span className="text-emerald-400 font-bold">12 Active</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full">
                <div className="bg-emerald-400 h-full rounded-full w-[85%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Redis Queue (BullMQ)</span>
                <span className="text-indigo-400 font-bold">Low Latency</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full">
                <div className="bg-indigo-400 h-full rounded-full w-[25%]"></div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/40 leading-relaxed italic">
                Development folder "/dev_data" last synced 4 hours ago. 12 new assets pending approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
