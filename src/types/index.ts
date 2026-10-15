export interface ChannelVideo {
  id: string;
  title: string;
  category: 'wedding-sfx' | 'varmala' | 'bridal-entry' | 'sangeet';
  duration: string;
  viewsBadge: string;
  url: string;
  description: string;
  highlights: string[];
  thumbnailUrl: string;
}

export interface PortfolioDisplay {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  date: string;
  duration: string;
  shellsFired: number;
  firingTech: string;
  image: string;
  description: string;
  accentColor: string;
  tags: string[];
}

export interface PyroShellOption {
  id: string;
  name: string;
  hindiName?: string;
  category: 'aerial' | 'kamuro' | 'stage' | 'fountain';
  color: string;
  colorName: string;
  sound: 'deep' | 'crackle' | 'whistle' | 'silent';
  description: string;
  idealFor: string;
}

export interface EnquiryData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  city: string;
  venueName: string;
  venueType: string;
  guestCount: string;
  scaleBudget: string;
  customRequirements: string[];
  additionalNotes: string;
}
