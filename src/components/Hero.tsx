import React, { useState } from 'react';
import { FireworksCanvas } from './FireworksCanvas';
import { Sparkles, Flame, Youtube, ArrowDown, Zap } from 'lucide-react';
import { YOUTUBE_CHANNEL_INFO } from '../data/videosData';

interface HeroProps {
  isLightMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLightMode }) => {
  const [sparkleCount, setSparkleCount] = useState<number>(0);

  // Animated decorative firework bursts on screen
  const floatingSparks = [
    { top: '15%', left: '8%', delay: '0s', color: '#f59e0b', size: 'w-6 h-6' },
    { top: '22%', right: '12%', delay: '1.2s', color: '#ef4444', size: 'w-8 h-8' },
    { top: '65%', left: '14%', delay: '2s', color: '#06b6d4', size: 'w-7 h-7' },
    { top: '70%', right: '16%', delay: '0.6s', color: '#d97706', size: 'w-9 h-9' },
    { top: '35%', right: '6%', delay: '1.8s', color: '#8b5cf6', size: 'w-6 h-6' },
  ];

  return (
    <section className={`relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden transition-colors duration-300 ${
      isLightMode ? 'bg-[#faf8f5]' : 'bg-[#060709]'
    }`}>
      {/* Background Live Pyrotechnics Ambient Canvas */}
      <div className="absolute inset-0 z-0">
        <FireworksCanvas
          ambientMode={true}
          interactive={true}
          isLightMode={isLightMode}
          className={`w-full h-full ${isLightMode ? 'opacity-70' : 'opacity-65'}`}
        />
      </div>

      {/* Atmospheric Overlays */}
      <div className={`absolute inset-0 pointer-events-none z-1 ${
        isLightMode
          ? 'bg-gradient-to-b from-[#faf8f5]/60 via-transparent to-[#faf8f5]'
          : 'bg-gradient-to-b from-stone-950/60 via-transparent to-[#060709]'
      }`} />
      <div className={`absolute inset-0 pointer-events-none z-1 ${
        isLightMode
          ? 'bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(250,248,245,0.85)_95%)]'
          : 'bg-[radial-gradient(ellipse_at_center,transparent_30%,#060709_90%)]'
      }`} />

      {/* Floating Animated Fireworks Sprinkles */}
      <div className="absolute inset-0 pointer-events-none z-2 overflow-hidden">
        {floatingSparks.map((spark, i) => (
          <div
            key={i}
            className="absolute animate-spark-float flex items-center justify-center"
            style={{
              top: spark.top,
              left: spark.left,
              right: spark.right,
              animationDelay: spark.delay,
            }}
          >
            <div
              className={`${spark.size} rounded-full blur-[1px] opacity-75`}
              style={{
                background: `radial-gradient(circle, ${spark.color} 20%, transparent 70%)`,
                boxShadow: `0 0 16px ${spark.color}`,
              }}
            />
            <Sparkles
              className="w-3.5 h-3.5 absolute text-amber-500 animate-spin"
              style={{ animationDuration: '6s' }}
            />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-6">
        {/* Prestige Kicker */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs uppercase tracking-[0.22em] font-semibold mb-8 shadow-sm ${
          isLightMode
            ? 'bg-white/90 border-amber-300 text-amber-800 shadow-amber-500/10'
            : 'bg-stone-900/80 border-amber-500/30 text-amber-300 shadow-amber-950/20'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Cinematic Pyrotechnics &middot; Royal Wedding SFX &middot; India</span>
        </div>

        {/* Grand Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-black tracking-tight leading-[1.08] max-w-5xl mx-auto">
          <span className={isLightMode ? 'text-stone-900' : 'text-stone-100'}>
            THE SKY IS OUR CANVAS.
          </span>
          <br />
          <span className={isLightMode ? 'text-gold-gradient font-black drop-shadow-sm' : 'text-gold-gradient drop-shadow-lg'}>
            CELEBRATION IS OUR CRAFT.
          </span>
        </h1>

        {/* Narrative Description */}
        <p className={`mt-6 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-normal leading-relaxed ${
          isLightMode ? 'text-stone-700' : 'text-stone-300'
        }`}>
          Crafted by <strong className="text-amber-700 font-semibold">Jatin Rathore</strong> and the <strong>Salvo FX</strong> pyrotechnic team. Specializing in high-end wedding SFX setups, lakefront palace pyro-symphonies, and breathtaking festival night skies.
        </p>

        {/* Interactive Sky Click Prompt */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 ${
            isLightMode ? 'bg-amber-100/90 text-amber-900 border border-amber-200' : 'bg-stone-900/80 text-amber-300 border border-stone-800'
          }`}>
            <Zap className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
            <span>Click anywhere on the sky to fire animated fireworks &middot; Sounds on in navbar</span>
          </span>
        </div>

        {/* CTA Button Array */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#enquiry"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>Request Proposal &bull; Commission Display</span>
          </a>

          <a
            href="#simulator"
            className={`w-full sm:w-auto px-8 py-4 rounded-xl border text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
              isLightMode
                ? 'bg-white hover:bg-amber-50 text-stone-900 border-amber-300 shadow-sm hover:border-amber-400'
                : 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border-stone-700/80'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Preview Wedding Fireworks</span>
          </a>

          <a
            href="#portfolio"
            className={`w-full sm:w-auto px-7 py-4 rounded-xl border text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 ${
              isLightMode
                ? 'bg-amber-50/80 hover:bg-amber-100 text-amber-900 border-amber-300/80'
                : 'bg-stone-900/60 hover:bg-stone-800/80 text-stone-300 border-stone-800'
            }`}
          >
            <span>View Grand Displays</span>
          </a>
        </div>

        {/* Quick Trust Badges Strip */}
        <div className={`mt-14 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6 text-left ${
          isLightMode ? 'border-amber-200/80' : 'border-stone-800/80'
        }`}>
          <div className={`p-4 rounded-xl transition-all ${isLightMode ? 'bg-white/80 border border-amber-100 shadow-sm' : 'bg-stone-900/40 border border-stone-800'}`}>
            <div className={`font-cinzel text-xl sm:text-2xl font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
              Pan-India
            </div>
            <div className={`text-xs mt-0.5 ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
              Jaipur, Udaipur, Delhi, Mumbai, etc.
            </div>
          </div>
          <div className={`p-4 rounded-xl transition-all ${isLightMode ? 'bg-white/80 border border-amber-100 shadow-sm' : 'bg-stone-900/40 border border-stone-800'}`}>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-700">
              Wedding SFX
            </div>
            <div className={`text-xs mt-0.5 ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
              Sparkulars, Fog & Cold Pyro
            </div>
          </div>
          <div className={`p-4 rounded-xl transition-all ${isLightMode ? 'bg-white/80 border border-amber-100 shadow-sm' : 'bg-stone-900/40 border border-stone-800'}`}>
            <div className={`font-cinzel text-xl sm:text-2xl font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
              0.01ms Sync
            </div>
            <div className={`text-xs mt-0.5 ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
              Computerized Musical Timing
            </div>
          </div>
          <div className={`p-4 rounded-xl transition-all ${isLightMode ? 'bg-white/80 border border-amber-100 shadow-sm' : 'bg-stone-900/40 border border-stone-800'}`}>
            <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-700">
              100% PESO Green
            </div>
            <div className={`text-xs mt-0.5 ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
              CSIR-NEERI Low-Smoke Safe
            </div>
          </div>
        </div>

        {/* Gentle scroll indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#simulator"
            className={`p-2 rounded-full transition-colors animate-bounce ${
              isLightMode ? 'text-stone-500 hover:text-amber-600' : 'text-stone-400 hover:text-amber-400'
            }`}
            aria-label="Scroll down"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
