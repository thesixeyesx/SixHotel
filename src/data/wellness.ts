import { SpaTreatment } from '../types';

export const SPA_TREATMENTS: SpaTreatment[] = [
  {
    id: 'soma-vishrama',
    name: 'Vishrama (Deep Muscular Rejuvenation)',
    subtitle: 'Signature Full Body Royal Therapy',
    durationMinutes: 90,
    priceINR: 12500,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: 'A deeply restorative massage using warm Brahmi and Ashwagandha infused sesame oils with rhythmic Swedish strokes and acupressure points to release stored tension.',
    benefits: ['Releases Chronic Joint Tightness', 'Harmonizes Vata Dosha', 'Restores Deep REM Sleep Quality', 'Warming Herbal Compress Finish'],
  },
  {
    id: 'soma-shringar',
    name: 'Shringar (The Royal Imperial Ubtan & Milk Bath)',
    subtitle: 'Ancient Queen’s Radiance Ritual',
    durationMinutes: 120,
    priceINR: 16800,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Begins with an exfoliating scrub of freshly ground sandalwood, turmeric, almonds, and rose petals, followed by a warm aromatic milk and saffron bath in a marble tub.',
    benefits: ['Illuminates Dull Skin with Pure Glow', 'Natural Detoxification & Cell Renewal', 'Aromatherapeutic Rose & Sandalwood Soothing', 'Deep Hydration with Fresh Coconut Milk'],
  },
  {
    id: 'soma-sushupti',
    name: 'Sushupti (Vedic Dream & Sound Meditation)',
    subtitle: 'Tibetan Bowls & Meditative Shirodhara',
    durationMinutes: 90,
    priceINR: 14000,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle continuous stream of medicated warm herbal oil poured onto the third eye chakra (Shirodhara), accompanied by resonant vibrational singing bowls.',
    benefits: ['Calms Hyperactive Mental Fatigue', 'Alleviates Migraines & Insomnia', 'Enhances Emotional Equilibrium', 'Sacred Third-Eye Chakra Awakening'],
  }
];
