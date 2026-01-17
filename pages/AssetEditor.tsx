
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ChevronLeft, Download, Languages, Music, Type, Wand2, Loader2, Volume2, CheckCircle } from 'lucide-react';
import { geminiService } from '../lib/gemini';
import { BrandingEngine } from '../lib/brandingEngine';

export const AssetEditor: React.FC = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { assets, user } = useStore();
  
  const asset = assets.find(a => a.id === assetId);
  const [activeText, setActiveText] = useState("Wishing you a blessed celebration!");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [placement, setPlacement] = useState(BrandingEngine.getPlacement('16:9'));

  if (!asset) return <div className="p-20 text-center font-bold">Asset not found.</div>;

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const copy = await geminiService.generateOccasionCopy(asset.occasion, 'hi', new Date().getFullYear());
      setActiveText(copy);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    setIsDone(false);
    // Real-world: This would trigger the FFmpeg/Sharp backend worker
    await BrandingEngine.applyBranding(asset.url, user?.brand?.logoUrl || '', user?.brand?.companyName || '');
    setIsProcessing(false);
    setIsDone(true);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 shrink-0 border-b border-white/10 flex items-center justify-between px-6 bg-slate-950 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft /></button>
          <div>
            <h1 className="font-bold">{asset.title}</h1>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">{asset.type} • {asset.occasion}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isDone ? (
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Download Ready</button>
          ) : (
            <button 
              disabled={isProcessing}
              onClick={handleDownload}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/20 disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Branded Export
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 relative bg-black flex items-center justify-center p-12">
          <div className="relative shadow-2xl rounded-lg overflow-hidden max-h-full">
            {asset.type === 'video' ? (
              <video src={asset.url} autoPlay loop muted className="max-h-[75vh] w-auto" />
            ) : (
              <img src={asset.url} className="max-h-[75vh] w-auto" />
            )}
            
            {/* Branding Overlay */}
            <div 
              className="absolute z-10 p-4 pointer-events-none transition-all duration-500"
              style={BrandingEngine.getStyles(placement)}
            >
              <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3 shadow-2xl border border-white/20">
                {user?.brand?.logoUrl ? (
                  <img src={user.brand.logoUrl} className="h-8 w-8 object-contain" />
                ) : (
                  <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">{user?.brand?.companyName.charAt(0)}</div>
                )}
                <div>
                  <p className="text-slate-900 font-bold text-[11px] leading-tight">{user?.brand?.companyName}</p>
                  <p className="text-slate-400 text-[8px] font-black uppercase tracking-widest leading-none mt-0.5">EST. {new Date().getFullYear()}</p>
                </div>
              </div>
            </div>

            {/* Editable Text */}
            <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
              <h2 className="text-white text-5xl font-black text-center drop-shadow-2xl font-hindi leading-tight">
                {activeText}
              </h2>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-80 border-l border-white/10 bg-slate-900 p-8 space-y-10 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 flex items-center gap-2"><Type className="h-3 w-3" /> Content Editor</h3>
            <textarea 
              className="w-full bg-slate-800 border border-white/10 rounded-2xl p-4 text-sm h-32 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={activeText}
              onChange={e => setActiveText(e.target.value)}
            />
            <button 
              onClick={handleTranslate}
              disabled={isTranslating}
              className="w-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 hover:bg-indigo-500/20 transition-all"
            >
              {isTranslating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Languages className="h-3 w-3" />}
              AI Hindi Translation
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 flex items-center gap-2"><Wand2 className="h-3 w-3" /> Brand Placement</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setPlacement(BrandingEngine.getPlacement('16:9'))} className="p-3 bg-slate-800 rounded-xl text-[10px] font-bold border border-white/5 hover:border-indigo-500">Standard</button>
              <button onClick={() => setPlacement(BrandingEngine.getPlacement('16:9', true))} className="p-3 bg-slate-800 rounded-xl text-[10px] font-bold border border-white/5 hover:border-indigo-500">Safe Zone</button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/30 flex items-center gap-2"><Music className="h-3 w-3" /> Audio Mix</h3>
            <button className="w-full bg-slate-800 p-4 rounded-2xl flex items-center gap-3 hover:bg-slate-700 text-sm font-medium">
              <Volume2 className="text-indigo-400" /> Occasion Voiceover (TTS)
            </button>
          </div>

          {isProcessing && (
            <div className="p-6 bg-indigo-600 rounded-2xl space-y-3 animate-pulse">
              <p className="text-xs font-black uppercase tracking-widest">Processing...</p>
              <p className="text-sm">Merging branding layers with Sharp/FFmpeg engine.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
