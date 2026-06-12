import { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, Clipboard, Bookmark, Sun, Moon, Info, ShieldCheck, 
  ArrowRight, Globe, Code, Heart, Sparkles, Wand2, Star
} from 'lucide-react';

// Models & Presets
import { QRConfig, QRHistoryItem, SubPageType } from './types';
import { DEFAULT_QR_CONFIG } from './presets';

// Services & Repositories
import { LanguageProvider, useTranslation, Language } from './services/i18n';
import { LocalStorageQRCodeRepository } from './repositories/LocalStorageQRCodeRepository';
import { QRCodeService } from './services/QRCodeService';

// Subcomponents
import CustomSelect from './components/CustomSelect';
import QRModal from './components/QRModal';
import HistoryModal from './components/HistoryModal';
import LegalViews from './components/LegalViews';
import LangSelector from './components/LangSelector';

// Zod validation
const qrValidatorSchema = z.object({
  data: z.string().min(1, 'O conteúdo do QR Code não pode estar vazio'),
});

type FormInputType = {
  data: string;
};

// Initialize repositories & services globally
const qrRepository = new LocalStorageQRCodeRepository();

function AppContent() {
  const { t, lang, setLang } = useTranslation();
  const queryClient = useQueryClient();

  // Dialog / Panel controllers
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeSubPage, setActiveSubPage] = useState<SubPageType>(null);

  // States
  const [currentConfig, setCurrentConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('bkappi_theme_pref');
    if (saved === 'light') return 'light';
    return 'dark'; // Dark theme as elegant default
  });
  
  const [cookieConsent, setCookieConsent] = useState<boolean>(() => {
    return localStorage.getItem('bkappi_cookie_consent') === 'accepted';
  });

  // Reactive theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bkappi_theme_pref', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bkappi_theme_pref', 'light');
    }
  }, [theme]);

  // Read History Items via React Query
  const { data: historyItems = [] } = useQuery<QRHistoryItem[]>({
    queryKey: ['qr_history'],
    queryFn: () => qrRepository.getHistory(),
  });

  // React Hook Form for Central Input
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputType>({
    resolver: zodResolver(qrValidatorSchema),
    defaultValues: {
      data: '',
    },
  });

  const formValue = watch('data');

  // Real-time capacity computation from central QRCodeService
  const capacityMetrics = useMemo(() => {
    return QRCodeService.getCapacityMetrics(formValue || '', 'Q');
  }, [formValue]);

  // Intelligent Content Type Detection in real-time
  const detectedType = useMemo(() => {
    return QRCodeService.detectContentType(formValue || '');
  }, [formValue]);

  // Translatable helper representing content type badges
  const getDetectedTypeLabel = () => {
    if (!formValue) return null;
    switch (detectedType) {
      case 'url':
        return t('input.detectedUrl');
      case 'wifi':
        return t('input.detectedWifi');
      case 'email':
        return t('input.detectedEmail');
      case 'phone':
        return t('input.detectedPhone');
      case 'sms':
        return t('input.detectedSms');
      default:
        return t('input.detectedText');
    }
  };

  // Submit trigger - Generates QR & opens Customizer Modal
  const onSubmit = async (values: FormInputType) => {
    // Validate character capacity strictly before processing layout triggers
    const validation = QRCodeService.validateCapacity(values.data, 'Q');
    if (!validation.isValid) {
      toast.error(t(validation.errorKey || 'input.capacityLimitExceeded'));
      return;
    }

    const freshConfig: QRConfig = {
      ...DEFAULT_QR_CONFIG,
      data: values.data,
      contentType: detectedType,
    };

    try {
      // Save item to our Local Storage Repository
      await qrRepository.save(freshConfig);
      queryClient.invalidateQueries({ queryKey: ['qr_history'] });
      
      // Update config and reveal the modular column customizer Dialog UI
      setCurrentConfig(freshConfig);
      setIsQRModalOpen(true);
    } catch (err) {
      console.error(err);
      toast.error('Erro ao salvar no histórico local.');
    }
  };

  // Callback to load configurations from history
  const handleLoadConfig = (configToLoad: QRConfig) => {
    setCurrentConfig(configToLoad);
    setValue('data', configToLoad.data);
    setIsHistoryOpen(false);
    setIsQRModalOpen(true);
    toast.success(t('history.loadSuccess'));
  };

  // Local storage history operations mapped to Tanstack mutations
  const deleteMutation = useMutation({
    mutationFn: (id: string) => qrRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr_history'] });
      toast.success(t('history.deleteSuccess'));
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: (id: string) => qrRepository.toggleFavorite(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qr_history'] });
      const item = data.find(it => it.id === currentConfig.id || (it.config.data === currentConfig.data && it.config.contentType === currentConfig.contentType));
      if (item) {
        toast.success(item.isFavorite ? 'Item favoritado!' : 'Removido dos favoritos');
      }
    },
  });

  const isCurrentConfigFavorite = useMemo(() => {
    const matched = historyItems.find(
      (item) => item.config.data === currentConfig.data && item.config.contentType === currentConfig.contentType
    );
    return matched ? matched.isFavorite : false;
  }, [historyItems, currentConfig]);

  const handleToggleCurrentConfigFavorite = () => {
    const matched = historyItems.find(
      (item) => item.config.data === currentConfig.data && item.config.contentType === currentConfig.contentType
    );
    if (matched) {
      toggleFavoriteMutation.mutate(matched.id);
    } else {
      toast.info('Gere ou salve o QR Code antes de favoritar');
    }
  };

  const handleSave = async () => {
    await handleSaveModalChanges(currentConfig);
  };

  const clearHistoryMutation = useMutation({
    mutationFn: () => qrRepository.clearAll(),
    onSuccess: () => {
      queryClient.setQueryData(['qr_history'], []);
      queryClient.invalidateQueries({ queryKey: ['qr_history'] });
      toast.success(t('history.deleteSuccess'));
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: (cfg: QRConfig) => qrRepository.save(cfg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qr_history'] });
      toast.success(t('history.duplicateSuccess'));
    },
  });

  // Save changes inside customization modal dialog
  const handleSaveModalChanges = async (updatedConfig: QRConfig) => {
    try {
      await qrRepository.save(updatedConfig);
      queryClient.invalidateQueries({ queryKey: ['qr_history'] });
      setCurrentConfig(updatedConfig);
    } catch {
      toast.error('Erro ao salvar alterações do QR.');
    }
  };

  const languageOptions = [
    { value: 'pt-BR', label: 'Português (pt-BR)' },
    { value: 'en', label: 'English (US)' },
    { value: 'es', label: 'Español (ES)' },
  ];

  const handleApplyQuickLink = (url: string) => {
    setValue('data', url);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans antialiased text-zinc-900 dark:text-zinc-50 flex flex-col justify-between transition-colors duration-200">
      
      {/* Premium Header Brand Row */}
      <header className="border-b border-zinc-200 bg-white/70 backdrop-blur-md dark:border-zinc-900/40 dark:bg-zinc-950/75 sticky top-0 z-40 transition-colors">
        <div className="mx-auto flex max-w-7xl h-14 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center shrink-0">
              <img 
                src="https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico" 
                alt="Bkappi logo" 
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold leading-none tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                {t('common.brandName')}
              </span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold tracking-wider uppercase leading-none mt-1">
                {t('common.logoSub')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Bookmark History Trigger Button */}
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="group inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer uppercase tracking-wider"
              id="header-history-btn"
              title={t('history.title')}
            >
              <Bookmark className="h-3.5 w-3.5 fill-current text-zinc-400 transition-colors group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300" />
              <span className="hidden sm:inline text-[10px] font-bold">{t('history.btnLabel')}</span>
              {historyItems.length > 0 && (
                <span className="ml-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-bold text-white dark:bg-zinc-100 dark:text-zinc-950 transition-colors">
                  {historyItems.length}
                </span>
              )}
            </button>

            {/* Language Selection */}
            <LangSelector currentLang={lang} onLangChange={setLang} />

            {/* Theme switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
              title={theme === 'dark' ? t('common.lightTheme') : t('common.darkTheme')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Search/Universal Input Container */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col justify-center">
        
        {/* Dynamic Logo Title Card Hero */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t('common.brandName')} <span className="text-zinc-400 dark:text-zinc-500 font-light">QR Code</span>
          </h1>
        </div>

        {/* Flat Glassmorphism Universal Card Input Form */}
        <div className="w-full bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-2xs dark:bg-zinc-900/40 dark:border-zinc-900 transition-all flex flex-col gap-5">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="universal-data-input" className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {t('input.inputLabel')}
                </label>

                {/* Intelligent Type Detection Banner */}
                {formValue && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-[9.5px] font-bold text-zinc-500 uppercase tracking-wider dark:bg-zinc-900/60 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/20"
                  >
                    {getDetectedTypeLabel()}
                  </motion.span>
                )}
              </div>

              <div className="relative">
                <textarea
                  id="universal-data-input"
                  rows={4}
                  placeholder={t('input.inputPlaceholder')}
                  maxLength={1200}
                  {...register('data')}
                  className="w-full rounded-xl border bg-white p-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-hidden dark:bg-zinc-900 dark:placeholder-zinc-500 border-zinc-200 focus:border-zinc-300 dark:border-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-800"
                />
                
                {errors.data && formValue && formValue.trim() && (
                  <span className="mt-1.5 block text-xs font-semibold text-red-500">
                    {errors.data.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!formValue || !formValue.trim() || capacityMetrics.status === 'error'}
              className={`w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl px-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${
                (!formValue || !formValue.trim() || capacityMetrics.status === 'error')
                  ? 'bg-zinc-200 dark:bg-zinc-800 border border-transparent text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-60' 
                  : 'bg-zinc-950 text-white hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100 border border-transparent dark:border-zinc-900 cursor-pointer active:scale-[0.98] shadow-sm'
              }`}
              id="generate-qr-universal-btn"
            >
              <QrCode className="h-4.5 w-4.5" />
              {t('input.submitBtn')}
            </button>
          </form>

        </div>

      </main>

      {/* Elegant Standard Corporate Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50/50 dark:border-zinc-900/60 dark:bg-zinc-950/50 py-6 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} {t('common.brandName')} QR Studio. {t('common.allRightsReserved')}
            </span>
          </div>

          {/* Legal Pages anchor navigations */}
          <div className="flex flex-wrap justify-center gap-3.5">
            <button
              onClick={() => setActiveSubPage('privacy')}
              className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {t('common.privacyPolicy')}
            </button>
            <button
              onClick={() => setActiveSubPage('cookies')}
              className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {t('common.cookiePolicy')}
            </button>
            <button
              onClick={() => setActiveSubPage('terms')}
              className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {t('common.termsOfUse')}
            </button>
            <button
              onClick={() => setActiveSubPage('developer')}
              className="text-[11px] font-semibold text-amber-600 hover:text-amber-750 dark:text-amber-500 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              {t('common.aboutDeveloper')}
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Cookie Consent Banner */}
      <AnimatePresence>
        {!cookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 max-w-md rounded-2xl border border-zinc-200 bg-white p-4.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-5 w-5 shrink-0 text-zinc-800 dark:text-zinc-200 mt-0.5" />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{t('cookies.title')}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
                    {t('cookies.subtitle')}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    localStorage.setItem('bkappi_cookie_consent', 'accepted');
                    setCookieConsent(true);
                    toast.success('Offline Cookie Consent accepted!');
                  }}
                  className="rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-3.5 py-1.5 text-[10px] font-bold cursor-pointer transition-opacity hover:opacity-90"
                >
                  {t('cookies.accept')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Main Customizer and Action Dialog */}
      <QRModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        config={currentConfig}
        onChangeConfig={setCurrentConfig}
        onSave={handleSave}
        isFavorite={isCurrentConfigFavorite}
        onToggleFavorite={handleToggleCurrentConfigFavorite}
      />

      {/* Decoupled Near Full-screen Large Management History Manager Modal */}
      <HistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyItems={historyItems}
        onSelectConfig={handleLoadConfig}
        onDelete={(id) => deleteMutation.mutate(id)}
        onToggleFavorite={(id) => toggleFavoriteMutation.mutate(id)}
        onClearAll={() => clearHistoryMutation.mutate()}
        onDuplicate={(cfg) => duplicateMutation.mutate(cfg)}
        onExport={(cfg, filename) => {
          // Can download straight through customizer or modal actions
          setCurrentConfig(cfg);
          setIsQRModalOpen(true);
        }}
      />

      {/* Pop-up Institutional and Legal policies details screen */}
      <LegalViews 
        activePage={activeSubPage}
        onClose={() => setActiveSubPage(null)}
        onNavigate={(page) => setActiveSubPage(page)}
      />

      {/* Universal feedback banner alerts */}
      <Toaster position="top-right" richColors theme={theme} />

    </div>
  );
}

// Compact tag helper component
function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3.5 py-1 text-[10px] font-bold text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 select-none">
      <Sparkles className="h-2.5 w-2.5 text-zinc-400" />
      {text}
    </div>
  );
}

// Wrapper to isolate i18n hooks properly
export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
