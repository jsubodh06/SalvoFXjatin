import React, { useState, useEffect } from 'react';
import {
  getSavedProposals,
  updateProposalStatus,
  exportProposalsCSV,
  SavedProposal
} from '../utils/proposalsStorage';
import {
  X,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Search,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

interface ProposalDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode: boolean;
}

export const ProposalDashboardModal: React.FC<ProposalDashboardModalProps> = ({
  isOpen,
  onClose,
  isLightMode,
}) => {
  const [proposals, setProposals] = useState<SavedProposal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProposal, setSelectedProposal] = useState<SavedProposal | null>(null);

  useEffect(() => {
    if (isOpen) {
      setProposals(getSavedProposals());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: SavedProposal['status']) => {
    const updated = updateProposalStatus(id, newStatus);
    setProposals(updated);
    if (selectedProposal && selectedProposal.id === id) {
      setSelectedProposal({ ...selectedProposal, status: newStatus });
    }
  };

  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.venueName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getWhatsAppClientLink = (proposal: SavedProposal) => {
    const cleanPhone = proposal.phone.replace(/[^0-9]/g, '');
    const phoneTarget = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
    const text = `Namaste ${proposal.fullName}! This is Jatin Rathore from Salvo FX Pyrotechnics regarding your wedding inquiry (Ref: ${proposal.referenceId}) for ${proposal.city} on ${proposal.eventDate || 'your upcoming date'}. I have reviewed your requested SFX requirements and would love to share our customized technical proposal.`;
    return `https://wa.me/${phoneTarget}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`relative w-full max-w-6xl max-h-[92vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden ${
        isLightMode ? 'bg-[#faf8f5] border-amber-300' : 'bg-[#0a0c14] border-stone-800'
      }`}>
        {/* Modal Header */}
        <div className={`px-6 sm:px-8 py-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isLightMode ? 'bg-white border-amber-200' : 'bg-stone-950 border-stone-800'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                Salvo FX &middot; Jatin Rathore Lead Desk
              </span>
            </div>
            <h2 className={`text-2xl font-cinzel font-bold mt-1 ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
              Incoming Proposals & Client Enquiries
            </h2>
            <p className={`text-xs mt-0.5 ${isLightMode ? 'text-stone-500' : 'text-stone-400'}`}>
              All enquiries submitted on this website are permanently logged here, sent to your WhatsApp (+91 7089080014), and Salvosfx@gmail.com.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => exportProposalsCSV(proposals)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              title="Download all proposals as CSV for Excel / Google Sheets"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border text-stone-400 hover:text-stone-900 transition-colors ${
                isLightMode ? 'hover:bg-stone-100 border-stone-200' : 'hover:bg-stone-800 border-stone-800'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className={`px-6 sm:px-8 py-4 border-b flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isLightMode ? 'bg-[#f4efe6] border-amber-200/60' : 'bg-stone-900/60 border-stone-800/80'
        }`}>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client, city, or reference..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:border-amber-500 ${
                isLightMode ? 'bg-white border-stone-200 text-stone-900' : 'bg-stone-950 border-stone-800 text-stone-100'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'New Inquiry', 'In Discussion', 'Confirmed & Booked'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  statusFilter === status
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : isLightMode
                    ? 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {status === 'all' ? `All (${proposals.length})` : status}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Split: List & Selected Proposal Detail */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Proposals List Column */}
          <div className={`lg:col-span-6 overflow-y-auto p-4 sm:p-6 space-y-3.5 border-r ${
            isLightMode ? 'border-amber-200/60' : 'border-stone-800/80'
          }`}>
            {filteredProposals.length === 0 ? (
              <div className="text-center py-12 text-xs text-stone-500">
                No proposals match your search. Submit a test proposal via the form to see it appear here instantly!
              </div>
            ) : (
              filteredProposals.map((prop) => {
                const isSelected = selectedProposal?.id === prop.id;
                return (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedProposal(prop)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? isLightMode
                          ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                          : 'bg-stone-900 border-amber-500 ring-2 ring-amber-400/20'
                        : isLightMode
                        ? 'bg-white/80 border-stone-200 hover:border-amber-300 shadow-sm'
                        : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-bold text-amber-700">
                        {prop.referenceId}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          prop.status === 'Confirmed & Booked'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : prop.status === 'In Discussion'
                            ? 'bg-sky-100 text-sky-800 border border-sky-300'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {prop.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-cinzel font-bold ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                        {prop.fullName}
                      </h4>
                      <span className="text-[11px] text-stone-500">{prop.createdAt}</span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-stone-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>{prop.city}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-amber-600" />
                        <span>{prop.eventDate || 'Date Pending'}</span>
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-800">{prop.scaleBudget}</span>
                      <span className="text-[11px] text-stone-500 truncate max-w-[150px]">{prop.eventType}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Selected Proposal Detail View */}
          <div className="lg:col-span-6 p-6 sm:p-8 overflow-y-auto">
            {selectedProposal ? (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Header Details */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-amber-700">
                      Proposal Dossier &middot; {selectedProposal.referenceId}
                    </span>
                    <h3 className={`text-2xl font-cinzel font-bold mt-1 ${isLightMode ? 'text-stone-900' : 'text-stone-100'}`}>
                      {selectedProposal.fullName}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">Submitted: {selectedProposal.createdAt}</p>
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-500 mb-1">
                      Status
                    </label>
                    <select
                      value={selectedProposal.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedProposal.id,
                          e.target.value as SavedProposal['status']
                        )
                      }
                      className={`text-xs px-3 py-1.5 rounded-xl border font-bold focus:outline-none ${
                        isLightMode
                          ? 'bg-white border-amber-300 text-stone-800'
                          : 'bg-stone-900 border-stone-700 text-stone-100'
                      }`}
                    >
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Confirmed & Booked">Confirmed & Booked</option>
                    </select>
                  </div>
                </div>

                {/* Direct Action Bridge (WhatsApp, Call, Email) */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <a
                    href={getWhatsAppClientLink(selectedProposal)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex flex-col items-center justify-center gap-1 shadow-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Client</span>
                  </a>

                  <a
                    href={`tel:${selectedProposal.phone}`}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      isLightMode ? 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50' : 'bg-stone-900 border-stone-800 text-stone-200'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-amber-600" />
                    <span>Call Phone</span>
                  </a>

                  <a
                    href={`mailto:${selectedProposal.email}?subject=Salvo%20FX%20Pyrotechnic%20Proposal%20(Ref:%20${selectedProposal.referenceId})`}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                      isLightMode ? 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50' : 'bg-stone-900 border-stone-800 text-stone-200'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span>Send Email</span>
                  </a>
                </div>

                {/* Event Topology & Venue Specs */}
                <div className={`p-4 rounded-2xl border space-y-2.5 text-xs ${
                  isLightMode ? 'bg-white border-amber-200/80 text-stone-700' : 'bg-stone-900/60 border-stone-800 text-stone-300'
                }`}>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-stone-500">Event Type:</span>
                    <strong className="text-stone-900">{selectedProposal.eventType}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-stone-500">Event Date:</span>
                    <strong className="text-stone-900">{selectedProposal.eventDate || 'Pending Final Confirmation'}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-stone-500">City / Destination:</span>
                    <strong className="text-stone-900">{selectedProposal.city}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-stone-500">Venue Name:</span>
                    <strong className="text-stone-900">{selectedProposal.venueName || 'To Be Finalized'}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-stone-500">Venue Topology:</span>
                    <strong className="text-stone-900">{selectedProposal.venueType}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-stone-500">Budget Scale:</span>
                    <strong className="text-amber-800">{selectedProposal.scaleBudget}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Client Phone:</span>
                    <strong className="font-mono">{selectedProposal.phone}</strong>
                  </div>
                </div>

                {/* Requested SFX Modules */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-amber-800 mb-2">
                    Requested Pyrotechnic & SFX Modules
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProposal.customRequirements.map((req, i) => (
                      <span
                        key={i}
                        className={`text-xs px-3 py-1 rounded-lg font-medium ${
                          isLightMode ? 'bg-amber-100 text-amber-900 border border-amber-300/80' : 'bg-stone-800 text-stone-200'
                        }`}
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Client Notes */}
                {selectedProposal.additionalNotes && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-bold text-amber-800 mb-1.5">
                      Client Special Vision / Notes
                    </h4>
                    <p className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      isLightMode ? 'bg-white border-stone-200 text-stone-800' : 'bg-stone-950 border-stone-800 text-stone-300'
                    }`}>
                      {selectedProposal.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-500 text-xs">
                <Layers className="w-10 h-10 text-stone-300 mb-3" />
                <p className="font-bold text-sm text-stone-700">Select any proposal from the list</p>
                <p className="mt-1 max-w-xs">
                  Click on any client inquiry on the left to see full details, contact buttons, and change booking status.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
