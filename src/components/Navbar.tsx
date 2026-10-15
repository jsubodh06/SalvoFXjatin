import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Flame, Sun, Moon } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLightMode, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getIsMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isLightMode
            ? 'bg-[#faf8f5]/92 backdrop-blur-md border-b border-amber-200/80 shadow-md shadow-amber-900/5 py-3.5'
            : 'bg-[#060709]/92 backdrop-blur-md border-b border-stone-800/80 shadow-2xl py-3.5'
          : isLightMode
          ? 'bg-gradient-to-b from-[#faf8f5]/95 via-[#faf8f5]/60 to-transparent py-5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Crest */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLightMode ? 'bg-white' : 'bg-[#08080c]'}`}>
              <Flame className="w-5 h-5 text-amber-600 group-hover:text-amber-500" />
            </div>
          </div>
          <div>
            <div className="font-cinzel text-xl sm:text-2xl font-black tracking-[0.18em] flex items-center gap-1.5">
              <span className={isLightMode ? 'text-stone-900' : 'text-stone-100'}>SALVO</span>
              <span className="text-amber-600 font-extrabold">FX</span>
            </div>
            <div className={`text-[10px] uppercase tracking-[0.22em] font-sans -mt-0.5 font-medium ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
              By Jatin Rathore &middot; Pyrotechnics India
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className={`hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-semibold ${
          isLightMode ? 'text-stone-700' : 'text-stone-300'
        }`}>
          <a href="#simulator" className="hover:text-amber-600 transition-colors">
            Fireworks Preview
          </a>
          <a href="#portfolio" className="hover:text-amber-600 transition-colors">
            Portfolio
          </a>
          <a href="#services" className="hover:text-amber-600 transition-colors">
            Disciplines
          </a>
          <a href="#estimator" className="hover:text-amber-600 transition-colors">
            Show Estimator
          </a>
          <a href="#enquiry" className="hover:text-amber-600 transition-colors">
            Request Proposal
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
              isLightMode
                ? 'bg-amber-100/70 border-amber-300/80 text-amber-900 hover:bg-amber-200/70'
                : 'bg-stone-900 border-stone-800 text-stone-300 hover:text-white'
            }`}
            title={isLightMode ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
          >
            {isLightMode ? <Moon className="w-4 h-4 text-amber-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            <span className="text-[11px] font-medium hidden md:inline">{isLightMode ? 'Dark Theme' : 'Light Theme'}</span>
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg border text-xs transition-all flex items-center gap-1.5 ${
              !isMuted
                ? isLightMode
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm'
                  : 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                : isLightMode
                ? 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
                : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
            title={isMuted ? 'Unmute realistic pyrotechnic audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
            <span className="text-[11px] font-medium hidden md:inline">{isMuted ? 'Audio Off' : 'Pyro Sound Live'}</span>
          </button>

          {/* Direct CTA */}
          <a
            href="#enquiry"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-amber-500/25"
          >
            Request Proposal
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border text-xs ${isLightMode ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-stone-900 border-stone-800 text-amber-400'}`}
          >
            {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-lg border ${isLightMode ? 'bg-white border-stone-200 text-stone-700' : 'bg-stone-900 border-stone-800 text-stone-300'}`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border ${isLightMode ? 'bg-white border-stone-200 text-stone-800' : 'bg-stone-900 border-stone-800 text-stone-200'}`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`sm:hidden border-b px-6 py-6 space-y-4 ${isLightMode ? 'bg-[#faf8f5] border-amber-200 shadow-xl' : 'bg-[#090a0f] border-stone-800'}`}>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium ${isLightMode ? 'text-stone-800 hover:text-amber-600' : 'text-stone-300 hover:text-amber-400'}`}
          >
            Preview Wedding Fireworks
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium ${isLightMode ? 'text-stone-800 hover:text-amber-600' : 'text-stone-300 hover:text-amber-400'}`}
          >
            Signature Displays & Palaces
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium ${isLightMode ? 'text-stone-800 hover:text-amber-600' : 'text-stone-300 hover:text-amber-400'}`}
          >
            Pyrotechnic Capabilities
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-medium ${isLightMode ? 'text-stone-800 hover:text-amber-600' : 'text-stone-300 hover:text-amber-400'}`}
          >
            Show Experience Estimator
          </a>

          {/* Quick Sound & Theme Controls in Mobile Drawer */}
          <div className="pt-2 border-t border-stone-800/40 flex items-center justify-between">
            <button
              onClick={toggleAudio}
              className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-2 ${
                !isMuted
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400'
              }`}
            >
              {!isMuted ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
              <span>{!isMuted ? 'Sound Live (On)' : 'Sound Muted'}</span>
            </button>

            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 ${
                isLightMode
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-stone-900 border-stone-800 text-stone-300'
              }`}
            >
              {isLightMode ? <Moon className="w-4 h-4 text-amber-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{isLightMode ? 'Dark Theme' : 'Light Theme'}</span>
            </button>
          </div>

          <a
            href="#enquiry"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-3 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
          >
            Request Proposal
          </a>
        </div>
      )}
    </header>
  );
};
