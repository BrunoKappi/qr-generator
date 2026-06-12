import { QRConfig, QRHistoryItem } from '../types';

export interface QRCodeRepository {
  getHistory(): Promise<QRHistoryItem[]>;
  save(config: QRConfig, title?: string): Promise<QRHistoryItem[]>;
  delete(id: string): Promise<QRHistoryItem[]>;
  toggleFavorite(id: string): Promise<QRHistoryItem[]>;
  clearAll(): Promise<void>;
}
