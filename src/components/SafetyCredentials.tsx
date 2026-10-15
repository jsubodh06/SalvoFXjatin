import React from 'react';
import { ShieldCheck, FileCheck, Lock, Award, HeartPulse, Building2 } from 'lucide-react';

interface SafetyCredentialsProps {
  isLightMode: boolean;
}

export const SafetyCredentials: React.FC<SafetyCredentialsProps> = ({ isLightMode }) => {
  const credentials = [
    {
      icon: ShieldCheck,
      title: 'PESO Licensed & Authorized',
      desc: 'Full regulatory authorization under the Petroleum and Explosives Safety Organisation (Govt. of India), Class 7 Division 2 pyrotechnic operations.',
    },
    {
      icon: FileCheck,
      title: 'CSIR-NEERI Green Certified',
      desc: 'Formulations verified free from toxic barium, lead, and chlorates, ensuring minimum particulate emissions and maximum environmental compliance.',
    },
    {
      icon: Lock,
      title: 'Military-Grade Digital Firing',
      desc: 'Hardware firing lines driven by 256-bit encrypted FireOne & PyroDigital field modules. Zero risk of rogue radio frequency or static triggers.',
    },
    {
      icon: Building2,
      title: 'Palace Heritage Preservation',
      desc: 'Proprietary non-acidic fallout recovery and specialized flame-retardant tarpaulin barriers protecting 400-year-old Rajasthani sandstone and Italian marble.',
    },
    {
      icon: HeartPulse,
      title: '₹10 Crore Comprehensive Insurance',
      desc: 'Full-spectrum public liability and property indemnity coverage backing every production across private resorts, stadiums, and royal estates.',
    },
    {
      icon: Award,
      title: 'Turnkey Civil & Aviation Clearances',
      desc: 'Our dedicated regulatory desk coordinates local Police Commissionerates, District Collectors, Fire Brigades, and DGCA / AAI airspace NOTAMs.',
    },
  ];

  return (
    <section className={`py-20 border-t transition-colors duration-300 relative ${
      isLightMode ? 'bg-[#fcfbf9] border-amber-200/80' : 'bg-[#070709] border-stone-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className={`flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold mb-3 ${
            isLightMode ? 'text-amber-800' : 'text-amber-400'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Engineering Discipline</span>
            <span aria-hidden="true" className={isLightMode ? 'text-stone-400' : 'text-stone-600'}>&middot;</span>
            <span>Grucci-Grade Safety Rigor</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-cinzel font-bold tracking-tight ${
            isLightMode ? 'text-stone-900' : 'text-stone-100'
          }`}>
            Safety as an Art Form
          </h2>
          <p className={`mt-3 text-base font-normal ${isLightMode ? 'text-stone-600' : 'text-stone-400 font-light'}`}>
            True luxury is effortless execution backed by rigorous pyrotechnic science, certified chemical safety, and airtight administrative compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all flex items-start gap-4 ${
                  isLightMode
                    ? 'bg-white border-amber-200/80 hover:border-amber-400 shadow-sm shadow-amber-900/5'
                    : 'bg-stone-900/40 border-stone-800/80 hover:border-amber-500/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isLightMode ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-sm font-cinzel font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>{cred.title}</h3>
                  <p className={`text-xs leading-relaxed mt-1.5 ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>{cred.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
