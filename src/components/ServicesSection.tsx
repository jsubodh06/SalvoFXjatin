import React from 'react';
import { Music, Flame, Sparkles, ShieldCheck, Orbit, Award } from 'lucide-react';

interface ServicesSectionProps {
  isLightMode: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ isLightMode }) => {
  const services = [
    {
      icon: Flame,
      title: 'Royal Wedding & Varmala SFX',
      tagline: 'Precision Cold Sparks, Heavy Fog & Sky Willows',
      description: 'The signature specialty of Jatin Rathore. We craft synchronized 40-foot cold spark cascades, ultrasonic dry-ice low fog clouds for bridal entries, and 24K Nishiki Kamuro gold canopies the exact microsecond garlands meet.',
      highlights: ['Microsecond Varmala Trigger', 'Zero-Heat Sparkular Fountains', 'Sandstone Safe Rigging', 'Ultrasonic Low Fog Atmosphere'],
    },
    {
      icon: Music,
      title: 'Symphonic Pyro-Musicals',
      tagline: 'Choreographed to Classical Ragas & Soundtracks',
      description: 'Inspired by Grucci-standard digital choreography. Every shell burst and color bloom is timed to 0.01 seconds with your music—whether live Shehnai, Bollywood orchestra, or dramatic Western cinema scores.',
      highlights: ['SMPTE Timecode synchronization', 'FireOne digital master control', 'Custom audio sound design', 'Multi-zone acoustic alignment'],
    },
    {
      icon: Sparkles,
      title: 'Stage Sparkular & Sangeet SFX',
      tagline: 'Zero-Heat, Odor-Free Stage Magic',
      description: 'Transform your Sangeet ballroom into a concert-grade spectacle. Genuine Sparkular cold pyrotechnics produce zero fire risk, accompanied by cryogenic CO2 jets and high-output paper confetti cannons.',
      highlights: ['100% indoor ballroom safe', 'Zero toxic fallout or smell', 'DMX computerized chase sequences', 'Ultra-dense cryo CO2 blasts'],
    },
    {
      icon: ShieldCheck,
      title: 'CSIR-NEERI Green Pyro Formulations',
      tagline: 'Environmentally Certified & Low-Emission',
      description: 'Leading the modern era of responsible celebrations. We strictly deploy CSIR-NEERI approved green pyrotechnics free from barium salts and heavy metals, cutting smoke emissions by up to 80%.',
      highlights: ['Barium & lead free', 'National Green Tribunal compliant', 'PESO explosive department certified', 'Safe for urban estate lawns'],
    },
    {
      icon: Orbit,
      title: 'Drone Light & Pyro Hybrid Tapestries',
      tagline: '3D Aerial Swarm Formations with Shell Halos',
      description: 'Blend hundreds of RTK-GPS illuminated drones forming couple monograms, peacock emblems, or Lord Ganesha silhouettes in 3D night space, framed by synchronized high-altitude firework halos.',
      highlights: ['300 to 1,000 synchronized drones', 'Centimeter RTK positioning', 'Custom 3D monogram design', 'Dual DGCA certified drone pilots'],
    },
    {
      icon: Award,
      title: 'Stadium & Mega Festival Spectacles',
      tagline: 'World-Record Scale Celebrations',
      description: 'From 100,000-spectator stadium finales to civic waterfront Diwali galas. We operate high-altitude 3-inch to 8-inch aerial shells reaching 800 feet with panoramic perimeter firing lines.',
      highlights: ['Perimeter roof rigging', 'Harbour barge arrays', 'Turnkey police & PESO clearance', 'Multi-crore public liability cover'],
    },
  ];

  return (
    <section id="services" className={`py-24 transition-colors duration-300 relative ${
      isLightMode ? 'bg-[#fcfbf9]' : 'bg-[#070709]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold mb-3 ${
            isLightMode ? 'text-amber-800' : 'text-amber-400'
          }`}>
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Mastery & Capabilities</span>
            <span aria-hidden="true" className={isLightMode ? 'text-stone-400' : 'text-stone-600'}>&middot;</span>
            <span>Pyrotechnic Craft</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-tight ${
            isLightMode ? 'text-stone-900' : 'text-stone-100'
          }`}>
            The Pinnacle of Pyrotechnic Artistry
          </h2>
          <p className={`mt-4 text-base sm:text-lg font-normal leading-relaxed ${
            isLightMode ? 'text-stone-600' : 'text-stone-400 font-light'
          }`}>
            Every celebration has a unique soul. We synthesize cutting-edge computerized firing technology with royal celebratory traditions to produce unforgettable sky art.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((serv, index) => {
            const Icon = serv.icon;
            return (
              <div
                key={index}
                className={`group p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl ${
                  isLightMode
                    ? 'bg-white border-amber-200/80 hover:border-amber-400 shadow-sm shadow-amber-900/5'
                    : 'bg-gradient-to-b from-stone-900/60 to-stone-950/90 border-stone-800/80 hover:border-amber-500/40 shadow-stone-950/30'
                }`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all ${
                    isLightMode
                      ? 'bg-amber-100 border border-amber-300 text-amber-800 group-hover:bg-amber-500 group-hover:text-stone-950'
                      : 'bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-stone-950'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`text-xl font-cinzel font-bold transition-colors group-hover:text-amber-600 ${
                    isLightMode ? 'text-stone-900' : 'text-stone-100'
                  }`}>
                    {serv.title}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mt-1 font-serif">
                    {serv.tagline}
                  </p>

                  <p className={`text-xs sm:text-sm leading-relaxed mt-4 ${
                    isLightMode ? 'text-stone-600' : 'text-stone-300'
                  }`}>
                    {serv.description}
                  </p>
                </div>

                <div className={`mt-6 pt-5 border-t ${isLightMode ? 'border-amber-100' : 'border-stone-800/80'}`}>
                  <div className={`text-[11px] uppercase tracking-wider font-bold mb-2.5 ${
                    isLightMode ? 'text-stone-500' : 'text-stone-400'
                  }`}>
                    Key Specifications
                  </div>
                  <ul className="space-y-1.5">
                    {serv.highlights.map((h, i) => (
                      <li key={i} className={`text-xs flex items-center gap-2 ${
                        isLightMode ? 'text-stone-700 font-medium' : 'text-stone-300'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-dashed border-amber-200/60 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">Custom Commission</span>
                    <a
                      href="#enquiry"
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline flex items-center gap-1"
                    >
                      <span>Request Proposal</span>
                      <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
