import React, { useState } from 'react';
import { EnquiryData } from '../types';
import { Send, Phone, Mail, MapPin, CheckCircle2, MessageSquare, Sparkles, ShieldCheck, Copy, Check, ArrowRight } from 'lucide-react';
import { saveNewProposal } from '../utils/proposalsStorage';

interface EnquirySectionProps {
  isLightMode: boolean;
  initialData?: Partial<EnquiryData>;
}

export const EnquirySection: React.FC<EnquirySectionProps> = ({ isLightMode, initialData }) => {
  const [formData, setFormData] = useState<EnquiryData>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    eventType: initialData?.eventType || 'Royal Destination Wedding',
    eventDate: initialData?.eventDate || '',
    city: initialData?.city || 'Jaipur & Delhi NCR',
    venueName: initialData?.venueName || '',
    venueType: initialData?.venueType || 'Lakefront Palace & Heritage Waters',
    guestCount: initialData?.guestCount || '200 - 500 Guests',
    scaleBudget: initialData?.scaleBudget || '₹12 - ₹18 Lakhs (Signature Grand Luxe)',
    customRequirements: initialData?.customRequirements || ['Symphonic Music Sync', 'CSIR-NEERI Green Certified'],
    additionalNotes: initialData?.additionalNotes || '',
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const availableRequirements = [
    'PERFECT SFX Setup (Sparkulars + Fog + CO2)',
    'Bridal Walk Cold Spark Pathway',
    'Varmala Precision Kamuro Halo',
    '300+ Drone Swarm Sky Tapestry',
    'Water Pontoon / Lake Rigging',
    'CSIR-NEERI Green Certified Formulation',
    'Turnkey PESO & Police Airspace Clearance',
    'Heritage Stone Zero-Fallout Protection',
  ];

  const handleToggleRequirement = (req: string) => {
    setFormData((prev) => {
      const exists = prev.customRequirements.includes(req);
      return {
        ...prev,
        customRequirements: exists
          ? prev.customRequirements.filter((r) => r !== req)
          : [...prev.customRequirements, req],
      };
    });
  };

  const buildWhatsAppText = (ref: string) => {
    return `Namaste Jatin Rathore & Salvo FX Team!

✨ *NEW PYROTECHNIC & SFX PROPOSAL REQUEST* ✨
*Ref ID:* ${ref}

👤 *Client / Planner Details:*
• *Name:* ${formData.fullName}
• *Phone:* ${formData.phone}
• *Email:* ${formData.email}

🎪 *Event Specifications:*
• *Event Type:* ${formData.eventType}
• *Date:* ${formData.eventDate || 'Upcoming Wedding Season'}
• *Destination City:* ${formData.city}
• *Venue:* ${formData.venueName || 'To Be Finalized'} (${formData.venueType})
• *Guest Count:* ${formData.guestCount}

💰 *Budget / Production Scale:*
• ${formData.scaleBudget}

🎆 *Special Pyrotechnics & SFX Modules:*
• ${formData.customRequirements.length > 0 ? formData.customRequirements.join('\n• ') : 'Standard Luxury Wedding Package'}

📝 *Vision Notes / Firing Cues:*
• ${formData.additionalNotes || 'Please share initial catalog and available dates.'}

_Sent via Salvo FX Official Website (by Jatin Rathore)_`;
  };

  const getWhatsAppUrl = (ref?: string) => {
    const text = buildWhatsAppText(ref || referenceId || 'SFX-REQUEST');
    return `https://wa.me/917089080014?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SFX-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(ref);

    // Save privately for the business record
    saveNewProposal(formData, ref);

    // Immediately open WhatsApp with full proposal data
    const waUrl = getWhatsAppUrl(ref);
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }

    setIsSubmitted(true);
  };

  const copyRefToClipboard = () => {
    navigator.clipboard.writeText(referenceId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const copySummaryToClipboard = () => {
    const summary = buildWhatsAppText(referenceId);
    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="enquiry" className={`py-24 border-t transition-colors duration-300 relative scroll-mt-20 ${
      isLightMode ? 'bg-[#faf8f5] border-amber-200/80' : 'bg-[#050608] border-stone-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold mb-3 ${
            isLightMode ? 'text-amber-800' : 'text-amber-400'
          }`}>
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Request Proposal</span>
            <span aria-hidden="true" className={isLightMode ? 'text-stone-400' : 'text-stone-600'}>&middot;</span>
            <span>Direct WhatsApp to Jatin Rathore</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-tight ${
            isLightMode ? 'text-stone-900' : 'text-stone-100'
          }`}>
            Request Your Pyrotechnic Proposal
          </h2>
          <p className={`mt-4 text-base sm:text-lg font-normal leading-relaxed ${
            isLightMode ? 'text-stone-600' : 'text-stone-400 font-light'
          }`}>
            Fill in your celebration details below. Submitting will send your complete custom proposal directly to lead pyrotechnician <strong>Jatin Rathore</strong> on WhatsApp (+91 7089080014).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Brand Contact & Office Details Left */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`p-8 rounded-3xl border transition-all ${
              isLightMode ? 'bg-white border-amber-200/90 shadow-sm' : 'bg-stone-900/60 border-stone-800'
            }`}>
              <h3 className={`text-lg font-cinzel font-bold mb-4 ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                Salvo FX &middot; Jatin Rathore Studio
              </h3>
              <p className={`text-xs leading-relaxed mb-6 ${isLightMode ? 'text-stone-600' : 'text-stone-300'}`}>
                Operating from our central hub in <strong>Indore, Madhya Pradesh</strong>, with dedicated pyrotechnic production teams executing across all cities pan-India (Jaipur, Udaipur, Delhi NCR, Mumbai, Goa, etc.).
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className={`block ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>Hub Location:</strong>
                    <span className={`font-semibold ${isLightMode ? 'text-amber-800' : 'text-amber-400'}`}>Indore, Madhya Pradesh</span>
                    <span className={`block text-[11px] mt-0.5 ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>Pan-India Coverage: Jaipur, Udaipur, Delhi NCR, Mumbai, Goa, etc.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className={`block ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>Direct Phone / WhatsApp:</strong>
                    <a href="https://wa.me/917089080014" target="_blank" rel="noopener noreferrer" className={`font-mono font-bold text-amber-700 hover:underline`}>
                      +91 7089080014
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className={`block ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>Official Email:</strong>
                    <a href="mailto:Salvosfx@gmail.com" className="font-mono text-amber-700 font-semibold hover:underline">
                      Salvosfx@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className={`mt-8 pt-6 border-t ${isLightMode ? 'border-amber-100' : 'border-stone-800'}`}>
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Confidential & Secure</span>
                </div>
                <p className={`text-[11px] leading-relaxed ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
                  Your proposals and event details are strictly private between you and Jatin Rathore. We regularly execute NDA-bound VIP destination weddings.
                </p>
              </div>
            </div>

            {/* Direct Quick WhatsApp Card */}
            <div className={`p-6 rounded-3xl border text-xs ${
              isLightMode
                ? 'bg-amber-50/80 border-amber-200/90 text-stone-700'
                : 'bg-stone-900/80 border-amber-500/20 text-stone-300'
            }`}>
              <div className="text-amber-800 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Dispatch</span>
              </div>
              <p className={`leading-relaxed ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
                When you click submit, your proposal details will instantly open in your WhatsApp with Jatin Rathore for fast response and direct voice/chat coordination.
              </p>
            </div>
          </div>

          {/* Form / Confirmation Screen Right */}
          <div className="lg:col-span-8">
            {isSubmitted ? (
              <div className={`p-8 sm:p-12 rounded-3xl border text-center animate-in fade-in duration-300 shadow-xl ${
                isLightMode ? 'bg-white border-amber-300' : 'bg-stone-900/80 border-amber-500/40'
              }`}>
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-xs uppercase tracking-widest text-emerald-700 font-bold mb-2">
                  Proposal Successfully Generated
                </div>
                <h3 className={`text-2xl sm:text-3xl font-cinzel font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                  Thank You, {formData.fullName}
                </h3>
                <p className={`mt-3 text-sm max-w-lg mx-auto leading-relaxed ${isLightMode ? 'text-stone-600' : 'text-stone-300'}`}>
                  Your proposal details have been formatted and directed to <strong>Jatin Rathore</strong> (+91 7089080014) on WhatsApp.
                </p>

                {/* Reference ID card */}
                <div className={`my-6 p-4 rounded-2xl border max-w-md mx-auto flex items-center justify-between ${
                  isLightMode ? 'bg-[#faf8f5] border-amber-200' : 'bg-stone-950 border-stone-800'
                }`}>
                  <div className="text-left">
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Proposal Reference ID</span>
                    <span className="font-mono text-base font-bold text-amber-700">{referenceId}</span>
                  </div>
                  <button
                    onClick={copyRefToClipboard}
                    className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
                      isLightMode ? 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100' : 'bg-stone-900 border-stone-800 text-stone-300'
                    }`}
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedRef ? 'Copied' : 'Copy Ref'}</span>
                  </button>
                </div>

                {/* Summary Recap */}
                <div className={`p-5 rounded-2xl border text-left text-xs max-w-xl mx-auto space-y-2 mb-8 ${
                  isLightMode ? 'bg-[#faf8f5] border-amber-200/80 text-stone-700' : 'bg-stone-950/60 border-stone-800/80 text-stone-300'
                }`}>
                  <div className={`flex justify-between border-b pb-2 ${isLightMode ? 'border-amber-100' : 'border-stone-800'}`}>
                    <span className="text-stone-500">Client Name:</span>
                    <span className="font-semibold">{formData.fullName}</span>
                  </div>
                  <div className={`flex justify-between border-b pb-2 ${isLightMode ? 'border-amber-100' : 'border-stone-800'}`}>
                    <span className="text-stone-500">Phone / WhatsApp:</span>
                    <span className="font-mono font-semibold">{formData.phone}</span>
                  </div>
                  <div className={`flex justify-between border-b pb-2 ${isLightMode ? 'border-amber-100' : 'border-stone-800'}`}>
                    <span className="text-stone-500">Event & Date:</span>
                    <span className="font-semibold">{formData.eventType} &middot; {formData.eventDate || 'Season TBD'}</span>
                  </div>
                  <div className={`flex justify-between border-b pb-2 ${isLightMode ? 'border-amber-100' : 'border-stone-800'}`}>
                    <span className="text-stone-500">Destination & Venue:</span>
                    <span className="font-semibold">{formData.city} &middot; {formData.venueName || formData.venueType}</span>
                  </div>
                  <div className={`flex justify-between border-b pb-2 ${isLightMode ? 'border-amber-100' : 'border-stone-800'}`}>
                    <span className="text-stone-500">Scale / Budget:</span>
                    <span className="font-bold text-amber-700">{formData.scaleBudget}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-stone-500 block mb-1">Requested SFX Modules:</span>
                    <div className="flex flex-wrap gap-1">
                      {formData.customRequirements.map((r, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary WhatsApp Action */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 hover:scale-[1.02]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp (+91 7089080014)</span>
                    </a>

                    <button
                      onClick={copySummaryToClipboard}
                      className={`w-full sm:w-auto px-6 py-4 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        isLightMode
                          ? 'bg-white hover:bg-stone-50 border-stone-300 text-stone-800'
                          : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-100'
                      }`}
                    >
                      {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
                      <span>{copiedSummary ? 'Details Copied!' : 'Copy Proposal Text'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`mailto:Salvosfx@gmail.com?subject=Proposal%20Request%20(${referenceId})%20-%20${encodeURIComponent(formData.fullName)}&body=${encodeURIComponent(buildWhatsAppText(referenceId))}`}
                      className="text-xs text-amber-700 hover:text-amber-800 font-medium underline flex items-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Also send copy via Email to Salvosfx@gmail.com</span>
                    </a>

                    <span className="hidden sm:inline text-stone-400">&bull;</span>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-stone-500 hover:text-stone-900 font-medium underline"
                    >
                      Submit Another Proposal
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={`p-8 sm:p-10 rounded-3xl border space-y-8 ${
                isLightMode ? 'bg-white border-amber-200/90 shadow-sm' : 'bg-stone-900/60 border-stone-800'
              }`}>
                {/* Form Section 1: Contact */}
                <div>
                  <h4 className={`text-xs uppercase tracking-widest font-bold mb-4 ${
                    isLightMode ? 'text-amber-800' : 'text-amber-400'
                  }`}>
                    1. Patron & Planner Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Rathore / Wedding Planner"
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>WhatsApp / Phone (+91) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200 XXXXX"
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. weddings@luxuryhouse.com"
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Form Section 2: Celebration Details */}
                <div>
                  <h4 className={`text-xs uppercase tracking-widest font-bold mb-4 ${
                    isLightMode ? 'text-amber-800' : 'text-amber-400'
                  }`}>
                    2. Event Schedule & Destination
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Celebration Type</label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      >
                        <option>Royal Destination Wedding</option>
                        <option>Varmala & Sangeet SFX Special</option>
                        <option>Heritage Palace Pyro-Musical</option>
                        <option>Diwali / Grand Festival Spectacle</option>
                        <option>Corporate Gala & Stadium Finale</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Celebration Date</label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Destination City / Region</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Indore, Udaipur, Jaipur, Delhi NCR, Mumbai, Goa, etc."
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Venue Name (if known)</label>
                      <input
                        type="text"
                        value={formData.venueName}
                        onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                        placeholder="e.g. Jagmandir Palace / Oberoi Udaivilas"
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Venue Setting Topology</label>
                      <select
                        value={formData.venueType}
                        onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      >
                        <option>Lakefront Palace & Heritage Waters</option>
                        <option>Historic Hilltop Fort & Ramparts</option>
                        <option>5-Star Luxury Resort Lawn</option>
                        <option>Private Farmhouse & Estate Lawn</option>
                        <option>Beachfront & Coastal Waterfront</option>
                        <option>Indoor Luxury Banquet & Ballroom</option>
                        <option>Stadium & Arena</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>Expected Gathering</label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                          isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                        }`}
                      >
                        <option>Under 200 Guests (Intimate Royal)</option>
                        <option>200 - 500 Guests (Grand Wedding)</option>
                        <option>500 - 1,500 Guests (Royal Gathering)</option>
                        <option>1,500+ Guests (Civic / Mega Spectacle)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form Section 3: Budget Scope */}
                <div>
                  <h4 className={`text-xs uppercase tracking-widest font-bold mb-3 ${
                    isLightMode ? 'text-amber-800' : 'text-amber-400'
                  }`}>
                    3. Estimated Pyrotechnic Investment Scale
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      '₹3.5 - ₹7 Lakhs (Varmala & Entry SFX Setup)',
                      '₹7 - ₹12 Lakhs (Stage SFX + Sky Canopy)',
                      '₹12 - ₹18 Lakhs (Signature Grand Luxe)',
                      '₹25 - ₹45 Lakhs (Imperial Royal Heritage)',
                      '₹50 Lakhs+ (Civic / Waterfront Masterpiece)',
                    ].map((budget, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({ ...formData, scaleBudget: budget })}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                          formData.scaleBudget === budget
                            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-sm'
                            : isLightMode
                            ? 'bg-[#faf8f5] border-stone-200 text-stone-700 hover:border-amber-300'
                            : 'bg-stone-950/50 border-stone-800/80 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Section 4: Desired Modules */}
                <div>
                  <h4 className={`text-xs uppercase tracking-widest font-bold mb-3 ${
                    isLightMode ? 'text-amber-800' : 'text-amber-400'
                  }`}>
                    4. Pyrotechnic & SFX Capabilities Required
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availableRequirements.map((req, idx) => {
                      const isChecked = formData.customRequirements.includes(req);
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleToggleRequirement(req)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-amber-500 text-stone-950 border-amber-500 font-semibold shadow-sm'
                              : isLightMode
                              ? 'bg-[#faf8f5] border-stone-200 text-stone-700 hover:border-amber-300'
                              : 'bg-stone-950/50 border-stone-800/80 text-stone-400 hover:text-stone-300'
                          }`}
                        >
                          <span>{req}</span>
                          <span
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isChecked
                                ? 'bg-stone-950 text-white font-bold'
                                : 'border-stone-400'
                            }`}
                          >
                            {isChecked && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Section 5: Vision Notes */}
                <div>
                  <label className={`block text-xs mb-1.5 font-medium ${isLightMode ? 'text-stone-700' : 'text-stone-400'}`}>
                    Special Music Tracks, Firing Cues or Vision Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="e.g. We want the PERFECT SFX setup seen on @jatinrathore0353 with heavy low fog during couple entry, followed by a golden Kamuro willow canopy during garland exchange."
                    className={`w-full px-4 py-3 rounded-xl border text-xs transition-colors focus:outline-none focus:border-amber-500 ${
                      isLightMode ? 'bg-[#faf8f5] border-stone-200 text-stone-900' : 'bg-stone-950/80 border-stone-800 text-stone-100'
                    }`}
                  />
                </div>

                {/* Submit Action Button */}
                <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isLightMode ? 'border-amber-100' : 'border-stone-800'
                }`}>
                  <div className={`flex items-center gap-2 text-xs ${isLightMode ? 'text-stone-600' : 'text-stone-400'}`}>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Direct WhatsApp to Jatin Rathore (+91 7089080014)</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 hover:from-emerald-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2.5 hover:scale-[1.02] cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Submit Proposal to WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
