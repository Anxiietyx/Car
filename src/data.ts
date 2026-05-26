import { DetailPackage, AddOnOption } from './types';

export const PACKAGES: DetailPackage[] = [
  {
    id: 'coating-safe-wash',
    name: 'Coating-Safe Maintenance Wash',
    tagline: 'Premium pH-neutral wash formulated specifically to maintain ceramic coatings and sealants.',
    prices: {
      small: 20,
      medium: 22,
      suv: 24
    },
    duration: '45 - 60 Minutes',
    benefits: [
      'Pre-wash active snow foam to safely encapsulate dirt grit',
      'Ultra-soft premium microfiber two-bucket contact wash',
      'Thorough wheel barrel, face, and tire sidewall cleanse',
      'Gentle air-blower and soft plush drying towel service',
      'Pristine exterior window glass diagnostic wipe down',
      'Exotic pure finish that will not leaves residue or degrade existing waxes'
    ],
    products: ['CarPro Reset'],
    specs: {
      mainProduct: 'CarPro Reset pH-Neutral Maintenance Shampoo',
      washType: 'Snow Foam Melt + Multi-Bucket Contact Wash',
      phLevel: '7.0 Perfect pH Neutral',
      treatmentScope: '100% Safe Exterior Surface De-gritting'
    },
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'signature-wash',
    name: 'Signature Wash & Protect',
    tagline: 'Intensive mechanical & chemical decontamination with durable hydrophobic paint protection.',
    prices: {
      small: 60,
      medium: 80,
      suv: 110
    },
    duration: '2 - 3 Hours',
    benefits: [
      'Advanced multi-stage pre-wash and high-density snow foam spray',
      'Iron fallout removal and mechanical clay bar treatment for silky clearcoat',
      'Deep chemical tire and wheel caliper cleaning & brake dust removal',
      'Premium liquid silica hybrid sealant applied for deep gloss and hydrophobic water-beading',
      'Meticulous door jamb, trunk shut, and fuel door detailing and conditioning',
      'Tire coating application for premium satin aesthetic look'
    ],
    products: ['Bilt Hamber', 'CarPro', 'Koch Chemie', 'Turtle Wax'],
    specs: {
      mainProduct: 'Bilt Hamber (Decon) / CarPro / Koch Chemie / Turtle Wax (Seal)',
      washType: 'Full Decontamination + Gloss Protective Seal',
      phLevel: 'Multi-ph Dynamic Cleanse',
      treatmentScope: 'Deep Exterior Correction Safeguard'
    },
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'basic-interior',
    name: 'Basic Interior Cleaning',
    tagline: 'Meticulous cabin sanitization, thorough fiber vacuuming, and UV protector dressings.',
    prices: {
      small: 30,
      medium: 45,
      suv: 60
    },
    duration: '1 - 1.5 Hours',
    benefits: [
      'High-power double vacuum of all carpeted spaces, seats, mats, and trunk',
      'Intensified wipe down of dash, steering wheel, vents, consoles & displays',
      'Gentle leather brush or fabric upholstery clean to remove oils & dust',
      'Active matte finish coating on plastic panels to screen out ultraviolet rays',
      'Interior glass treatment for absolute zero residue vision strength',
      'Scent treatment to neutralize odor particles and leave a clean cabin atmosphere'
    ],
    products: ['Koch Chemie GS', 'CarPro Perl'],
    specs: {
      mainProduct: 'Koch Chemie GS (Mehrzweckreiniger) + CarPro Perl (UV Protection)',
      washType: 'Clean Cabin Steam Sanitization + Leather/Vinyl Satin Feed',
      phLevel: 'Alkaline Dirt Remover & pH-Durable Dressing',
      treatmentScope: 'Full Interior Cabin Restorative Care'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'engine-detailing',
    name: 'Engine Bay Detailing',
    tagline: 'High-precision grease dissolving, localized steam cleansing, and heat-resistant dressings.',
    prices: {
      small: 60,
      medium: 60,
      suv: 60
    },
    duration: '1 Hour',
    benefits: [
      'Gentle engine compartment brush-agitated grease dissolution',
      'Low-moisture, highly pressurized hot vapor steam dirt clearance',
      'Pneumatic compression blowout of specialized electrical terminals',
      'Advanced satin dressing to protect plastic, hose couplings & carbon structures',
      'Failsafe protection lines deployed to screen sensitive intake and alternator hubs'
    ],
    products: ['Koch Chemie GS', 'CarPro Perl'],
    specs: {
      mainProduct: 'Koch Chemie GS (Degrease) + CarPro Perl (Silicone-free Protection)',
      washType: 'Brush-Agitation Steam Cleanse & Compressed Air Prep',
      phLevel: 'Industrial Alkaline Dispersion',
      treatmentScope: 'Engine Bay Compartment Re-conditioning'
    },
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop'
  }
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'windshield-watermark',
    name: 'Windshield Glass Watermark Removal & Sealant',
    price: 50,
    description: 'Precision compound polish removes acid-rain scales, followed by a hydrophobic glass membrane coat.'
  },
  {
    id: 'headlight-cleanup',
    name: 'Precision Headlight Restoration & Coating',
    price: 80,
    description: 'Yellow oxidized plastic layers wet-sanded, dual-stage polished, and UV-sealed with synthetic glass serum.'
  },
  {
    id: 'leather-deep-nourish',
    name: 'Deep Nourishing Treatment for Leather Carpets',
    price: 40,
    description: 'Porous premium cowhides cleaned and sealed using a specialized non-greasy satin sealant.'
  }
];
