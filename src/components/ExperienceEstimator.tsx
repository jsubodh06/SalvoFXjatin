import React, { useState } from 'react';
import { Calculator, CheckCircle, ArrowRight } from 'lucide-react';

interface ExperienceEstimatorProps {
  isLightMode: boolean;
  onPreFillEnquiry: (details: {
    eventType: string;
    venueType: string;
    scaleBudget: string;
    notes: string;
  }) => void;
}

export const ExperienceEstimator: React.FC<ExperienceEstimatorProps> = ({ isLightMode, onPreFillEnquiry }) => {
  const [celebrationType, setCelebrationType] = useState<string>('destination-wedding');
  const [venueSetting, setVenueSetting] = useState<string>('palace-lakefront');
  const [scaleTier, setScaleTier] = useState<string>('grand-luxe');
  const [includeMusicSync, setIncludeMusicSync] = useState<boolean>(true);
  const [includeDroneSwarm, setIncludeDroneSwarm] = useState<boolean>(false);
  const [includeIndoorSFX, setIncludeIndoorSFX] = useState<boolean>(true);

  const calculateSpecs = () => {
    let shells = 1800;
    let duration = '6 to 8 Minutes';
    let clearance = '60 meters buffer';
    let priceRange = '₹12 - ₹18 Lakhs';
    let tierName = 'Signature Grand Luxe';

    if (scaleTier === 'varmala-radiance') {
      shells = 850;
      duration = '3 to 5 Minutes';
      clearance = '45 meters buffer';
      priceRange = '₹6 - ₹10 Lakhs';
      tierName = 'Varmala & Stage SFX Setup';
    } else if (scaleTier === 'imperial-heritage') {
      shells = 3600;
      duration = '10 to 14 Minutes';
      clearance = '90 meters buffer';
      priceRange = '₹25 - ₹45 Lakhs';
      tierName = 'Imperial Royal Heritage';
    } else if (scaleTier === 'mega-festival') {
      shells = 7500;
      duration = '15 to 20 Minutes';
      clearance = '120 meters buffer (Harbour/Barge)';
      priceRange = '₹60 Lakhs - ₹1.5 Crore';
      tierName = 'Presidential Mega Spectacle';
    }

    if (includeDroneSwarm) {
      priceRange += ' + Drone Swarm';
    }

    return { shells, duration, clearance, priceRange, tierName };
  };

  const specs = calculateSpecs();

  const handleApplyToEnquiry = () => {
    const venueLabel = {
      'palace-lakefront': 'Lakefront Palace & Heritage Waters',
      'heritage-fort': 'Historic Hilltop Fort & Ramparts',
      'beachfront': 'Beachfront & Coastal Waterfront',
      'luxury-lawn': 'Grand Estate / Farmhouse Lawn',
      'indoor-ballroom': 'Indoor Luxury Ballroom & Stage SFX',
      'stadium': 'Arena & Stadium Finale',
    }[venueSetting] || venueSetting;

    const eventLabel = {
      'destination-wedding': 'Royal Destination Wedding',
      'varmala-sangeet': 'Varmala & Sangeet Stage SFX',
      'diwali-festival': 'Grand Diwali / Cultural Festival',
      'sports-finale': 'Stadium Sports Championship',
      'corporate-gala': 'Corporate Landmark Gala',
    }[celebrationType] || celebrationType;

    const notes = `Configured via Experience Estimator:
- Package: ${specs.tierName} (${specs.priceRange})
- Target Duration: ${specs.duration}
- Est. Shells: ${specs.shells.toLocaleString()}
- Pyro-Musical Music Sync: ${includeMusicSync ? 'Yes (Timecode SMPTE)' : 'No'}
- Drone Light Swarm: ${includeDroneSwarm ? 'Yes (Synchronized)' : 'No'}
- Stage Cold Pyro & Low Fog: ${includeIndoorSFX ? 'Yes' : 'No'}`;

    onPreFillEnquiry({
      eventType: eventLabel,
      venueType: venueLabel,
      scaleBudget: specs.priceRange,
      notes,
    });

    const enquiryEl = document.getElementById('enquiry');
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className={`py-24 border-t transition-colors duration-300 relative ${
      isLightMode ? 'bg-[#faf8f5] border-amber-200/80' : 'bg-[#06070a] border-stone-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className={`flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold mb-3 ${
            isLightMode ? 'text-amber-800' : 'text-amber-400'
          }`}>
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>Interactive Show Planner</span>
            <span aria-hidden="true" className={isLightMode ? 'text-stone-400' : 'text-stone-600'}>&middot;</span>
            <span>Pyrotechnic Scoping</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-tight ${
            isLightMode ? 'text-stone-900' : 'text-stone-100'
          }`}>
            Curate Your Pyrotechnic Experience
          </h2>
          <p className={`mt-4 text-base sm:text-lg font-normal leading-relaxed ${
            isLightMode ? 'text-stone-600' : 'text-stone-400 font-light'
          }`}>
            Select your wedding venue topology, scale, and custom modules to receive an immediate technical blueprint and investment profile.
          </p>
        </div>

        {/* Planner Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Occasion */}
            <div className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-amber-200/80 shadow-sm' : 'bg-stone-900/40 border-stone-800'
            }`}>
              <label className={`block text-xs uppercase tracking-wider font-bold mb-3.5 ${
                isLightMode ? 'text-amber-800' : 'text-amber-400'
              }`}>
                1. Select Celebration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'destination-wedding', label: 'Royal Wedding' },
                  { id: 'varmala-sangeet', label: 'Varmala & Sangeet SFX' },
                  { id: 'diwali-festival', label: 'Diwali & Festivals' },
                  { id: 'sports-finale', label: 'Sports / Arena' },
                  { id: 'corporate-gala', label: 'Corporate Gala' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCelebrationType(item.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      celebrationType === item.id
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                        : isLightMode
                        ? 'bg-[#faf8f5] border-stone-200 text-stone-700 hover:border-amber-300'
                        : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Venue Geography */}
            <div className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-amber-200/80 shadow-sm' : 'bg-stone-900/40 border-stone-800'
            }`}>
              <label className={`block text-xs uppercase tracking-wider font-bold mb-3.5 ${
                isLightMode ? 'text-amber-800' : 'text-amber-400'
              }`}>
                2. Venue Topology
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'palace-lakefront', label: 'Lakefront Palace' },
                  { id: 'heritage-fort', label: 'Historic Hilltop Fort' },
                  { id: 'beachfront', label: 'Beachfront Waterfront' },
                  { id: 'luxury-lawn', label: 'Grand Farmhouse Estate' },
                  { id: 'indoor-ballroom', label: 'Indoor Ballroom (Cold SFX)' },
                  { id: 'stadium', label: 'Stadium & Arena' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setVenueSetting(item.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      venueSetting === item.id
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                        : isLightMode
                        ? 'bg-[#faf8f5] border-stone-200 text-stone-700 hover:border-amber-300'
                        : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Production Scale */}
            <div className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-amber-200/80 shadow-sm' : 'bg-stone-900/40 border-stone-800'
            }`}>
              <label className={`block text-xs uppercase tracking-wider font-bold mb-3.5 ${
                isLightMode ? 'text-amber-800' : 'text-amber-400'
              }`}>
                3. Production Scale & Format
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'varmala-radiance',
                    title: 'Varmala & Stage SFX Setup',
                    desc: 'Precision 3-5 min ceremony focus with Sparkulars, dry ice fog & cryo CO2.',
                  },
                  {
                    id: 'grand-luxe',
                    title: 'Signature Grand Luxe',
                    desc: 'Full 6-8 min multi-caliber aerial shells with golden Kamuro canopy finale.',
                  },
                  {
                    id: 'imperial-heritage',
                    title: 'Imperial Royal Heritage',
                    desc: '10-14 min symphonic pontoon/rampart choreography on palace scale.',
                  },
                  {
                    id: 'mega-festival',
                    title: 'Presidential Mega Spectacle',
                    desc: '15-20 min civic/stadium multi-barge display with 7,000+ shells.',
                  },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setScaleTier(tier.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      scaleTier === tier.id
                        ? isLightMode
                          ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/50'
                          : 'bg-amber-500/15 border-amber-500 text-stone-100 ring-1 ring-amber-500/50'
                        : isLightMode
                        ? 'bg-[#faf8f5] border-stone-200 text-stone-700 hover:border-amber-300'
                        : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className={`text-xs font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-200'}`}>{tier.title}</div>
                    <div className={`text-[11px] mt-1 ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Addons */}
            <div className={`p-6 rounded-3xl border ${
              isLightMode ? 'bg-white border-amber-200/80 shadow-sm' : 'bg-stone-900/40 border-stone-800'
            }`}>
              <label className={`block text-xs uppercase tracking-wider font-bold mb-3.5 ${
                isLightMode ? 'text-amber-800' : 'text-amber-400'
              }`}>
                4. Technological Addons
              </label>
              <div className="space-y-2.5">
                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer ${
                  isLightMode ? 'bg-[#faf8f5] border-stone-200' : 'bg-stone-950/40 border-stone-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeMusicSync}
                    onChange={(e) => setIncludeMusicSync(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <div className="text-xs">
                    <span className={`font-semibold ${isLightMode ? 'text-stone-800' : 'text-stone-200'}`}>Symphonic Pyro-Musical Synchronization</span>
                    <span className={`block text-[11px] ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Computer-timed to live Shehnai or your custom playlist.</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer ${
                  isLightMode ? 'bg-[#faf8f5] border-stone-200' : 'bg-stone-950/40 border-stone-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeDroneSwarm}
                    onChange={(e) => setIncludeDroneSwarm(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <div className="text-xs">
                    <span className={`font-semibold ${isLightMode ? 'text-stone-800' : 'text-stone-200'}`}>300-Drone Swarm 3D Sky Tapestry</span>
                    <span className={`block text-[11px] ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Creates couple monogram or deity motifs in night sky.</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer ${
                  isLightMode ? 'bg-[#faf8f5] border-stone-200' : 'bg-stone-950/40 border-stone-800'
                }`}>
                  <input
                    type="checkbox"
                    checked={includeIndoorSFX}
                    onChange={(e) => setIncludeIndoorSFX(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded"
                  />
                  <div className="text-xs">
                    <span className={`font-semibold ${isLightMode ? 'text-stone-800' : 'text-stone-200'}`}>Stage Sparkular Matrix & Ultrasonic Low Fog</span>
                    <span className={`block text-[11px] ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Cold zero-heat fountains for indoor sangeet & varmala.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Real-time Technical Output & Cost Summary */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-xl ${
              isLightMode
                ? 'bg-white border-amber-300 shadow-amber-900/10'
                : 'bg-gradient-to-b from-stone-900 to-stone-950 border-amber-500/30'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b ${
                isLightMode ? 'border-amber-100' : 'border-stone-800'
              }`}>
                <span className={`text-xs uppercase tracking-widest font-bold ${
                  isLightMode ? 'text-amber-800' : 'text-amber-400'
                }`}>
                  Estimated Blueprint
                </span>
                <span className={`text-xs font-mono ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>SALVO-SPEC</span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className={`text-xs ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Production Tier</div>
                  <div className={`text-xl font-cinzel font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>{specs.tierName}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isLightMode ? 'bg-amber-50 border-amber-300/80' : 'bg-amber-500/10 border-amber-500/30'
                }`}>
                  <div className={`text-xs font-semibold ${isLightMode ? 'text-amber-900' : 'text-amber-300'}`}>Estimated Budget Bracket</div>
                  <div className="text-2xl font-cinzel font-black text-amber-700 mt-1">
                    {specs.priceRange}
                  </div>
                  <div className={`text-[11px] mt-1 ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
                    Includes digital firing hardware, PESO compliance & local administration clearances.
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className={`p-3 rounded-xl border ${
                    isLightMode ? 'bg-[#faf8f5] border-stone-200' : 'bg-stone-950 border-stone-800'
                  }`}>
                    <span className={`block text-[11px] ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Shell Payload</span>
                    <span className={`font-mono font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>{specs.shells.toLocaleString()} Shells</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${
                    isLightMode ? 'bg-[#faf8f5] border-stone-200' : 'bg-stone-950 border-stone-800'
                  }`}>
                    <span className={`block text-[11px] ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Duration</span>
                    <span className={`font-mono font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>{specs.duration}</span>
                  </div>

                  <div className={`p-3 rounded-xl border col-span-2 ${
                    isLightMode ? 'bg-[#faf8f5] border-stone-200' : 'bg-stone-950 border-stone-800'
                  }`}>
                    <span className={`block text-[11px] ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Safety Clearance Buffer</span>
                    <span className={`font-medium ${isLightMode ? 'text-stone-800' : 'text-stone-200'}`}>{specs.clearance}</span>
                  </div>
                </div>

                {/* Inclusions checklist */}
                <div className={`pt-4 border-t space-y-2 ${isLightMode ? 'border-amber-100' : 'border-stone-800'}`}>
                  <div className={`text-xs uppercase tracking-wider font-bold ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
                    Salvo FX Guarantees
                  </div>
                  <div className={`space-y-1.5 text-xs ${isLightMode ? 'text-stone-700' : 'text-stone-300'}`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>CSIR-NEERI Green Certified Low-Smoke Formulations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>FireOne Digital Master Timecode Control</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Turnkey Explosive Permits (PESO & Police Cleared)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Heritage Site Zero-Fallout Surface Protection</span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={handleApplyToEnquiry}
                  className="w-full mt-6 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply Specification & Request Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
