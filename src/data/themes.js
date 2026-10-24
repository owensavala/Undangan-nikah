export const THEME_PRESETS = [
  {
    id: 'charcoal-editorial',
    name: 'Van & Rama Minimalist Charcoal',
    description: 'Hitam arang elegan (#2B2B2B) dipadu kartu putih bersih sesuai template referensi.',
    previewColors: ['#2B2B2B', '#FFFFFF', '#666666'],
    variables: {
      '--theme-bg': '#2B2B2B',
      '--theme-card': '#FFFFFF',
      '--color-gold-50': '#FAFAFA',
      '--color-gold-100': '#F5F5F5',
      '--color-gold-200': '#E5E5E5',
      '--color-gold-300': '#D4D4D4',
      '--color-gold-400': '#A3A3A3',
      '--color-gold-500': '#737373',
      '--color-gold-600': '#525252',
      '--color-gold-700': '#404040',
      '--color-gold-800': '#2B2B2B',
      '--color-gold-900': '#171717',
    }
  },
  {
    id: 'emerald-gold',
    name: 'Royal Emerald & Gold',
    description: 'Nuansa hijau zamrud mewah dipadu aksen emas kerajaan.',
    previewColors: ['#09110e', '#c5a059', '#f1e6d0'],
    variables: {
      '--theme-bg': '#09110e',
      '--theme-card': '#0d1613',
      '--color-gold-50': '#FDFBF7',
      '--color-gold-100': '#F9F5EC',
      '--color-gold-200': '#F1E6D0',
      '--color-gold-300': '#E6D3AF',
      '--color-gold-400': '#D8BC86',
      '--color-gold-500': '#C5A059',
      '--color-gold-600': '#AA823E',
      '--color-gold-700': '#8A642B',
      '--color-gold-800': '#6E4E24',
      '--color-gold-900': '#5A3F1F',
    }
  },
  {
    id: 'midnight-navy',
    name: 'Midnight Navy & Rose Gold',
    description: 'Biru navy pekat elegan dengan kilau rose gold yang manis dan romantis.',
    previewColors: ['#070b14', '#d49a89', '#f7e5df'],
    variables: {
      '--theme-bg': '#070b14',
      '--theme-card': '#0e1422',
      '--color-gold-50': '#FDF9F8',
      '--color-gold-100': '#FAF0ED',
      '--color-gold-200': '#F5DFD8',
      '--color-gold-300': '#EAC2B7',
      '--color-gold-400': '#DFA697',
      '--color-gold-500': '#D48F7E',
      '--color-gold-600': '#BA7362',
      '--color-gold-700': '#995646',
      '--color-gold-800': '#783F32',
      '--color-gold-900': '#5E2F24',
    }
  },
  {
    id: 'burgundy-gold',
    name: 'Sultan Burgundy & Royal Gold',
    description: 'Merah marun anggur tua bangsawan dengan aksen emas yang berkarakter kuat.',
    previewColors: ['#140507', '#e5b25d', '#faedd2'],
    variables: {
      '--theme-bg': '#140507',
      '--theme-card': '#1c0a0d',
      '--color-gold-50': '#FDFBF7',
      '--color-gold-100': '#FBF3E4',
      '--color-gold-200': '#F7E5C3',
      '--color-gold-300': '#F0CF96',
      '--color-gold-400': '#E8BC70',
      '--color-gold-500': '#D9A44B',
      '--color-gold-600': '#BC8833',
      '--color-gold-700': '#986B22',
      '--color-gold-800': '#765118',
      '--color-gold-900': '#5C3E12',
    }
  },
  {
    id: 'champagne-cream',
    name: 'Champagne Gold & Warm Cream',
    description: 'Sentuhan warna sampanye lembut dan hangat bergaya timeless wedding.',
    previewColors: ['#12100d', '#d4af37', '#faf7f2'],
    variables: {
      '--theme-bg': '#12100d',
      '--theme-card': '#1a1713',
      '--color-gold-50': '#FCFAF6',
      '--color-gold-100': '#F7F3EA',
      '--color-gold-200': '#EFE4CD',
      '--color-gold-300': '#E3D0A8',
      '--color-gold-400': '#D5BC82',
      '--color-gold-500': '#C4A45B',
      '--color-gold-600': '#AA893E',
      '--color-gold-700': '#8A6A2C',
      '--color-gold-800': '#6E5223',
      '--color-gold-900': '#57401C',
    }
  },
  {
    id: 'sage-gold',
    name: 'Botanical Sage & Warm Gold',
    description: 'Hijau sage estetik bernuansa alam lembut dipadu sentuhan emas mewah.',
    previewColors: ['#0a120c', '#c9a96e', '#e8eedb'],
    variables: {
      '--theme-bg': '#0a120c',
      '--theme-card': '#111c14',
      '--color-gold-50': '#FAFBF7',
      '--color-gold-100': '#F2F5EB',
      '--color-gold-200': '#E4ECD5',
      '--color-gold-300': '#D0DEBA',
      '--color-gold-400': '#BDCA9F',
      '--color-gold-500': '#B4A066',
      '--color-gold-600': '#98834B',
      '--color-gold-700': '#7B6735',
      '--color-gold-800': '#615029',
      '--color-gold-900': '#4C3E20',
    }
  },
  {
    id: 'onyx-silver',
    name: 'Onyx Noir & Platinum Silver',
    description: 'Hitam pekat eksklusif dipadu perak platinum modern dan berkilau.',
    previewColors: ['#050505', '#d1d5db', '#f9fafb'],
    variables: {
      '--theme-bg': '#050505',
      '--theme-card': '#141414',
      '--color-gold-50': '#FAFAFA',
      '--color-gold-100': '#F4F4F5',
      '--color-gold-200': '#E4E4E7',
      '--color-gold-300': '#D4D4D8',
      '--color-gold-400': '#A1A1AA',
      '--color-gold-500': '#9CA3AF',
      '--color-gold-600': '#6B7280',
      '--color-gold-700': '#4B5563',
      '--color-gold-800': '#374151',
      '--color-gold-900': '#1F2937',
    }
  }
];

export function getThemeVariables(presetId = 'emerald-gold') {
  const found = THEME_PRESETS.find((p) => p.id === presetId);
  return found ? found.variables : THEME_PRESETS[0].variables;
}
