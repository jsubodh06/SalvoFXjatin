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

export const YOUTUBE_CHANNEL_INFO = {
  name: 'Jatin Rathore | Salvo FX',
  handle: '@jatinrathore0353',
  channelUrl: 'https://youtube.com/@jatinrathore0353?si=VsUcElibpf6Qawbw',
  description: 'Official YouTube channel of Jatin Rathore & Salvo FX. Showcasing premium wedding SFX setups, cold pyro sparkulars, heavy low fog, and cinematic pyrotechnics across India.',
};

// Exclusively Jatin Rathore's authentic wedding SFX & pyrotechnic productions
export const JATIN_RATHORE_VIDEOS: ChannelVideo[] = [
  {
    id: 'sfx-perfect-setup',
    title: 'PERFECT SFX SETUP FOR YOUR WEDDING',
    category: 'wedding-sfx',
    duration: 'Wedding SFX',
    viewsBadge: 'Official Upload',
    url: 'https://youtube.com/@jatinrathore0353?si=VsUcElibpf6Qawbw',
    description: 'The signature wedding special effects setup by Jatin Rathore & Salvo FX. Featuring DMX-controlled Sparkular cold fireworks, ultrasonic dry-ice low fog ("Dancing on a Cloud"), cryogenic CO2 stage blasts, and safe indoor stage pyrotechnics.',
    highlights: ['Zero-Heat Sparkulars', 'Ultrasonic Low Fog Cloud', 'Cryogenic CO2 Jets', '100% Indoor Ballroom Safe'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'single-walk-entry',
    title: 'A lifetime of memories started with this single walk',
    category: 'bridal-entry',
    duration: 'Bridal Walk',
    viewsBadge: 'Official Upload',
    url: 'https://youtube.com/@jatinrathore0353?si=VsUcElibpf6Qawbw',
    description: 'An unforgettable bridal entry walk accompanied by cascading cold spark waterfalls and golden stage lighting. Designed by Jatin Rathore to turn the couple\'s first walk into a cinematic memory to last a lifetime.',
    highlights: ['Bridal Walk Cold Spark Pathway', 'Synchronized Musical Cue', 'Zero Smoke & Zero Burn', 'Heritage Venue Safe'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'royal-varmala-halo',
    title: 'Royal Varmala Climax & Cold Pyro Cascade',
    category: 'varmala',
    duration: 'Varmala Moment',
    viewsBadge: 'Signature Production',
    url: 'https://youtube.com/@jatinrathore0353?si=VsUcElibpf6Qawbw',
    description: 'The definitive garland exchange moment. Triggered with microsecond precision when the bride and groom exchange floral malas, surrounded by a dramatic 360-degree cold spark halo and golden stage cascade.',
    highlights: ['Garland Exchange Microsecond Trigger', '360° Cold Pyro Halo', 'Sandstone Preservation Safe', 'Bespoke Music Timing'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sangeet-stage-fx',
    title: 'High-Octane Sangeet: Stage Sparkular Matrix & CO2 Jets',
    category: 'sangeet',
    duration: 'Sangeet Stage',
    viewsBadge: 'Concert SFX',
    url: 'https://youtube.com/@jatinrathore0353?si=VsUcElibpf6Qawbw',
    description: 'Concert-grade stage special effects for high-energy Sangeet performances. 16+ computerized Sparkular units, rapid cryo CO2 blasts, and heavy fog timed to Bollywood music drops with zero smoke smell.',
    highlights: ['16+ Sparkular Units', '30ms Instant DMX Response', 'Zero Sulfur Odor', 'High-Energy Dance Drops'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  },
];
