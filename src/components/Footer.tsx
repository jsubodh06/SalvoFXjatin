import React, { useState } from 'react';
import { Flame, Youtube, ShieldCheck, Lock } from 'lucide-react';
import { YOUTUBE_CHANNEL_INFO } from '../data/videosData';

interface FooterProps {
  isLightMode: boolean;
  onOpenOwnerDesk?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isLightMode, onOpenOwnerDesk }) => {
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleAdminClick = () => {
    setShowPinPrompt(true);
    setPinError(false);
    setPinInput('');
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '7089') {
      setShowPinPrompt(false);
      if (onOpenOwnerDesk) onOpenOwnerDesk();
    } else {
      setPinError(true);
    }
  };

  return (
    <footer className={`border-t text-xs transition-colors duration-300 ${
      isLightMode
        ? 'bg-[#f5f2eb] border-amber-200/90 text-stone-600'
        : 'bg-[#040406] border-stone-800 text-stone-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shadow-md shadow-amber-500/20">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isLightMode ? 'bg-white' : 'bg-[#08080c]'}`}>
                  <Flame className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <div className="font-cinzel text-xl font-bold tracking-widest">
                <span className={isLightMode ? 'text-stone-900' : 'text-stone-100'}>SALVO</span>
                <span className="text-amber-600 font-extrabold">FX</span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm">
              Founded by <strong>Jatin Rathore</strong> with primary hub in <strong>Indore, Madhya Pradesh</strong>, Salvo FX is India’s benchmark pyrotechnic design studio. We choreograph high-altitude symphonies, royal destination wedding varmala haloworks, and eco-certified festival displays with computerized timecode precision across all cities pan-India.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={YOUTUBE_CHANNEL_INFO.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
                  isLightMode
                    ? 'bg-white border-amber-200 text-red-700 hover:border-red-400 shadow-sm'
                    : 'bg-red-950/40 border-red-800/40 text-red-300 hover:text-white'
                }`}
              >
                <Youtube className="w-4 h-4 text-red-600 fill-current" />
                <span className="font-semibold">YouTube: {YOUTUBE_CHANNEL_INFO.handle}</span>
              </a>
            </div>
          </div>

          {/* Pyrotechnic Disciplines */}
          <div>
            <h4 className={`text-xs font-cinzel font-bold uppercase tracking-widest mb-4 ${
              isLightMode ? 'text-stone-900' : 'text-stone-200'
            }`}>
              Disciplines
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#services" className="hover:text-amber-600 transition-colors">Wedding SFX & Sparkulars</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">Symphonic Pyro-Musicals</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">Lake Pichola Water Pontoon</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">CSIR-NEERI Green Formulations</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">3D Drone Swarm & Pyro Halo</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">Stadium Victory Finales</a></li>
            </ul>
          </div>

          {/* Hub Location & Destinations */}
          <div>
            <h4 className={`text-xs font-cinzel font-bold uppercase tracking-widest mb-4 ${
              isLightMode ? 'text-stone-900' : 'text-stone-200'
            }`}>
              Hub Location
            </h4>
            <ul className="space-y-2.5">
              <li className={`p-2.5 rounded-xl border ${
                isLightMode ? 'bg-amber-50/80 border-amber-300/80 text-amber-900' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}>
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Indore, Madhya Pradesh</span>
                </div>
                <span className={`block text-[10px] mt-0.5 ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>Primary Central Operations Hub</span>
              </li>
              <li className="pt-1 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Pan-India Deployments
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Jaipur, Udaipur, Rajasthan</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Delhi NCR & Mumbai</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Goa & All Other Cities, etc.</span>
              </li>
            </ul>
          </div>

          {/* Regulatory & Contact */}
          <div>
            <h4 className={`text-xs font-cinzel font-bold uppercase tracking-widest mb-4 ${
              isLightMode ? 'text-stone-900' : 'text-stone-200'
            }`}>
              Direct Contact
            </h4>
            <div className="space-y-3">
              <div className="text-[11px] leading-relaxed space-y-1">
                <div>Phone / WhatsApp: <a href="https://wa.me/917089080014" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-700 hover:underline">+91 7089080014</a></div>
                <div>Email: <a href="mailto:Salvosfx@gmail.com" className="font-semibold text-amber-700 hover:underline">Salvosfx@gmail.com</a></div>
                <div className="text-stone-500 pt-1">PESO Licensed &bull; CSIR-NEERI Green Certified</div>
              </div>
              <div className="pt-2">
                <a
                  href="#enquiry"
                  className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold hover:from-amber-400 hover:to-amber-500 transition-all shadow-sm"
                >
                  Request Proposal &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
          isLightMode ? 'border-amber-200/80 text-stone-600' : 'border-stone-800/80 text-stone-400'
        }`}>
          <div>
            &copy; {new Date().getFullYear()} Salvo FX Pyrotechnics &middot; Jatin Rathore. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Explosives Act 1884 & PESO Compliant</span>
            </span>
            <a href="#simulator" className="hover:text-stone-900">Fireworks Preview</a>
            <a href="https://youtube.com/@jatinrathore0353?si=VsUcElibpf6Qawbw" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900">YouTube Channel</a>
            <a href="#enquiry" className="hover:text-stone-900">Request Proposal</a>

            {/* Discreet Admin Lock for Jatin Rathore Only (Protected by PIN) */}
            {onOpenOwnerDesk && (
              <button
                type="button"
                onClick={handleAdminClick}
                className="text-stone-400 hover:text-stone-600 flex items-center gap-1 cursor-pointer transition-colors"
                title="Owner Access"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Admin PIN Prompt Modal */}
      {showPinPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-sm p-6 rounded-2xl border shadow-2xl ${
            isLightMode ? 'bg-white border-amber-300' : 'bg-stone-900 border-stone-700'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-amber-600" />
              <h3 className="font-cinzel font-bold text-sm text-stone-900">Owner Access Verification</h3>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Client proposals are confidential. Enter Jatin Rathore owner security PIN to view.
            </p>
            <form onSubmit={handleVerifyPin} className="space-y-3">
              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Enter PIN (e.g. 7089)"
                className="w-full px-3 py-2 border rounded-xl text-center font-mono text-sm tracking-widest focus:outline-none focus:border-amber-500"
              />
              {pinError && (
                <div className="text-[11px] text-red-600 font-medium text-center">
                  Incorrect PIN. Access restricted to owner.
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                >
                  Verify & Enter
                </button>
                <button
                  type="button"
                  onClick={() => setShowPinPrompt(false)}
                  className="px-4 py-2 rounded-xl border text-stone-500 hover:text-stone-800 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};
