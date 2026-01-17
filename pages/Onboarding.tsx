
import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { geminiService } from '../lib/gemini';
import { Loader2, Palette, Building2, Upload, Sparkles, CheckCircle2, ChevronRight, X, Info, Type, Image as ImageIcon, MousePointerClick, ChevronDown } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { user, setUser } = useStore();
  const [step, setStep] = useState(1);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Retail',
    address: '',
    contactNumber: '',
    brandColors: ['#4f46e5'],
    fontStyle: 'modern' as 'modern' | 'classic' | 'playful' | 'luxury' | 'minimal',
    personality: 'Professional & Corporate',
    audience: 'Small Businesses',
    tagline: '',
    iconStyle: 'Minimalist Line-art'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<string[]>([]);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);

  const handleGenerateLogos = async () => {
    setIsGenerating(true);
    setGeneratedLogos([]);
    try {
      const tasks = [1, 2, 3].map(() => 
        geminiService.generateLogo({
          companyName: formData.companyName,
          industry: formData.industry,
          audience: formData.audience,
          personality: formData.personality,
          colors: formData.brandColors,
          tagline: formData.tagline,
          iconStyle: formData.iconStyle,
          fontStyle: formData.fontStyle
        })
      );
      
      const results = await Promise.all(tasks);
      const validLogos = results.filter((logo): logo is string => logo !== null);
      setGeneratedLogos(validLogos);
    } catch (e) {
      console.error("Logo generation failed:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = () => {
    if (!user) return;
    setUser({
      ...user,
      brand: {
        companyName: formData.companyName,
        industry: formData.industry,
        brandColors: formData.brandColors,
        fontStyle: formData.fontStyle,
        logoUrl: selectedLogo || undefined,
        tagline: formData.tagline || undefined,
        contactNumber: formData.contactNumber || undefined,
        personality: formData.personality,
        targetAudience: formData.audience
      }
    });
  };

  const personalities = [
    'Professional & Corporate', 'Playful & Energetic', 'Luxury & Elegant', 
    'Minimal & Modern', 'Vintage & Traditional', 'Organic & Natural', 
    'Bold & Disruptive', 'High-Tech & Futuristic', 'Friendly & Approachable', 
    'Sustainable & Earth-Friendly', 'Fast-Paced & Tech-Forward', 'Community-Driven & Warm', 
    'Artistic & Creative', 'Reliable & Established', 'Whimsical & Magical', 
    'Industrial & Rugged', 'Ethereal & Zen', 'Scholarly & Academic', 'Sporty & High-Performance'
  ];

  const iconStyles = [
    'Abstract Geometry', 'Letter-based (Wordmark)', 'Pictorial (Object-based)', 
    'Minimalist Line-art', 'Mascot / Character', 'Badge / Emblem', 
    'Monogram', 'Gradient Modern', 'Hand-drawn / Organic', 
    'Negative Space', 'Duo-tone Minimalist', 'Isometric 3D (Vector)', 
    'Brutalist', 'Geometric Animals', 'Pixel Art / Retro', 
    'Art Nouveau / Decorative', 'Bauhaus / Functionalist', 'Stained Glass Style', 'Origami / Paper-fold'
  ];

  const fontStyles = ['modern', 'classic', 'playful', 'luxury', 'minimal'];

  return (
    <div className="max-w-6xl mx-auto p-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4 font-brand tracking-tight">Set Up Your Brand Identity</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Tell us about your business. We'll use these details to automatically brand all your festival and promotional content.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden relative">
        <div className="flex bg-slate-50/50 border-b border-slate-100">
          <div className={`flex-1 p-6 text-center text-sm font-bold flex items-center justify-center gap-2 ${step === 1 ? 'text-indigo-600 bg-white border-b-2 border-indigo-600' : 'text-slate-400'}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
            Business Essentials
          </div>
          <div className={`flex-1 p-6 text-center text-sm font-bold flex items-center justify-center gap-2 ${step === 2 ? 'text-indigo-600 bg-white border-b-2 border-indigo-600' : 'text-slate-400'}`}>
            <span className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
            Visual Identity
          </div>
        </div>

        <div className="p-10 lg:p-14">
          {step === 1 ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Business Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-900 font-medium" 
                      placeholder="e.g. Blue Ribbon Cafe"
                      value={formData.companyName}
                      onChange={e => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Industry Sector</label>
                  <select 
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer"
                    value={formData.industry}
                    onChange={e => setFormData({...formData, industry: e.target.value})}
                  >
                    <option>Retail & Shopping</option>
                    <option>Technology & Software</option>
                    <option>Food, Beverage & Cafe</option>
                    <option>Healthcare & Wellness</option>
                    <option>Education & Learning</option>
                    <option>Real Estate & Property</option>
                    <option>Fashion & Apparel</option>
                    <option>Automotive & Services</option>
                    <option>Hospitality & Travel</option>
                    <option>Finance & Legal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Contact Details</label>
                  <input 
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-900 font-medium" 
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.contactNumber}
                    onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Target Audience</label>
                  <input 
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-900 font-medium" 
                    placeholder="e.g. Tech Savvy Students"
                    value={formData.audience}
                    onChange={e => setFormData({...formData, audience: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Brand Typography Style</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <select 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-900 font-medium appearance-none cursor-pointer capitalize shadow-sm"
                      value={formData.fontStyle}
                      onChange={e => setFormData({...formData, fontStyle: e.target.value as any})}
                    >
                      {fontStyles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 px-1 font-medium">This choice determines the stylistic direction of your AI-generated logos and branded text overlays.</p>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!formData.companyName}
                className="w-full mt-10 bg-indigo-600 text-white py-5 px-6 rounded-2xl font-black text-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group"
              >
                Next Step: Brand Visuals <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-10">
                  {/* Brand Color Section */}
                  <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Brand Signature Color</label>
                    <div className="flex flex-wrap gap-4">
                      {['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#1e293b', '#ffffff'].map(color => (
                        <button 
                          key={color}
                          onClick={() => setFormData({...formData, brandColors: [color]})}
                          className={`h-12 w-12 rounded-full border-4 transition-all shadow-sm ${formData.brandColors[0] === color ? 'border-indigo-600 scale-125 shadow-xl ring-4 ring-indigo-50' : 'border-white hover:scale-110'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Choice Section: Upload vs Generate */}
                  <div className="space-y-6">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Company Logo Selection</label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Upload Option */}
                      <div className="relative group">
                        <input 
                          type="file" 
                          className="hidden" 
                          ref={fileInputRef} 
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-full flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                        >
                          <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
                            <Upload className="h-6 w-6" />
                          </div>
                          <p className="font-bold text-slate-900 mb-1">Upload My Logo</p>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">SVG, PNG, JPG</p>
                        </button>
                      </div>

                      {/* AI Generate Option */}
                      <button 
                        onClick={() => setIsWizardOpen(true)}
                        className="w-full flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-indigo-100 bg-indigo-50/20 hover:bg-indigo-50 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
                      >
                        <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-indigo-100 text-indigo-600 group-hover:scale-110 transition-all">
                          <Sparkles className="h-6 w-6" />
                        </div>
                        <p className="font-bold text-indigo-900 mb-1">AI Logo Architect</p>
                        <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest">No logo? Create one</p>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Preview Sidebar */}
                <div className="lg:col-span-5">
                   <div className="sticky top-10 space-y-6">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative group">
                      <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                        <ImageIcon className="h-40 w-40" />
                      </div>
                      
                      <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 mb-6 shadow-2xl min-h-[220px] w-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                          {selectedLogo ? (
                            <img src={selectedLogo} alt="Selected Logo" className="max-h-32 max-w-full object-contain drop-shadow-lg" />
                          ) : (
                            <div className="flex flex-col items-center text-white/30">
                              <Palette className="h-12 w-12 mb-4 opacity-50" />
                              <p className="text-xs font-bold uppercase tracking-widest">Logo Placeholder</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2 w-full">
                          <h4 className="text-2xl font-black font-brand tracking-tight">{formData.companyName || 'Your Business Name'}</h4>
                          <div className="flex items-center justify-center gap-2">
                             <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                             <p className="text-xs text-white/50 uppercase tracking-widest font-bold">{formData.industry}</p>
                             <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                          </div>
                        </div>

                        {selectedLogo && (
                          <button 
                            onClick={() => setSelectedLogo(null)}
                            className="mt-8 flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest hover:text-rose-300 transition-colors"
                          >
                            <X className="h-4 w-4" /> Reset Identity
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-indigo-600 rounded-3xl p-6 text-white flex items-center gap-4 shadow-xl shadow-indigo-500/10">
                      <Info className="h-6 w-6 shrink-0 opacity-50" />
                      <p className="text-xs font-medium leading-relaxed">
                        Pro tip: Use a logo with a transparent background for the best auto-branding results across all festival creatives.
                      </p>
                    </div>
                   </div>
                </div>
              </div>

              <div className="flex gap-4 pt-10 border-t border-slate-100">
                <button 
                  onClick={() => setStep(1)}
                  className="px-8 py-5 rounded-2xl font-black border-2 border-slate-100 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleComplete}
                  className="flex-1 bg-indigo-600 text-white py-5 px-6 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20"
                >
                  Launch AutoBrand Studio <CheckCircle2 className="h-6 w-6" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Logo Wizard */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] flex flex-col max-h-[90vh] overflow-hidden border border-slate-100">
            <div className="px-10 py-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                  <div className="h-10 w-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Sparkles className="text-white h-5 w-5" />
                  </div>
                  AI Logo Architect
                </h2>
                <p className="text-slate-500 font-medium mt-1">Design a unique brand mark in seconds using generative AI.</p>
              </div>
              <button onClick={() => setIsWizardOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              {generatedLogos.length > 0 ? (
                <div className="space-y-10 animate-in zoom-in-95 duration-500">
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Select Your Masterpiece</h3>
                    <p className="text-slate-500 font-medium">Click on the design that best represents {formData.companyName}.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {generatedLogos.map((logo, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setSelectedLogo(logo);
                          setIsWizardOpen(false);
                        }}
                        className="group relative cursor-pointer"
                      >
                        <div className="aspect-square bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-sm hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex items-center justify-center overflow-hidden">
                          <img src={logo} alt={`Logo Option ${idx + 1}`} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-indigo-600 text-white p-3 rounded-2xl shadow-xl">
                            <CheckCircle2 className="h-6 w-6" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center pt-10">
                    <button 
                      onClick={handleGenerateLogos}
                      disabled={isGenerating}
                      className="text-indigo-600 font-black flex items-center gap-3 hover:gap-4 transition-all group"
                    >
                      <span>Not satisfied? Generate more variations</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 animate-in fade-in duration-500">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Brand Personality</label>
                    <select 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
                      value={formData.personality}
                      onChange={e => setFormData({...formData, personality: e.target.value})}
                    >
                      {personalities.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Symbolism Style</label>
                    <select 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
                      value={formData.iconStyle}
                      onChange={e => setFormData({...formData, iconStyle: e.target.value})}
                    >
                      {iconStyles.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Company Tagline</label>
                    <input 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10"
                      placeholder="e.g. Innovating Your Future"
                      value={formData.tagline}
                      onChange={e => setFormData({...formData, tagline: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6">
                    <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                       <Info className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Architect's Insight</p>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">
                        We are fusing your <span className="text-indigo-600 font-bold">{formData.industry}</span> background with <span className="text-indigo-600 font-bold">{formData.brandColors[0]}</span> palette and <span className="text-indigo-600 font-bold uppercase">{formData.fontStyle}</span> typography. 
                        Expect <span className="text-indigo-600 font-bold">{formData.iconStyle}</span> graphics that feel <span className="text-indigo-600 font-bold">{formData.personality.toLowerCase()}</span>.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!generatedLogos.length && (
              <div className="p-12 border-t border-slate-50 bg-slate-50/30">
                <button 
                  onClick={handleGenerateLogos}
                  disabled={isGenerating}
                  className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl hover:bg-black transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-slate-900/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-7 w-7 animate-spin" />
                      Designing Your Identity...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-7 w-7 text-amber-400" />
                      Craft 3 Unique Logo Options
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
