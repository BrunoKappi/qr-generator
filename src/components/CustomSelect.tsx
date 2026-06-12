import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  value: string | number;
  onChange: (value: any) => void;
  options: Option[];
  id?: string;
  className?: string;
  direction?: 'down' | 'up';
}

export default function CustomSelect({
  value,
  onChange,
  options,
  id,
  className = '',
  direction = 'down',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef} id={id}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-3.5 text-left text-xs font-semibold text-zinc-800 transition-all hover:border-zinc-300 dark:border-zinc-900 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-800 cursor-pointer"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: direction === 'up' ? -5 : 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction === 'up' ? -5 : 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 max-h-60 w-full overflow-y-auto rounded-xl border border-zinc-100 bg-white p-1 shadow-lg dark:border-zinc-900 dark:bg-zinc-950 ${
              direction === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
          >
            {options.map((opt) => {
               const isSelected = opt.value === value;
               return (
                 <button
                   key={opt.value}
                   type="button"
                   onClick={() => {
                     onChange(opt.value);
                     setIsOpen(false);
                   }}
                   className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors cursor-pointer ${
                     isSelected
                       ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-950'
                       : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900'
                   }`}
                 >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
