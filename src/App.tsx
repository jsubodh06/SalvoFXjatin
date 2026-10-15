import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceEstimator } from './components/ExperienceEstimator';
import { SafetyCredentials } from './components/SafetyCredentials';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';
import { ProposalDashboardModal } from './components/ProposalDashboardModal';
import { EnquiryData } from './types';
import { MessageSquare, Sparkles, Layers } from 'lucide-react';
import { soundFx } from './utils/audio';

export default function App() {
  // Default to dark theme as requested by user
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const [enquiryInitialData, setEnquiryInitialData] = useState<Partial<EnquiryData>>({});
  const [isProposalsDeskOpen, setIsProposalsDeskOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [isLightMode]);

  const handleToggleTheme = () => {
    setIsLightMode((prev) => !prev);
  };

  const handlePreFillEnquiry = (details: {
    eventType: string;
    venueType: string;
    scaleBudget: string;
    notes: string;
  }) => {
    setEnquiryInitialData({
      eventType: details.eventType,
      venueType: details.venueType,
      scaleBudget: details.scaleBudget,
      additionalNotes: details.notes,
    });
  };

  const triggerQuickSpark = () => {
    soundFx.playCrackle();
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isLightMode
        ? 'bg-[#faf8f5] text-stone-900 selection:bg-amber-400 selection:text-stone-950'
        : 'bg-[#070709] text-stone-100 selection:bg-amber-500 selection:text-black'
    }`}>
      {/* Top Luxury Navbar */}
      <Navbar isLightMode={isLightMode} onToggleTheme={handleToggleTheme} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero isLightMode={isLightMode} />

        {/* 1. Interactive Wedding Fireworks Preview */}
        <InteractiveSimulator isLightMode={isLightMode} />

        {/* 2. Masterwork Portfolio Displays */}
        <ShowcaseGallery isLightMode={isLightMode} />

        {/* 4. Core Pyrotechnic Capabilities & Formats */}
        <ServicesSection isLightMode={isLightMode} />

        {/* 5. Interactive Show Experience Estimator */}
        <ExperienceEstimator isLightMode={isLightMode} onPreFillEnquiry={handlePreFillEnquiry} />

        {/* 6. Engineering, Safety & PESO Compliance */}
        <SafetyCredentials isLightMode={isLightMode} />

        {/* 7. Commission Inquiry & Booking Form */}
        <EnquirySection
          key={JSON.stringify(enquiryInitialData) + isLightMode}
          isLightMode={isLightMode}
          initialData={enquiryInitialData}
        />
      </main>

      {/* Luxury Footer */}
      <Footer
        isLightMode={isLightMode}
        onOpenOwnerDesk={() => setIsProposalsDeskOpen(true)}
      />

      {/* Jatin Rathore Proposals & Leads Desk Modal */}
      <ProposalDashboardModal
        isOpen={isProposalsDeskOpen}
        onClose={() => setIsProposalsDeskOpen(false)}
        isLightMode={isLightMode}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Quick Spark Fireworks Trigger */}
        <button
          onClick={triggerQuickSpark}
          aria-label="Launch Firework Sparkles"
          title="Fire Sparkles in Sky Studio"
          className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-xl shadow-amber-500/30 border border-amber-300 transition-all hover:scale-110 flex items-center justify-center group"
        >
          <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold tracking-wide">
            Test Fireworks
          </span>
        </button>

        {/* Direct WhatsApp Consultation */}
        <a
          href="https://wa.me/917089080014?text=Namaste%20Jatin%20Rathore%20Team!%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20pyrotechnic%20or%20SFX%20display."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Consultation"
          className="p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 border border-emerald-400/40 transition-all hover:scale-110 flex items-center justify-center group"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 text-xs font-bold tracking-wide">
            WhatsApp Jatin Rathore
          </span>
        </a>
      </div>
    </div>
  );
}
