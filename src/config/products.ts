export type ModelKind = 'headphones' | 'watch' | 'speaker' | 'chair';

export interface ProductStat {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: string;
  blurb: string;
  model: ModelKind;
  accent: string;
  colors: string[];
  stats: ProductStat[];
}

/*
 * TEMPLATE: to onboard a new client, duplicate an entry below and swap
 * name / copy / price / colors. To plug a real AI-generated model later,
 * add a `modelUrl` field and render it with <GLTFModel url={...}/> instead
 * of the procedural model mapped by `model`.
 */
export const products: Product[] = [
  {
    id: 'aura-one',
    name: 'Aura One',
    tagline: 'Adaptive wireless headphones',
    price: '$349',
    blurb:
      'Memory-foam silence, 40-hour battery and a soundstage tuned for motion. Spin it, flip it, make it yours.',
    model: 'headphones',
    accent: '#a3e635',
    colors: ['#a3e635', '#22d3ee', '#e879f9', '#f4f4f6'],
    stats: [
      { label: 'Battery', value: '40h' },
      { label: 'Drivers', value: '50mm' },
      { label: 'ANC', value: '-42dB' },
    ],
  },
  {
    id: 'pulse-s',
    name: 'Pulse S',
    tagline: 'Titanium smartwatch',
    price: '$499',
    blurb:
      'A sapphire face on aerospace titanium. Health sensors, 14-day power and straps for every mood.',
    model: 'watch',
    accent: '#22d3ee',
    colors: ['#22d3ee', '#f97316', '#e879f9', '#f4f4f6'],
    stats: [
      { label: 'Battery', value: '14d' },
      { label: 'Case', value: '44mm' },
      { label: 'Rating', value: '5ATM' },
    ],
  },
  {
    id: 'orbit-boom',
    name: 'Orbit Boom',
    tagline: '360° room-filling speaker',
    price: '$279',
    blurb:
      'One speaker, every direction. An ambient light ring that breathes with the bass and a stage that never sits still.',
    model: 'speaker',
    accent: '#e879f9',
    colors: ['#e879f9', '#a3e635', '#22d3ee', '#f4f4f6'],
    stats: [
      { label: 'Output', value: '60W' },
      { label: 'Playtime', value: '24h' },
      { label: 'Pairing', value: 'Stereo' },
    ],
  },
  {
    id: 'drift-lounge',
    name: 'Drift Lounge',
    tagline: 'Sculptural lounge chair',
    price: '$1,199',
    blurb:
      'Steam-bent presence for slow mornings. A gallery silhouette engineered for all-day comfort.',
    model: 'chair',
    accent: '#f97316',
    colors: ['#f97316', '#a3e635', '#e879f9', '#f4f4f6'],
    stats: [
      { label: 'Frame', value: 'Oak' },
      { label: 'Load', value: '150kg' },
      { label: 'Finish', value: 'Matte' },
    ],
  },
];
