import React, { useState } from 'react';
import { SIGNATURE_DISPLAYS } from '../data/displaysData';
import { PortfolioDisplay } from '../types';
import { Sparkles, MapPin, Timer, Layers, ShieldCheck } from 'lucide-react';

interface ShowcaseGalleryProps {
  isLightMode: boolean;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ isLightMode }) => {
  const [selectedDisplay, setSelectedDisplay] = useState<PortfolioDisplay>(SIGNATURE_DISPLAYS[0]);

  return (
    <section id="portfolio" className={`py-24 border-t transition-colors duration-300 relative ${
      isLightMode ? 'bg-[#faf8f5] border-amber-200/80' : 'bg-[#050608] border-stone-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold mb-3 ${
            isLightMode ? 'text-amber-800' : 'text-amber-400'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Masterwork Portfolio</span>
            <span aria-hidden="true" className={isLightMode ? 'text-stone-400' : 'text-stone-600'}>&middot;</span>
            <span>Grand Indian Venues</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-tight ${
            isLightMode ? 'text-stone-900' : 'text-stone-100'
          }`}>
            Celebrations on a Royal Scale
          </h2>
          <p className={`mt-4 text-base sm:text-lg font-normal leading-relaxed ${
            isLightMode ? 'text-stone-600' : 'text-stone-400 font-light'
          }`}>
            From palace lakefronts in Udaipur to majestic fortress lawns in Jodhpur, luxury farmhouses in Delhi NCR, Mumbai, Indore, etc.
          </p>
        </div>

        {/* Featured Big Showcase Banner */}
        <div className={`relative rounded-3xl overflow-hidden border shadow-xl mb-12 ${
          isLightMode ? 'border-amber-200/90 bg-white' : 'border-amber-500/30 bg-stone-900/60'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Visual Image */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full overflow-hidden">
              <img
                src={selectedDisplay.image}
                alt={selectedDisplay.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';
                }}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-amber-400/40 text-xs font-cinzel text-amber-300 font-semibold">
                {selectedDisplay.category}
              </div>
            </div>

            {/* Description & Technical Metrics */}
            <div className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
              isLightMode ? 'bg-white' : 'bg-[#0c0d12]/90 backdrop-blur-md'
            }`}>
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedDisplay.location}</span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-cinzel font-bold leading-tight ${
                  isLightMode ? 'text-stone-900' : 'text-stone-100'
                }`}>
                  {selectedDisplay.title}
                </h3>
                <p className={`text-xs italic mt-1 font-serif ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  {selectedDisplay.subtitle}
                </p>

                <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                  isLightMode ? 'text-stone-600' : 'text-stone-300'
                }`}>
                  {selectedDisplay.description}
                </p>

                {/* Technical Specs Grid */}
                <div className={`grid grid-cols-2 gap-3 mt-6 pt-6 border-t ${
                  isLightMode ? 'border-amber-100' : 'border-stone-800'
                }`}>
                  <div className={`p-3.5 rounded-xl border ${
                    isLightMode ? 'bg-[#faf8f5] border-amber-200/60' : 'bg-stone-950/60 border-stone-800/80'
                  }`}>
                    <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>Shells Fired</span>
                    </div>
                    <div className={`text-base font-cinzel font-bold mt-1 ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                      {selectedDisplay.shellsFired.toLocaleString()}
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${
                    isLightMode ? 'bg-[#faf8f5] border-amber-200/60' : 'bg-stone-950/60 border-stone-800/80'
                  }`}>
                    <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                      <Timer className="w-3.5 h-3.5 text-amber-600" />
                      <span>Show Duration</span>
                    </div>
                    <div className={`text-base font-cinzel font-bold mt-1 ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                      {selectedDisplay.duration}
                    </div>
                  </div>

                  <div className={`col-span-2 p-3.5 rounded-xl border ${
                    isLightMode ? 'bg-[#faf8f5] border-amber-200/60' : 'bg-stone-950/60 border-stone-800/80'
                  }`}>
                    <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Firing Architecture</span>
                    </div>
                    <div className={`text-xs font-mono font-medium mt-1 ${isLightMode ? 'text-stone-800' : 'text-stone-200'}`}>
                      {selectedDisplay.firingTech}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags & Action */}
              <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                isLightMode ? 'border-amber-100' : 'border-stone-800/80'
              }`}>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDisplay.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${
                      isLightMode ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#enquiry"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold transition-all shadow-sm"
                >
                  Commission Similar
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Selector Thumbnails Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {SIGNATURE_DISPLAYS.map((disp) => {
            const isSelected = selectedDisplay.id === disp.id;
            return (
              <button
                key={disp.id}
                onClick={() => setSelectedDisplay(disp)}
                className={`group relative rounded-2xl overflow-hidden border p-1 text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/40'
                    : isLightMode
                    ? 'border-stone-200 bg-white hover:border-amber-300'
                    : 'border-stone-800 bg-stone-900/40 hover:border-stone-700'
                }`}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-950 relative">
                  <img
                    src={disp.image}
                    alt={disp.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1.5 left-2 right-2 text-[11px] font-cinzel font-bold text-stone-100 truncate">
                    {disp.location.split(',')[0]}
                  </span>
                </div>
                <div className="mt-2 px-1 pb-1">
                  <p className={`text-[11px] font-bold truncate ${isLightMode ? 'text-stone-800' : 'text-stone-300'}`}>{disp.title}</p>
                  <p className="text-[10px] text-amber-700 font-mono mt-0.5">{disp.duration}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
