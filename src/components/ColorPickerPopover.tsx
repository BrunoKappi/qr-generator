import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'motion/react';
import { Pipette } from 'lucide-react';
import { useTranslation } from '../services/i18n';

interface ColorPickerPopoverProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const PRESET_SWATCHES = [
  '#0f172a', // Slate 900
  '#3b82f6', // Blue 500
  '#6366f1', // Indigo 500
  '#8b5cf6', // Violet 500
  '#ec4899', // Pink 500
  '#ef4444', // Red 500
  '#f59e0b', // Amber 500
  '#10b981', // Emerald 500
  '#06b6d4', // Cyan 500
  '#ffffff', // White
  '#71717a', // Zinc 500
  '#000000', // Black
];

export default function ColorPickerPopover({ color, onChange, label }: ColorPickerPopoverProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState(color);

  // Synchronize internal input value when the color prop changes
  useEffect(() => {
    setInputValue(color);
  }, [color]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value && !value.startsWith('#')) {
      value = '#' + value;
    }
    if (!value) {
      value = '#';
    }
    
    // Simple hex regex validation to allow incremental typing e.g. #, #f, #ff, #fff, etc.
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      setInputValue(value);
      // Trigger onChange if it is a standard valid hex format
      if (value.length === 4 || value.length === 7) {
        onChange(value);
      }
    }
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    // Simple hex regex validation
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      onChange(value);
    }
  };

  const formattedHexValue = color.toLowerCase();

  return (
    <div className="relative flex flex-col gap-1.5" ref={popoverRef}>
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
      
      <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 shadow-2xs transition-colors focus-within:border-zinc-350 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-700">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-6 w-6 shrink-0 rounded-md border border-zinc-200 shadow-3xs cursor-pointer hover:scale-105 active:scale-95 dark:border-zinc-800 transition-all"
          style={{ backgroundColor: color }}
          title={label}
        />
        <input
          type="text"
          maxLength={7}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full min-w-0 bg-transparent py-0 text-xs font-semibold font-mono uppercase text-zinc-700 focus:outline-hidden dark:text-zinc-250"
          placeholder="#FFFFFF"
          id={`color-direct-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-350 cursor-pointer"
        >
          <Pipette className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex flex-col gap-3">
              <HexColorPicker color={formattedHexValue} onChange={onChange} />
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase">Hex</span>
                <input
                  type="text"
                  maxLength={7}
                  value={formattedHexValue}
                  onChange={handleHexChange}
                  className="w-full rounded-md border border-zinc-200 px-2 py-1 text-xs font-mono uppercase text-zinc-800 focus:border-zinc-400 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-zinc-600"
                  id={`color-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
                />
              </div>

              <div>
                <span className="mb-2 block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  {t('modal.quickPalette') || 'Paleta Rápida'}
                </span>
                <div className="grid grid-cols-6 gap-1.5">
                  {PRESET_SWATCHES.map((swatch) => (
                    <button
                      key={swatch}
                      type="button"
                      onClick={() => onChange(swatch)}
                      className={`h-6 w-full rounded-md border border-transparent shadow-xs transition-transform hover:scale-105 ${
                        color.toLowerCase() === swatch.toLowerCase()
                          ? 'border-zinc-400 ring-2 ring-zinc-200 dark:border-zinc-500 dark:ring-zinc-800'
                          : 'hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                      style={{ backgroundColor: swatch }}
                      title={swatch}
                      id={`preset-color-${swatch.replace('#', '')}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
