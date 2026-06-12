import { QRContentType } from '../types';

export interface QRValidationResult {
  currentLength: number;
  maxLength: number;
  occupationPercentage: number;
  isNearingLimit: boolean;
  isExceeded: boolean;
  status: 'success' | 'warning' | 'error';
}

export class QRCodeService {
  /**
   * Intelligently autodetects the content type of any string input
   * to automatically map the QR code structure offline.
   */
  static detectContentType(input: string): QRContentType {
    const trimmed = input.trim();
    if (!trimmed) return 'url';

    // 1. URL pattern
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/i;
    if (urlRegex.test(trimmed) || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return 'url';
    }

    // 2. Wi-Fi pattern
    if (trimmed.toUpperCase().startsWith('WIFI:')) {
      return 'wifi';
    }

    // 3. Email patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (trimmed.toLowerCase().startsWith('mailto:') || emailRegex.test(trimmed)) {
      return 'email';
    }

    // 4. Phone number patterns
    const phoneRegex = /^(\+?\d{1,4}[\s-]?)?\(?\d{2,4}\)?[\s-]?\d{3,5}[\s-]?\d{4}$/;
    if (trimmed.toLowerCase().startsWith('tel:') || (phoneRegex.test(trimmed) && trimmed.replace(/[^\d]/g, '').length >= 8)) {
      return 'phone';
    }

    // 5. SMS patterns
    if (trimmed.toLowerCase().startsWith('sms:') || trimmed.toLowerCase().startsWith('smsto:')) {
      return 'sms';
    }

    // Default to plain text
    return 'text';
  }

  /**
   * Calculates the QR Code storage capacity metrics based on the selected error correction level.
   * Leveraged as the single source of truth for validation.
   */
  static getCapacityMetrics(data: string, errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M'): QRValidationResult {
    const currentLength = data ? data.length : 0;
    
    // Limits derived from physical QR Code specifications for standard binary/byte content,
    // tuned slightly lower than absolute limits for enhanced mobile scanner compatibility (safe margin).
    let maxLength = 2000; // Base reference
    switch (errorCorrectionLevel) {
      case 'L': // Low - ~7% correction, highest capacity
        maxLength = 2200;
        break;
      case 'M': // Medium - ~15% correction
        maxLength = 1800;
        break;
      case 'Q': // High - ~25% correction
        maxLength = 1200;
        break;
      case 'H': // Max - ~30% correction, lowest capacity
        maxLength = 850;
        break;
    }

    const occupationPercentage = Math.round((currentLength / maxLength) * 100);
    const isNearingLimit = currentLength >= maxLength * 0.8; // Warn at 80%
    const isExceeded = currentLength > maxLength;

    let status: 'success' | 'warning' | 'error' = 'success';
    if (isExceeded) {
      status = 'error';
    } else if (isNearingLimit) {
      status = 'warning';
    }

    return {
      currentLength,
      maxLength,
      occupationPercentage: Math.min(occupationPercentage, 100),
      isNearingLimit,
      isExceeded,
      status,
    };
  }

  /**
   * Performs quick validation of capacity.
   */
  static validateCapacity(data: string, errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H' = 'M'): { isValid: boolean; errorKey?: string } {
    const { isExceeded } = this.getCapacityMetrics(data, errorCorrectionLevel);
    if (isExceeded) {
      return { isValid: false, errorKey: 'input.capacityLimitExceeded' };
    }
    return { isValid: true };
  }
}
export default QRCodeService;
