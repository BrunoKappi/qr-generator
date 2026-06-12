import { PRESET_TEMPLATES } from '../presets';
import { QRConfig } from '../types';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '../services/i18n';

interface TemplatesGalleryProps {
  onSelectTemplate: (config: Partial<QRConfig>) => void;
  activeDotsColor?: string;
  activeBgColor?: string;
}

export default function TemplatesGallery({ onSelectTemplate, activeDotsColor, activeBgColor }: TemplatesGalleryProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-slate-800 dark:text-zinc-300" />
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {t('modal.tabPresets') || 'Presets'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {PRESET_TEMPLATES.map((tpl) => {
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl.config)}
              className="group relative flex flex-col items-start gap-2 rounded-xl border border-zinc-200/80 bg-white p-3 text-left shadow-2xs transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-xs active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
              id={`preset-template-${tpl.id}`}
              style={{ contentVisibility: 'auto' }}
            >
              {/* Template color banner preview */}
              <div 
                className="h-14 w-full rounded-lg border border-zinc-100 dark:border-zinc-800"
                style={{ background: tpl.previewColor }}
              />
              
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-bold text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100 transition-colors">
                  {t(`presets.${tpl.id}.name`) || tpl.name}
                </span>
                <span className="text-[9px] leading-relaxed text-zinc-400 dark:text-zinc-500 line-clamp-2">
                  {t(`presets.${tpl.id}.description`) || tpl.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
