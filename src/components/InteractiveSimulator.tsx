import React, { useState, useRef } from 'react';
import { PYRO_SHELLS } from '../data/shellsData';
import { PyroShellOption } from '../types';
import { FireworksCanvas } from './FireworksCanvas';
import { soundFx } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, Play, Flame, ShieldCheck, Heart, Music, Sparkle } from 'lucide-react';

interface InteractiveSimulatorProps {
  isLightMode: boolean;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({ isLightMode }) => {
  const [selectedShell, setSelectedShell] = useState<PyroShellOption>(PYRO_SHELLS[0]);
  const [burstCount, setBurstCount] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());
  const [customColor, setCustomColor] = useState<string>(PYRO_SHELLS[0].color);
  const [isAutoShowRunning, setIsAutoShowRunning] = useState<boolean>(false);
  const [selectedMoment, setSelectedMoment] = useState<string>('varmala');
  const autoShowIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Wedding event moments that clients instantly understand
  const weddingMoments = [
    {
      id: 'varmala',
      title: '🌸 Varmala Garland Exchange',
      subtitle: 'Golden Kamuro Willow Sky Canopy',
      shellIndex: 0, // Nishiki Kamuro Willow
      desc: 'The exact moment bride and groom put garlands on each other. A glorious shower of draping 24K gold trails across the sky.',
    },
    {
      id: 'bridal-walk',
      title: '👰 Bridal & Groom Entry Walk',
      subtitle: 'Safe Cold Spark Fountains (Sparkulars)',
      shellIndex: 5, // Cold Sparkular
      desc: 'Zero-heat, smoke-free cold sparks lining both sides of the aisle as the bride walks into the mandap.',
    },
    {
      id: 'sangeet',
      title: '💃 Sangeet Stage Climax',
      subtitle: 'High-Energy Crackle & Stage SFX',
      shellIndex: 4, // Brocade Crackling
      desc: 'High-energy burst for the main dance drop, family performances, and DJ sangeet finale.',
    },
    {
      id: 'palace-finale',
      title: '🏰 Grand Royal Finale',
      subtitle: 'Swarna Jal-Prapaata (Golden Waterfall)',
      shellIndex: 3, // Golden Waterfall
      desc: 'A massive sky-filling golden waterfall over the palace lawn or lake to end the wedding night in awe.',
    },
  ];

  const handleSelectMoment = (moment: typeof weddingMoments[0]) => {
    setSelectedMoment(moment.id);
    const shell = PYRO_SHELLS[moment.shellIndex];
    if (shell) {
      setSelectedShell(shell);
      setCustomColor(shell.color);
    }
  };

  const toggleSound = () => {
    const nextMute = soundFx.toggleMute();
    setIsMuted(nextMute);
  };

  const handleShellSelect = (shell: PyroShellOption) => {
    setSelectedShell(shell);
    setCustomColor(shell.color);
  };

  const handleExplosion = () => {
    setBurstCount((prev) => prev + 1);
  };

  const startGrandFinaleSequence = () => {
    if (isAutoShowRunning) {
      if (autoShowIntervalRef.current) clearInterval(autoShowIntervalRef.current);
      setIsAutoShowRunning(false);
      return;
    }

    setIsAutoShowRunning(true);
    let count = 0;
    autoShowIntervalRef.current = setInterval(() => {
      count++;
      setBurstCount((prev) => prev + 1);
      if (count > 25) {
        if (autoShowIntervalRef.current) clearInterval(autoShowIntervalRef.current);
        setIsAutoShowRunning(false);
      }
    }, 400);
  };

  return (
    <section id="simulator" className={`relative py-24 border-y transition-colors duration-300 overflow-hidden ${
      isLightMode
        ? 'bg-[#faf8f5] border-amber-200/80'
        : 'bg-[#06070a] border-stone-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Simple & Clear Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className={`flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-bold mb-3 ${
            isLightMode ? 'text-amber-800' : 'text-amber-400'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Wedding Preview</span>
            <span aria-hidden="true" className={isLightMode ? 'text-stone-400' : 'text-stone-600'}>&middot;</span>
            <span>See How Your Fireworks Will Look</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-tight ${
            isLightMode ? 'text-stone-900' : 'text-stone-100'
          }`}>
            Preview Your Wedding Fireworks
          </h2>
          
          <p className={`mt-3 text-base sm:text-lg font-normal leading-relaxed ${
            isLightMode ? 'text-stone-600' : 'text-stone-400 font-light'
          }`}>
            Want to see how your <strong>Varmala</strong> garland exchange, <strong>Bridal Entry</strong>, or <strong>Sangeet</strong> fireworks will look in the night sky before booking? Click the wedding moments below to watch a live preview!
          </p>
        </div>

        {/* 1-Click Wedding Moments Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {weddingMoments.map((moment) => {
            const isSelected = selectedMoment === moment.id;
            return (
              <button
                key={moment.id}
                onClick={() => handleSelectMoment(moment)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? isLightMode
                      ? 'bg-amber-100/80 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                      : 'bg-amber-500/20 border-amber-400 text-stone-100 ring-2 ring-amber-400/30'
                    : isLightMode
                    ? 'bg-white border-stone-200 hover:border-amber-300 text-stone-700'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className={`text-xs font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                  {moment.title}
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mt-1">
                  {moment.subtitle}
                </div>
                <div className={`text-[10px] mt-1.5 line-clamp-2 leading-relaxed ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  {moment.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Simulation Viewport (Canvas) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className={`relative w-full h-[470px] sm:h-[530px] rounded-2xl overflow-hidden border shadow-2xl transition-all ${
              isLightMode
                ? 'border-amber-300/80 bg-[#070913] shadow-amber-900/15'
                : 'border-amber-500/20 bg-[#040406] shadow-amber-950/20'
            }`}>
              {/* Live Canvas */}
              <FireworksCanvas
                interactive={true}
                isLightMode={false}
                activeShellColor={customColor}
                activeShellType={selectedShell.category}
                onExplode={handleExplosion}
                className="w-full h-full"
              />

              {/* Sky Background Palace Silhouette */}
              <div 
                className="absolute bottom-0 inset-x-0 h-28 pointer-events-none opacity-45 bg-repeat-x bg-bottom"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath fill='%23000000' d='M0,120 L0,90 L30,90 L30,80 L50,80 L50,60 L60,50 L70,60 L70,80 L90,80 L90,90 L160,90 L160,75 L180,60 L195,40 L210,60 L230,75 L230,90 L300,90 L300,85 L320,85 L330,70 L340,85 L360,85 L360,90 L450,90 L450,65 L465,55 L475,40 L485,55 L500,65 L500,90 L600,90 L600,80 L620,80 L620,60 L630,50 L640,60 L640,80 L660,80 L660,90 L750,90 L750,70 L770,55 L785,38 L800,55 L820,70 L820,90 L900,90 L900,85 L920,85 L930,70 L940,85 L960,85 L960,90 L1050,90 L1050,65 L1065,55 L1075,40 L1085,55 L1100,65 L1100,90 L1200,90 L1200,120 Z'/%3E%3C/svg%3E")`,
                  backgroundSize: '800px 90px',
                }}
              />

              {/* Helpful In-canvas Hint */}
              <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs text-stone-200">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span>👆 Click anywhere on the dark sky to launch &middot; Selected: <strong className="text-amber-300">{selectedShell.name}</strong></span>
              </div>

              {/* Sound Toggle */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={toggleSound}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    !isMuted 
                      ? 'bg-amber-500 text-stone-950 shadow-md' 
                      : 'bg-black/80 border border-white/15 text-stone-300 hover:text-white'
                  }`}
                  title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isMuted ? 'Sound Off' : 'Sound Live'}</span>
                </button>
              </div>

              {/* Interactive In-canvas Footer Controls */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-stone-300 px-4 py-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 z-20">
                <div className="flex items-center gap-3">
                  <span>Bursts Tested: <strong className="text-amber-400 font-mono text-sm">{burstCount}</strong></span>
                  <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
                  <span className="hidden sm:inline text-stone-400">Click anywhere to burst</span>
                </div>
                
                <button
                  onClick={startGrandFinaleSequence}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                    isAutoShowRunning
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isAutoShowRunning ? 'Firing Climax...' : 'Simulate 20-Burst Finale'}</span>
                </button>
              </div>
            </div>

            <div className={`mt-2.5 flex items-center justify-between text-xs ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
              <span>Tip: Jatin Rathore syncs these exact fireworks to your chosen entrance song via digital controllers.</span>
              <button onClick={() => setBurstCount(0)} className="underline hover:text-stone-900">
                Clear
              </button>
            </div>
          </div>

          {/* Shell Details & Selection Right Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`p-6 rounded-2xl border transition-all ${
              isLightMode ? 'bg-white border-amber-200/90 shadow-sm' : 'bg-stone-900/60 border-stone-800'
            }`}>
              <h3 className={`text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-2 ${
                isLightMode ? 'text-amber-800' : 'text-amber-400'
              }`}>
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Choose Firework Effect</span>
              </h3>
              
              <div className="space-y-2">
                {PYRO_SHELLS.map((shell) => {
                  const isSelected = selectedShell.id === shell.id;
                  return (
                    <button
                      key={shell.id}
                      onClick={() => handleShellSelect(shell)}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-start gap-3 ${
                        isSelected
                          ? isLightMode
                            ? 'bg-amber-100/70 border-amber-500 text-stone-900 shadow-sm ring-1 ring-amber-400'
                            : 'bg-amber-500/15 border-amber-500 text-stone-100'
                          : isLightMode
                          ? 'bg-[#faf8f5] border-stone-200 text-stone-700 hover:border-amber-300'
                          : 'bg-stone-950/40 border-stone-800 text-stone-300'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full mt-0.5 shrink-0 shadow-sm"
                        style={{ backgroundColor: shell.color, boxShadow: `0 0 8px ${shell.color}` }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold truncate">{shell.name}</span>
                          {shell.hindiName && (
                            <span className="text-[11px] text-stone-400 shrink-0">{shell.hindiName}</span>
                          )}
                        </div>
                        <p className={`text-[11px] line-clamp-1 mt-0.5 ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
                          {shell.idealFor}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Effect Description */}
            <div className={`p-6 rounded-2xl border transition-all ${
              isLightMode
                ? 'bg-gradient-to-b from-white to-[#faf8f5] border-amber-200/90 shadow-sm'
                : 'bg-gradient-to-b from-stone-900/80 to-stone-950 border border-stone-800'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${
                isLightMode ? 'border-amber-100' : 'border-stone-800/80'
              }`}>
                <span className={`text-xs uppercase tracking-widest font-semibold ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  Effect Details
                </span>
                <span className="text-xs text-amber-700 font-bold">{selectedShell.category.toUpperCase()}</span>
              </div>
              
              <h4 className={`text-lg font-cinzel font-bold mt-3 ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                {selectedShell.name}
              </h4>
              
              <p className={`text-xs leading-relaxed mt-2 ${isLightMode ? 'text-stone-600' : 'text-stone-300'}`}>
                {selectedShell.description}
              </p>
              
              <div className={`mt-4 pt-3 border-t text-xs ${isLightMode ? 'border-amber-100' : 'border-stone-800/80'}`}>
                <div className={isLightMode ? 'text-stone-500' : 'text-stone-400'}>Best suited for:</div>
                <div className={`font-semibold mt-0.5 ${isLightMode ? 'text-stone-800' : 'text-stone-200'}`}>
                  {selectedShell.idealFor}
                </div>
              </div>

              <div className={`mt-5 flex items-center justify-between pt-3 border-t ${
                isLightMode ? 'border-amber-100' : 'border-stone-800/80'
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>CSIR-NEERI Green Certified</span>
                </div>
                <a
                  href="#enquiry"
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold hover:underline"
                >
                  Book for your wedding &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
