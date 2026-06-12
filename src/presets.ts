import { QRConfig, QRPresetTemplate } from './types';

export const DEFAULT_QR_CONFIG: QRConfig = {
  data: '',
  contentType: 'url',
  width: 350,
  height: 350,
  margin: 12,
  errorCorrectionLevel: 'Q',
  
  dotsType: 'rounded',
  dotsColor: '#0f172a', // Slate 900
  dotsColorType: 'single',
  dotsGradientType: 'linear',
  dotsGradientColor1: '#2563eb', // Blue 600
  dotsGradientColor2: '#9333ea', // Purple 600
  dotsGradientRotation: 45,
  
  cornersSquareType: 'rounded',
  cornersSquareColor: '#0f172a',
  
  cornersDotType: 'rounded',
  cornersDotColor: '#0f172a',
  
  backgroundColor: '#ffffff',
  backgroundTransparent: false,
  backgroundOpacity: 1,
  
  logoSrc: '',
  logoSize: 0.18,
  logoMargin: 4,
  logoCornerRadius: 8,
  logoOpacity: 1,
  logoClearBackground: true,
  logoBgColor: '#ffffff',
  
  frameStyle: 'none',
  frameText: 'SCAN ME',
  frameColor: '#0f172a',
  frameTextColor: '#ffffff',
  
  shadowEnabled: false,
  borderThickness: 0,
  borderRadius: 16,
  rotate: 0,
};

export const PRESET_TEMPLATES: QRPresetTemplate[] = [
  {
    id: '1',
    name: 'Classic Slate',
    description: 'Estilo padrão, elegante e profissional em tons de cinza escuro.',
    previewColor: 'linear-gradient(135deg, #0f172a, #334155)',
    config: {
      dotsType: 'rounded',
      dotsColor: '#0f172a',
      dotsColorType: 'single',
      cornersSquareType: 'rounded',
      cornersSquareColor: '#0f172a',
      cornersDotType: 'rounded',
      cornersDotColor: '#0f172a',
      backgroundColor: '#ffffff',
      backgroundTransparent: false,
    }
  },
  {
    id: '2',
    name: 'Stripe Indigo',
    description: 'Inspirado no design minimalista e moderno do ecossistema Stripe.',
    previewColor: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    config: {
      dotsType: 'classy',
      dotsColor: '#4f46e5',
      dotsColorType: 'gradient',
      dotsGradientType: 'linear',
      dotsGradientColor1: '#6366f1',
      dotsGradientColor2: '#4f46e5',
      dotsGradientRotation: 135,
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#4f46e5',
      cornersDotType: 'dot',
      cornersDotColor: '#6366f1',
      backgroundColor: '#ffffff',
      backgroundTransparent: false,
    }
  },
  {
    id: '3',
    name: 'Neon Cyber',
    description: 'Combinação rosa e ciano para visual futurista, escuro e vibrante.',
    previewColor: 'linear-gradient(135deg, #ec4899, #06b6d4)',
    config: {
      dotsType: 'dots',
      dotsColor: '#ec4899',
      dotsColorType: 'gradient',
      dotsGradientType: 'linear',
      dotsGradientColor1: '#ec4899',
      dotsGradientColor2: '#06b6d4',
      dotsGradientRotation: 90,
      cornersSquareType: 'outpoint',
      cornersSquareColor: '#06b6d4',
      cornersDotType: 'diamond',
      cornersDotColor: '#ec4899',
      backgroundColor: '#ffffff',
      backgroundTransparent: false,
    }
  },
  {
    id: '4',
    name: 'Vercel Dark',
    description: 'Design firme, geométrico e minimalista futurista com alto contraste sob fundo escuro.',
    previewColor: 'linear-gradient(135deg, #000000, #1c1917)',
    config: {
      dotsType: 'square',
      dotsColor: '#ffffff',
      dotsColorType: 'single',
      cornersSquareType: 'square',
      cornersSquareColor: '#ffffff',
      cornersDotType: 'square',
      cornersDotColor: '#ffffff',
      backgroundColor: '#000000',
      backgroundTransparent: false,
    }
  },
  {
    id: '5',
    name: 'Sunset Glow',
    description: 'Mistura quente de dourado ao vermelho, ideal para eventos e mídias.',
    previewColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    config: {
      dotsType: 'classy-rounded',
      dotsColor: '#ef4444',
      dotsColorType: 'gradient',
      dotsGradientType: 'linear',
      dotsGradientColor1: '#f59e0b',
      dotsGradientColor2: '#ef4444',
      dotsGradientRotation: 45,
      cornersSquareType: 'rounded',
      cornersSquareColor: '#ef4444',
      cornersDotType: 'dot',
      cornersDotColor: '#b91c1c',
      backgroundColor: '#ffffff',
      backgroundTransparent: false,
    }
  },
  {
    id: '6',
    name: 'Emerald Green',
    description: 'Tom corporativo verde brilhante, de altíssima legibilidade e pureza.',
    previewColor: 'linear-gradient(135deg, #10b981, #047857)',
    config: {
      dotsType: 'extra-rounded',
      dotsColor: '#047857',
      dotsColorType: 'gradient',
      dotsGradientType: 'linear',
      dotsGradientColor1: '#10b981',
      dotsGradientColor2: '#059669',
      dotsGradientRotation: 30,
      cornersSquareType: 'rounded',
      cornersSquareColor: '#047857',
      cornersDotType: 'rounded',
      cornersDotColor: '#059669',
      backgroundColor: '#ffffff',
      backgroundTransparent: false,
    }
  },
  {
    id: '7',
    name: 'Royal Gold',
    description: 'Visual dourado aristocrático sofisticado para marcas de luxo.',
    previewColor: 'linear-gradient(135deg, #fbbf24, #b45309)',
    config: {
      dotsType: 'rounded',
      dotsColor: '#b45309',
      dotsColorType: 'gradient',
      dotsGradientType: 'radial',
      dotsGradientColor1: '#fbbf24',
      dotsGradientColor2: '#78350f',
      dotsGradientRotation: 0,
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#78350f',
      cornersDotType: 'classy',
      cornersDotColor: '#b45309',
      backgroundColor: '#ffffff',
      backgroundTransparent: false,
    }
  },
  {
    id: '8',
    name: 'Midnight Purple',
    description: 'Profundo e misterioso. Roxo galáctico moderno, ideal para tech.',
    previewColor: 'linear-gradient(135deg, #7c3aed, #1e1b4b)',
    config: {
      dotsType: 'rounded',
      dotsColor: '#7c3aed',
      dotsColorType: 'gradient',
      dotsGradientType: 'linear',
      dotsGradientColor1: '#a78bfa',
      dotsGradientColor2: '#1e1b4b',
      dotsGradientRotation: 120,
      cornersSquareType: 'dot',
      cornersSquareColor: '#4c1d95',
      cornersDotType: 'rounded',
      cornersDotColor: '#a78bfa',
      backgroundColor: '#ffffff',
      backgroundTransparent: false,
    }
  }
];
