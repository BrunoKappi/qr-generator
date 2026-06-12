import { QRCodeRepository } from './QRCodeRepository';
import { QRConfig, QRHistoryItem } from '../types';

export class LocalStorageQRCodeRepository implements QRCodeRepository {
  private STORAGE_KEY = 'bkappi_qr_history';

  async getHistory(): Promise<QRHistoryItem[]> {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as QRHistoryItem[];
    } catch {
      return [];
    }
  }

  async save(config: QRConfig, title?: string): Promise<QRHistoryItem[]> {
    const items = await this.getHistory();
    
    // Propose auto-name if not specified
    let finalTitle = title;
    if (!finalTitle) {
      let truncated = config.data;
      if (truncated.length > 25) {
        truncated = truncated.substring(0, 25) + '...';
      }
      finalTitle = `${config.contentType.toUpperCase()} - ${truncated}`;
    }

    // Check if duplicate data already exists to update count
    const matchedIdx = items.findIndex(
      (i) => i.config.data === config.data && i.config.contentType === config.contentType
    );

    if (matchedIdx !== -1) {
      items[matchedIdx].useCount = (items[matchedIdx].useCount || 1) + 1;
      items[matchedIdx].createdAt = new Date().toISOString();
      // Keep existing custom names or details
    } else {
      const newItem: QRHistoryItem = {
        id: crypto.randomUUID(),
        name: finalTitle,
        config: { ...config },
        createdAt: new Date().toISOString(),
        isFavorite: false,
        useCount: 1,
      };
      items.unshift(newItem);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    return items;
  }

  async delete(id: string): Promise<QRHistoryItem[]> {
    const items = await this.getHistory();
    const filtered = items.filter((item) => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  }

  async toggleFavorite(id: string): Promise<QRHistoryItem[]> {
    const items = await this.getHistory();
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  async clearAll(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
