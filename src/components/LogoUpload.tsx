import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useTranslation } from '../services/i18n';

interface LogoUploadProps {
  logoSrc: string;
  onLogoChange: (src: string) => void;
}

export default function LogoUpload({ logoSrc, onLogoChange }: LogoUploadProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('PNG, JPG, SVG, etc.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onLogoChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleTriggerSelect = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLogoChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.logoUploadLabel')}</span>
      
      {logoSrc ? (
        <div className="relative flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900 w-full shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 shrink-0">
              <img src={logoSrc} alt="Logo" className="h-full w-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                {t('modal.logoLoadSuccess') || 'Logo Load Success'}
              </span>
               <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{t('modal.logoSuccess')}</span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleRemoveLogo}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:border-zinc-800 dark:bg-zinc-800 dark:hover:bg-red-950/10 dark:hover:text-red-400 shrink-0 cursor-pointer"
            title={t('modal.removeLogo')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleTriggerSelect}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition-all duration-200 ${
            isDragging
              ? 'border-zinc-900 bg-zinc-100 dark:border-zinc-50 dark:bg-zinc-800/40'
              : 'border-zinc-200 bg-zinc-50/50 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept="image/*"
            className="hidden"
            id="logo-file-input"
          />
          
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-3xs transition-transform group-hover:scale-105 dark:bg-zinc-950">
            <Upload className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
          </div>
          
          <div className="mt-3 flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-350">
              {t('modal.dragAndDrop')} <span className="text-black dark:text-zinc-100 font-bold hover:underline">{t('modal.clickToUpload')}</span>
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
              {t('modal.recommendedSize')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
