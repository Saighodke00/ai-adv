
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Calendar, Search, Sparkles, Image as ImageIcon, Video, Download, X, Loader2, Wand2, History, AlertCircle, Play, Monitor, Smartphone, Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { geminiService } from '../lib/gemini';
import { BrandingEngine } from '../lib/brandingEngine';

export const Dashboard: React.FC = () => {
  const { assets, user, updateCredits, addToHistory } = useStore();
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');

  // AI Modals
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // Prompts & Configs
  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic');
  const [videoResolution, setVideoResolution] = useState<'720p' | '1080p'>('720p');
  const [videoAspectRatio, setVideoAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  
  // Overrides
  const [showOverrides, setShowOverrides] = useState(false);
  const [overrideIndustry, setOverrideIndustry] = useState(user?.brand?.industry || '');
  const [overridePersonality, setOverridePersonality] = useState(user?.brand?.personality || '');
  const [overrideAudience, setOverrideAudience] = useState(user?.brand?.targetAudience || '');

  // Status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const styles = ["Minimalist", "High-End Luxury", "3D Surrealism", "Corporate Flat", "Cinematic", "Cyberpunk", "Pop Art", "Art Deco"];

  const filteredAssets = assets.filter(a => 
    a.month === activeMonth && (filterType === 'all' || a.type === filterType)
  );

  const handleGenerateAIImage = async () => {
    if (!imagePrompt.trim()) return;
    if ((user?.credits.images || 0) <= 0) {
      setError("Insufficient Image Credits.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationProgress("Synthesizing pixels...");

    try {
      const result = await geminiService.generateAIImage({
        userPrompt: imagePrompt,
        style: selectedStyle,
        brandPersonality: showOverrides ? overridePersonality : user?.brand?.personality,
        brandIndustry: showOverrides ? overrideIndustry : user?.brand?.industry,
        targetAudience: showOverrides ? overrideAudience : user?.brand?.targetAudience,
        brandColors: user?.brand?.brandColors
      });
      
      if (result) {
        setGeneratedImageUrl(result);
        updateCredits('images', -1);
        addToHistory({
          id: Math.random().toString(36).substr(2, 9),
          url: result,
          prompt: imagePrompt,
          timestamp: Date.now(),
          type: 'image'
        });
      }
    } catch (e) {
      setError("AI service unavailable. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAIVideo = async () => {
    if (!videoPrompt.trim()) return;
    if ((user?.credits.videos || 0) <= 0) {
      setError("Insufficient Video Credits.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGenerationProgress("Building video frames...");

    try {
      const result = await geminiService.generateAIVideo({
        prompt: videoPrompt,
        resolution: videoResolution,
        aspectRatio: videoAspectRatio
      });
      
      if (result) {
        setGeneratedVideoUrl(result);
        updateCredits('videos', -1);
        addToHistory({
          id: Math.random().toString(36).substr(2, 9),
          url: result,
          prompt: videoPrompt,
          timestamp: Date.now(),
          type: 'video'
        });
      }
    } catch (e) {
      setError("Video generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const closeModals = () => {
    setIsImageModalOpen(false);
    setIsVideoModalOpen(false);
    setGeneratedImageUrl(null);
    setGeneratedVideoUrl(null);
    setError(null);
    setIsGenerating(false);
  };

  return (
    <div className="p-8 space-y-12">
      {/* Hero */}
      <section className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-4 py-1.5 rounded-full border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase mb-6">
            <Sparkles className="h-3 w-3" /> Branded AI Studio
          </div>
          <h1 className="text-5xl font-black font-brand mb-6 tracking-tight leading-tight">
            Create visuals for <br/><span className="text-indigo-400">{user?.brand?.companyName}</span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setIsImageModalOpen(true)} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-indigo-50 transition-all shadow-xl">
              <Wand2 className="text-indigo-600" /> Generate AI Image
            </button>
            <button onClick={() => setIsVideoModalOpen(true)} className="bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-slate-700 transition-all">
              <Video className="text-rose-400" /> AI Video
            </button>
          </div>
          <p className="mt-8 text-sm text-slate-500 font-bold">
            Credits: Images {user?.credits.images} | Videos {user?.credits.videos}
          </p>
        </div>
      </section>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-8 border-b flex items-center justify-between bg-slate-50">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><ImageIcon /> AI Image Generation</h2>
              <button onClick={closeModals} className="p-2 hover:bg-slate-200 rounded-full"><X /></button>
            </div>
            <div className="p-10 space-y-6">
              {!generatedImageUrl ? (
                <>
                  <textarea 
                    className="w-full px-6 py-5 bg-slate-50 border-2 rounded-3xl font-medium focus:ring-4 focus:ring-indigo-500/10 h-32 outline-none"
                    placeholder="Describe your scene..."
                    value={imagePrompt}
                    onChange={e => setImagePrompt(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    {styles.map(s => (
                      <button key={s} onClick={() => setSelectedStyle(s)} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${selectedStyle === s ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{s}</button>
                    ))}
                  </div>
                  {error && <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</div>}
                  <button 
                    disabled={isGenerating}
                    onClick={handleGenerateAIImage}
                    className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3"
                  >
                    {isGenerating ? <><Loader2 className="animate-spin" /> {generationProgress}</> : <><Wand2 /> Generate Branded Creative</>}
                  </button>
                </>
              ) : (
                <div className="text-center space-y-8">
                  <img src={generatedImageUrl} className="max-h-96 mx-auto rounded-3xl shadow-xl border-4 border-white" />
                  <div className="flex gap-4">
                    <button onClick={() => setGeneratedImageUrl(null)} className="flex-1 py-4 rounded-2xl border-2 font-bold">Try Another</button>
                    <a href={generatedImageUrl} download="ai-brand-image.png" className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"><Download /> Download</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-8 border-b flex items-center justify-between bg-slate-50">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><Video /> AI Video Studio</h2>
              <button onClick={closeModals} className="p-2 hover:bg-slate-200 rounded-full"><X /></button>
            </div>
            <div className="p-10 space-y-6">
              {!generatedVideoUrl ? (
                <>
                  <textarea 
                    className="w-full px-6 py-5 bg-slate-50 border-2 rounded-3xl font-medium focus:ring-4 focus:ring-indigo-500/10 h-32 outline-none"
                    placeholder="Enter video prompt..."
                    value={videoPrompt}
                    onChange={e => setVideoPrompt(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setVideoAspectRatio('16:9')} className={`py-4 rounded-2xl border-2 font-bold flex items-center justify-center gap-2 ${videoAspectRatio === '16:9' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}><Monitor className="h-4 w-4" /> 16:9</button>
                    <button onClick={() => setVideoAspectRatio('9:16')} className={`py-4 rounded-2xl border-2 font-bold flex items-center justify-center gap-2 ${videoAspectRatio === '9:16' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}><Smartphone className="h-4 w-4" /> 9:16</button>
                  </div>
                  {error && <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-2"><AlertCircle className="h-4 w-4" /> {error}</div>}
                  <button 
                    disabled={isGenerating}
                    onClick={handleGenerateAIVideo}
                    className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3"
                  >
                    {isGenerating ? <><Loader2 className="animate-spin" /> {generationProgress}</> : <><Play className="fill-current" /> Create AI Video (1 Credit)</>}
                  </button>
                </>
              ) : (
                <div className="text-center space-y-8">
                  <video src={generatedVideoUrl} controls autoPlay className="max-h-96 mx-auto rounded-3xl shadow-xl" />
                  <div className="flex gap-4">
                    <button onClick={() => setGeneratedVideoUrl(null)} className="flex-1 py-4 rounded-2xl border-2 font-bold">New Prompt</button>
                    <a href={generatedVideoUrl} download="ai-brand-video.mp4" className="flex-1 bg-rose-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"><Download /> Download MP4</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Festival Library */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3"><Calendar className="text-indigo-600" /> Occasion Library</h2>
            <p className="text-slate-500 font-medium">Auto-branded templates for upcoming events.</p>
          </div>
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {(['all', 'image', 'video'] as const).map(t => (
              <button key={t} onClick={() => setFilterType(t)} className={`px-6 py-2 rounded-xl text-sm font-bold capitalize ${filterType === t ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
          {months.map((m, idx) => (
            <button 
              key={m} 
              onClick={() => setActiveMonth(idx)}
              className={`px-8 py-3 rounded-2xl font-black text-sm transition-all border-2 ${activeMonth === idx ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-50'}`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
              <div className="aspect-[3/4] relative bg-slate-50">
                <img src={asset.url} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                  <Link to={`/editor/${asset.id}`} className="w-full bg-white text-slate-900 py-3 rounded-xl font-black text-center shadow-xl">Customize</Link>
                </div>
                {asset.type === 'video' && <div className="absolute top-4 right-4 bg-rose-600 text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">Video</div>}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 line-clamp-1">{asset.title}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{asset.occasion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
