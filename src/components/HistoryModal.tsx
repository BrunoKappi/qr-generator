import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QRCodeStyling from 'qr-code-styling';
import { 
  X, Search, Trash2, Calendar, Star, Copy, ChevronRight, Bookmark, 
  ArrowUpDown, ExternalLink, Download 
} from 'lucide-react';

import { QRHistoryItem, QRConfig } from '../types';
import { useTranslation } from '../services/i18n';
import CustomSelect from './CustomSelect';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: QRHistoryItem[];
  onSelectConfig: (config: QRConfig) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onClearAll: () => void;
  onDuplicate: (config: QRConfig) => void;
  onExport: (config: QRConfig, filename: string) => void;
}

// Subcomponent to render a precision real miniature QR Code
function HistoryItemQRCode({ config }: { config: QRConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const dotsOptions: any = {
      type: config.dotsType,
    };

    if (config.dotsColorType === 'gradient') {
      dotsOptions.gradient = {
        type: config.dotsGradientType,
        rotation: (config.dotsGradientRotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: config.dotsGradientColor1 },
          { offset: 1, color: config.dotsGradientColor1 }, // Draw solid matching color for clarity inside 44px
        ],
      };
    } else {
      dotsOptions.color = config.dotsColor;
    }

    const qr = new QRCodeStyling({
      width: 44,
      height: 44,
      data: config.data || 'https://portfolio.bkappi.com',
      margin: 1.5,
      dotsOptions,
      backgroundOptions: {
        color: '#ffffff',
      },
      cornersSquareOptions: {
        type: config.cornersSquareType === 'outpoint' ? 'square' : config.cornersSquareType,
        color: config.cornersSquareColor,
      },
      cornersDotOptions: {
        type: (config.cornersDotType === 'heart' || config.cornersDotType === 'diamond' || config.cornersDotType === 'classy' ? 'dot' : config.cornersDotType) as any,
        color: config.cornersDotColor,
      },
    });
    
    containerRef.current.innerHTML = '';
    qr.append(containerRef.current);
  }, [config]);

  return (
    <div 
      ref={containerRef} 
      className="h-11 w-11 shrink-0 bg-white border border-zinc-200 rounded-lg overflow-hidden flex items-center justify-center shadow-2xs dark:border-zinc-900" 
    />
  );
}

export default function HistoryModal({
  isOpen,
  onClose,
  historyItems,
  onSelectConfig,
  onDelete,
  onToggleFavorite,
  onClearAll,
  onDuplicate,
  onExport,
}: HistoryModalProps) {
  const { t, lang } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState<'all' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'name' | 'uses'>('date_desc');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowClearConfirm(false);
    }
  }, [isOpen]);

  // Filter & Search Items
  const filteredItems = useMemo(() => {
    return historyItems
      .filter((item) => {
        const matchesSearch = 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.config.data.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = tab === 'all' || item.isFavorite;
        return matchesSearch && matchesTab;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'date_asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'uses') {
          return (b.useCount || 0) - (a.useCount || 0);
        }
        return 0;
      });
  }, [historyItems, searchTerm, tab, sortBy]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(navigator.language || 'pt-BR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'N/A';
    }
  };

  const sortOptions = [
    { value: 'date_desc', label: t('history.sortRecent') },
    { value: 'date_asc', label: t('history.sortOldest') },
    { value: 'name', label: t('history.sortName') },
    { value: 'uses', label: t('history.sortUses') },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Dialog Body panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-900 dark:bg-zinc-950"
          >
            {/* Header Dialog */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 sm:px-6 py-4 dark:border-zinc-900 bg-white/60 dark:bg-zinc-950/60 backdrop-blur">
              <div className="flex flex-col gap-0.5">
                <h2 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                  {t('history.title')}
                </h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {t('history.subtitle')}
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Filter Menu and Sort Bars */}
            <div className="flex flex-col gap-3.5 border-b border-zinc-200 px-4 sm:px-6 py-4 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/30">
              <div className="relative">
                <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder={t('history.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-xs font-semibold text-zinc-800 focus:border-zinc-300 focus:outline-hidden dark:border-zinc-900 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-zinc-800"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-900">
                  <button
                    onClick={() => setTab('all')}
                    className={`rounded-md px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                      tab === 'all'
                        ? 'bg-white text-zinc-800 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    {t('history.tabAll')}
                  </button>
                  <button
                    onClick={() => setTab('favorites')}
                    className={`flex items-center gap-1 rounded-md px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                      tab === 'favorites'
                        ? 'bg-white text-zinc-800 shadow-2xs dark:bg-zinc-800 dark:text-zinc-100'
                        : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    <Star className="h-3 w-3 fill-current" /> {t('history.tabFavorites')}
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-1 sm:max-w-[240px] w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">{t('history.sortBy')}</span>
                  <CustomSelect 
                    value={sortBy}
                    onChange={(val) => setSortBy(val)}
                    options={sortOptions}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* List Zone */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-3.5 bg-zinc-50/20 dark:bg-zinc-950/20 no-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="flex h-56 flex-col items-center justify-center text-center">
                  <Bookmark className="h-9 w-9 text-zinc-300 dark:text-zinc-700 animate-pulse" />
                  <span className="mt-3.5 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    {t('history.emptyTitle')}
                  </span>
                  <span className="mt-1 text-[10px] text-zinc-400 max-w-sm">
                    {t('history.emptySubtitle')}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-3.5 w-full">
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-2xs hover:border-zinc-300 dark:border-zinc-900 dark:bg-zinc-900/40 dark:hover:border-zinc-800 transition-colors"
                    >
                      <div className="flex items-start gap-3 w-full pr-14">
                        {/* Beautiful Real QR Miniature */}
                        <HistoryItemQRCode config={item.config} />

                        {/* Text and content */}
                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                          <span className="truncate text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            {item.name}
                          </span>
                          <span className="truncate text-[10px] font-mono text-zinc-400 dark:text-zinc-500 block" title={item.config.data}>
                            {item.config.data}
                          </span>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-500 uppercase tracking-wide dark:bg-zinc-800 dark:text-zinc-400">
                              {(() => {
                                const type = item.config.contentType || 'text';
                                switch (type) {
                                  case 'url': return 'URL';
                                  case 'wifi': return 'Wi-Fi';
                                  case 'email': return 'Email';
                                  case 'phone': return lang === 'pt-BR' ? 'Telefone' : lang === 'es' ? 'Teléfono' : 'Phone';
                                  case 'sms': return 'SMS';
                                  default: return lang === 'pt-BR' ? 'Texto' : lang === 'es' ? 'Texto' : 'Text';
                                }
                              })()}
                            </span>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1 font-medium">
                              <Calendar className="h-2.5 w-2.5" />
                              {formatDate(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Floating actions right side */}
                      <div className="absolute right-3.5 top-3.5 flex items-center gap-0.5">
                        <button
                          onClick={() => onToggleFavorite(item.id)}
                          className={`flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50/50 transition-colors hover:bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900 ${
                            item.isFavorite 
                              ? 'text-amber-500'
                              : 'text-zinc-400 hover:text-zinc-600'
                          }`}
                          title={t('common.favorite')}
                        >
                          <Star className={`h-3.5 w-3.5 ${item.isFavorite ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          onClick={() => onDelete(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50/50 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:border-zinc-900 dark:bg-zinc-900 dark:hover:bg-red-950/10"
                          title={t('common.delete')}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Loading Actions Trigger Strip */}
                      <div className="mt-4 flex items-center justify-end gap-1.5 border-t border-zinc-100 dark:border-zinc-900 pt-2.5">
                        <button
                          onClick={() => onSelectConfig(item.config)}
                          className="flex items-center gap-0.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 px-3 py-1 text-[10px] font-bold text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                        >
                          {t('common.load')}
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Clear All Footer */}
            {historyItems.length > 0 && (
              <div className="border-t border-zinc-200 px-4 sm:px-6 py-4 dark:border-zinc-900 bg-white dark:bg-zinc-950 flex items-center justify-between gap-4">
                {showClearConfirm ? (
                  <div className="flex items-center justify-between gap-3 w-full sm:justify-end">
                    <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest mr-2 leading-none">
                      {t('history.clearAllConfirm') || 'Limpar todo o histórico?'}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowClearConfirm(false)}
                        className="rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 px-3 py-1.5 text-[11px] font-bold text-zinc-600 dark:border-zinc-900 dark:bg-zinc-900 dark:text-zinc-350 dark:hover:bg-zinc-850 cursor-pointer"
                      >
                        {t('common.cancel') || 'Cancelar'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClearAll();
                          setShowClearConfirm(false);
                        }}
                        className="flex items-center gap-1 rounded-lg bg-red-600 hover:bg-red-500 px-3 py-1.5 text-[11px] font-bold text-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                        {t('common.delete') || 'Excluir'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full justify-end">
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm(true)}
                      className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/30 hover:bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition-colors dark:border-red-950/20 dark:bg-red-950/10 dark:hover:bg-red-950/20 dark:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      {t('history.clearAll')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
