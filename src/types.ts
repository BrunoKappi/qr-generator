/**
 * Types defining QR Code parameters, history items, templates, and subpages
 */

export type QRContentType = 'url' | 'text' | 'phone' | 'email' | 'wifi' | 'sms';

export type QRDotsType = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type QREyeFrameType = 'square' | 'dot' | 'rounded' | 'extra-rounded' | 'outpoint' | 'classy';
export type QREyeBallType = 'square' | 'dot' | 'rounded' | 'heart' | 'diamond' | 'classy';

export type QRResolution = 512 | 1024 | 2048 | 4096;

export interface QRConfig {
  id?: string;
  data: string;
  contentType: QRContentType;
  
  // Basic Settings
  width: number;
  height: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  
  // Dots options
  dotsType: QRDotsType;
  dotsColor: string;
  dotsColorType: 'single' | 'gradient';
  dotsGradientType: 'linear' | 'radial';
  dotsGradientColor1: string;
  dotsGradientColor2: string;
  dotsGradientRotation: number;
  
  // Corners Frame Options
  cornersSquareType: QREyeFrameType;
  cornersSquareColor: string;
  
  // Corners Pupil Options
  cornersDotType: QREyeBallType;
  cornersDotColor: string;
  
  // Background Options
  backgroundColor: string;
  backgroundTransparent: boolean;
  backgroundOpacity: number;
  
  // Logo Options
  logoSrc: string; // Base64 or URL
  logoSize: number; // 0.05 to 0.4
  logoMargin: number; // margin around logo
  logoCornerRadius: number; // border radius for logo
  logoOpacity: number;
  logoClearBackground: boolean; // Clear background behind logo
  logoBgColor: string; // Custom background color under logo
  
  // Frame/Label styles
  frameStyle: 'none' | 'scan_me' | 'open_link' | 'website' | 'instagram' | 'whatsapp' | 'minimal' | 'corporate' | 'tech' | 'creative';
  frameText: string;
  frameColor: string;
  frameTextColor: string;
  
  // Effects
  shadowEnabled: boolean;
  borderThickness: number;
  borderRadius: number;
  rotate: number; // 0, 90, 180, 270
}

export interface QRHistoryItem {
  id: string;
  name: string;
  config: QRConfig;
  createdAt: string;
  isFavorite: boolean;
  useCount: number;
}

export interface QRPresetTemplate {
  id: string;
  name: string;
  description: string;
  config: Partial<QRConfig>;
  previewColor: string; // gradients or hex to draw a rounded badge
}

export type SubPageType = 'privacy' | 'cookies' | 'terms' | 'legal' | 'responsibility' | 'developer' | null;
