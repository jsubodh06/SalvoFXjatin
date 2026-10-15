import { EnquiryData } from '../types';

export interface SavedProposal extends EnquiryData {
  id: string;
  referenceId: string;
  createdAt: string;
  status: 'New Inquiry' | 'In Discussion' | 'Proposal Sent' | 'Confirmed & Booked';
  notesAdmin?: string;
}

const STORAGE_KEY = 'salvo_fx_private_proposals_v2';

export const getSavedProposals = (): SavedProposal[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveNewProposal = (data: EnquiryData, referenceId: string): SavedProposal => {
  const current = getSavedProposals();
  const newProposal: SavedProposal = {
    ...data,
    id: `prop-${Date.now()}`,
    referenceId,
    createdAt: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: 'New Inquiry'
  };

  const updated = [newProposal, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // safe fallback
  }

  return newProposal;
};

export const updateProposalStatus = (id: string, status: SavedProposal['status']): SavedProposal[] => {
  const current = getSavedProposals();
  const updated = current.map((p) => (p.id === id ? { ...p, status } : p));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // safe fallback
  }
  return updated;
};

export const deleteProposal = (id: string): SavedProposal[] => {
  const current = getSavedProposals();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // safe fallback
  }
  return updated;
};

export const exportProposalsCSV = (proposals: SavedProposal[]) => {
  const headers = [
    'Reference ID',
    'Date Submitted',
    'Full Name',
    'Phone',
    'Email',
    'Event Type',
    'Event Date',
    'City',
    'Venue Name',
    'Venue Type',
    'Guest Count',
    'Budget Scale',
    'Custom Requirements',
    'Additional Notes',
    'Status'
  ];

  const rows = proposals.map((p) => [
    `"${p.referenceId}"`,
    `"${p.createdAt}"`,
    `"${p.fullName.replace(/"/g, '""')}"`,
    `"${p.phone.replace(/"/g, '""')}"`,
    `"${p.email.replace(/"/g, '""')}"`,
    `"${p.eventType.replace(/"/g, '""')}"`,
    `"${p.eventDate || ''}"`,
    `"${p.city.replace(/"/g, '""')}"`,
    `"${(p.venueName || '').replace(/"/g, '""')}"`,
    `"${p.venueType.replace(/"/g, '""')}"`,
    `"${p.guestCount.replace(/"/g, '""')}"`,
    `"${p.scaleBudget.replace(/"/g, '""')}"`,
    `"${p.customRequirements.join('; ').replace(/"/g, '""')}"`,
    `"${(p.additionalNotes || '').replace(/"/g, '""')}"`,
    `"${p.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `SalvoFX_Proposals_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
