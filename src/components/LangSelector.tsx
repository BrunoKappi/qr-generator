import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../services/i18n';

interface LangSelectorProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

export default function LangSelector({ currentLang, onLangChange }: LangSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const languages: { code: Language; label: string; short: string }[] = [
    { code: 'pt-BR', label: 'Português', short: 'PT' },
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'es', label: 'Español', short: 'ES' },
  ];

  const currentOption = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={popoverRef}>
      {/* Minimal Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-bold text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer uppercase tracking-wider"
        title="Mudar idioma / Change language"
      >
        <Globe className="h-4 w-4 text-zinc-400 group-hover:text-zinc-650 dark:text-zinc-500" />
        <span className="font-mono text-xs">{currentOption.short}</span>
      </button>

      {/* Opaque Dropdown List Overlay (Fixed No-Transparency) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-50 mt-2 w-36 rounded-xl border border-zinc-100 bg-white p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
          >
            {languages.map((langOpt) => {
              const isSelected = langOpt.code === currentLang;
              return (
                <button
                  key={langOpt.code}
                  type="button"
                  onClick={() => {
                    onLangChange(langOpt.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950'
                      : 'text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span>{langOpt.label}</span>
                  {isSelected && <Check className="h-3 w-3 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
