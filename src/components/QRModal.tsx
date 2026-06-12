import { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Copy, Image, FileImage, Share2, Download, Star, Check, Sparkles, 
  Sliders, Palette, Image as ImageIcon, Frame, RotateCw, ExternalLink, RefreshCw 
} from 'lucide-react';

import { QRConfig, QRDotsType, QREyeFrameType, QREyeBallType } from '../types';
import { useTranslation } from '../services/i18n';
import CustomSelect from './CustomSelect';
import ColorPickerPopover from './ColorPickerPopover';
import LogoUpload from './LogoUpload';
import TemplatesGallery from './TemplatesGallery';
import { DEFAULT_QR_CONFIG } from '../presets';
import { QRCodeService } from '../services/QRCodeService';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: QRConfig;
  onChangeConfig: (newConfig: QRConfig) => void;
  onSave: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function QRModal({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onSave,
  isFavorite,
  onToggleFavorite,
}: QRModalProps) {
  const { t, lang } = useTranslation();
  
  // Real-time capacity computation based on the active config data and chosen error correction tier
  const modalCapacityMetrics = QRCodeService.getCapacityMetrics(
    config.data || '',
    config.errorCorrectionLevel || 'M'
  );
  const [activeTab, setActiveTab] = useState<'presets' | 'shapes' | 'colors' | 'logo' | 'frame' | 'effects' | 'download'>('download');
  const [downloadRes, setDownloadRes] = useState<number>(1024);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpg' | 'svg' | 'pdf'>('png');
  const [isExporting, setIsExporting] = useState(false);

  const modalQrRef = useRef<HTMLDivElement>(null);
  const modalExportContainerRef = useRef<HTMLDivElement>(null);
  const qrStylingRef = useRef<QRCodeStyling | null>(null);

  // Initialize and update qr-code-styling reactively when config variations change
  useEffect(() => {
    if (!isOpen) return;

    const dotsOptions: any = {
      type: config.dotsType,
    };

    if (config.dotsColorType === 'gradient') {
      dotsOptions.gradient = {
        type: config.dotsGradientType,
        rotation: (config.dotsGradientRotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: config.dotsGradientColor1 },
          { offset: 1, color: config.dotsGradientColor2 },
        ],
      };
    } else {
      dotsOptions.color = config.dotsColor;
    }

    const cornersSquareOptions: any = {
      type: config.cornersSquareType === 'rounded' 
        ? 'extra-rounded' 
        : config.cornersSquareType === 'extra-rounded'
          ? 'extra-rounded'
          : config.cornersSquareType === 'outpoint'
            ? 'outpoint'
            : config.cornersSquareType === 'dot'
              ? 'dot'
              : config.cornersSquareType === 'classy'
                ? 'classy'
                : 'square',
      color: config.cornersSquareColor,
    };

    const cornersDotOptions: any = {
      type: config.cornersDotType === 'square' || config.cornersDotType === 'dot'
        ? config.cornersDotType
        : 'dot',
      color: config.cornersDotColor,
    };

    // Recreate the instance to completely bypass merged/cached state visual mutation bugs in the library
    qrStylingRef.current = new QRCodeStyling({
      width: 280,
      height: 280,
      data: config.data || 'https://portfolio.bkappi.com',
      margin: config.margin,
      type: 'svg',
      dotsOptions,
      backgroundOptions: {
        color: config.backgroundTransparent ? 'transparent' : config.backgroundColor,
      },
      image: config.logoSrc || '',
      imageOptions: {
        crossOrigin: 'anonymous',
        hideBackgroundDots: config.logoClearBackground,
        imageSize: config.logoSize,
        margin: config.logoMargin,
      },
      cornersSquareOptions,
      cornersDotOptions,
      qrOptions: {
        errorCorrectionLevel: config.errorCorrectionLevel,
      },
    });

    const timer = setTimeout(() => {
      if (modalQrRef.current) {
        modalQrRef.current.innerHTML = '';
        qrStylingRef.current?.append(modalQrRef.current);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [config, isOpen]);

  // Dropdown list configurations mapped to translated strings
  const dotTypes = [
    { value: 'rounded', label: t('modal.roundedSoft') || 'Curvas Suaves' },
    { value: 'square', label: t('modal.squareSharp') || 'Quadrado Pontiagudo' },
    { value: 'dots', label: t('modal.circleDots') || 'Círculos Redondos' },
    { value: 'classy', label: t('modal.classyRefined') || 'Classy Elegante' },
    { value: 'classy-rounded', label: t('modal.classyCurved') || 'Classy Curvado' },
    { value: 'extra-rounded', label: t('modal.extraRounded') || 'Extra Arredondado' },
  ];

  const eyeFrameTypes = [
    { value: 'rounded', label: t('modal.suaveCurvado') || 'Suave Curvado' },
    { value: 'square', label: t('modal.quadradoClassico') || 'Quadrado Clássico' },
    { value: 'dot', label: t('modal.botaoCircular') || 'Botão Circular' },
    { value: 'extra-rounded', label: t('modal.acolchoadoGordinho') || 'Acolchoado Gordinho' },
    { value: 'outpoint', label: t('modal.pontiagudoModerno') || 'Pontiagudo Moderno' },
  ];

  const eyeBallTypes = [
    { value: 'rounded', label: t('modal.esferico') || 'Esférico' },
    { value: 'square', label: t('modal.cubo') || 'Cubo' },
    { value: 'dot', label: t('modal.pontoMedio') || 'Ponto Médio' },
    { value: 'heart', label: t('modal.coracao') || 'Coração' },
    { value: 'diamond', label: t('modal.diamante') || 'Diamante' },
  ];

  const gradientTypes = [
    { value: 'linear', label: t('modal.linear') },
    { value: 'radial', label: t('modal.radial') },
  ];

  const frameStyles = [
    { value: 'none', label: t('modal.styleNone') || 'Sem Moldura' },
    { value: 'scan_me', label: t('modal.styleScanMe') || 'Escanear-me Banner' },
    { value: 'open_link', label: t('modal.styleOpenLink') || 'Moldura Botão' },
    { value: 'instagram', label: t('modal.styleInstagram') || 'Estilo Instagram' },
    { value: 'whatsapp', label: t('modal.styleWhatsapp') || 'Estilo WhatsApp' },
    { value: 'minimal', label: t('modal.styleMinimal') || 'Marcações Minimal' },
    { value: 'corporate', label: t('modal.styleCorporate') || 'Estilo Corporativo' },
    { value: 'tech', label: t('modal.styleTech') || 'Design Tecnológico' },
    { value: 'creative', label: t('modal.styleCreative') || 'Formatos Criativos' },
  ];

  const errorCorrectionLevels = [
    { value: 'L', label: t('modal.errorL') },
    { value: 'M', label: t('modal.errorM') },
    { value: 'Q', label: t('modal.errorQ') },
    { value: 'H', label: t('modal.errorH') },
  ];

  const downloadResolutions = [
    { value: 512, label: `512 x 512 px` + (lang === "pt-BR" ? " (Web)" : lang === "es" ? " (Web)" : " (Web)") },
    { value: 1024, label: `1024 x 1024 px` + (lang === "pt-BR" ? " (Alta Definição / HD)" : lang === "es" ? " (Alta Definición / HD)" : " (HD)") },
    { value: 2048, label: `2048 x 2048 px` + (lang === "pt-BR" ? " (Ultra HD 2K)" : lang === "es" ? " (Ultra HD 2K)" : " (UHD 2K)") },
    { value: 4096, label: `4096 x 4096 px` + (lang === "pt-BR" ? " (Impressão / Print 4K)" : lang === "es" ? " (Impresión / Print 4K)" : " (Print 4K)") },
  ];

  const downloadFormats = [
    { value: 'png', label: lang === 'pt-BR' ? 'Imagem PNG (.png)' : lang === 'es' ? 'Imagen PNG (.png)' : 'PNG Image (.png)' },
    { value: 'jpg', label: lang === 'pt-BR' ? 'Imagem JPEG (.jpg)' : lang === 'es' ? 'Imagen JPEG (.jpg)' : 'JPEG Image (.jpg)' },
    { value: 'svg', label: lang === 'pt-BR' ? 'Vetores SVG (.svg)' : lang === 'es' ? 'Vectores SVG (.svg)' : 'SVG Vectors (.svg)' },
    { value: 'pdf', label: lang === 'pt-BR' ? 'Documento PDF (.pdf)' : lang === 'es' ? 'Documento PDF (.pdf)' : 'PDF Document (.pdf)' },
  ];

  // File Download Processors
  const triggerDownloadAction = async () => {
    try {
      // Character capacity validation check as safety guard before exporting
      const validation = QRCodeService.validateCapacity(config.data || '', config.errorCorrectionLevel || 'M');
      if (!validation.isValid) {
        toast.error(t(validation.errorKey || 'input.capacityLimitExceeded'));
        return;
      }

      const containerEl = modalExportContainerRef.current;
      if (!containerEl) {
        toast.error(t('modal.errorExportLocation'));
        return;
      }

      setIsExporting(true);
      const loadingToastId = toast.loading(t('modal.baixando'));
      const fileLabel = `bkappi-qr-${Date.now()}`;

      // Clean vector SVG
      if (downloadFormat === 'svg' && config.frameStyle === 'none') {
        if (qrStylingRef.current) {
          await qrStylingRef.current.download({
            name: fileLabel,
            extension: 'svg',
          });
          toast.dismiss(loadingToastId);
          toast.success(t('modal.downloadFinished'));
          setIsExporting(false);
          return;
        }
      }

      // Handle image pixel ratio renders
      const scaleMultiplier = downloadRes / 280; // 280px is the reference width of our workspace
      let dataUrl = '';

      if (downloadFormat === 'png' || downloadFormat === 'pdf') {
        dataUrl = await htmlToImage.toPng(containerEl, {
          backgroundColor: config.backgroundTransparent ? undefined : config.backgroundColor,
          pixelRatio: scaleMultiplier,
          style: {
            transform: 'scale(1)',
            borderRadius: '0px',
          },
        });
      } else if (downloadFormat === 'jpg') {
        dataUrl = await htmlToImage.toJpeg(containerEl, {
          backgroundColor: config.backgroundTransparent ? '#ffffff' : config.backgroundColor, // JPEG requires background color
          pixelRatio: scaleMultiplier,
          quality: 0.95,
          style: {
            transform: 'scale(1)',
            borderRadius: '0px',
          },
        });
      } else if (downloadFormat === 'svg') {
        dataUrl = await htmlToImage.toSvg(containerEl, {
          backgroundColor: config.backgroundTransparent ? undefined : config.backgroundColor,
          style: {
            transform: 'scale(1)',
            borderRadius: '0px',
          },
        });
      }

      if (downloadFormat === 'pdf') {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [downloadRes, downloadRes],
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, downloadRes, downloadRes);
        pdf.save(`${fileLabel}.pdf`);
      } else {
        const link = document.createElement('a');
        link.download = `${fileLabel}.${downloadFormat}`;
        link.href = dataUrl;
        link.click();
      }

      toast.dismiss(loadingToastId);
      toast.success(t('modal.downloadFinished'));
    } catch (err) {
      console.error(err);
      toast.error(t('common.error'));
    } finally {
      setIsExporting(false);
    }
  };

  // Clipboard copy and shares
  const handleCopyLink = () => {
    navigator.clipboard.writeText(config.data);
    toast.success(t('history.loadSuccess'));
  };

  const handleCopyImage = async () => {
    const el = modalExportContainerRef.current;
    if (!el) return;
    try {
      const dataUrl = await htmlToImage.toPng(el, { pixelRatio: 2 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.success(t('modal.copyImageSuccess'));
    } catch {
      toast.error(t('common.error'));
    }
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Bkappi Premium QR',
        text: lang === 'pt-BR' 
          ? 'Escaneie para acessar o conteúdo preferido:' 
          : lang === 'es' 
            ? 'Escanee para acceder al contenido preferido:' 
            : 'Scan to access preferred content:',
        url: config.data,
      })
      .then(() => toast.success(t('common.shared')))
      .catch((err) => console.log(err));
    } else {
      navigator.clipboard.writeText(config.data);
      toast.success(t('common.copied'));
    }
  };

  const handleShareImage = async () => {
    const el = modalExportContainerRef.current;
    if (!el) return;
    try {
      const dataUrl = await htmlToImage.toPng(el, { pixelRatio: 2 });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'qr-code.png', { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Bkappi QR Code',
          text: lang === 'pt-BR' 
            ? 'Meu QR Code Premium!' 
            : lang === 'es' 
              ? '¡Mi código QR Premium!' 
              : 'My Premium QR Code!',
        });
        toast.success(t('common.shared'));
      } else {
        await handleCopyImage();
      }
    } catch {
      await handleCopyImage();
    }
  };

  const testDestinationLink = () => {
    if (!config.data) return;
    const protocolRegex = /^https?:\/\//i;
    const finalUrl = protocolRegex.test(config.data) ? config.data : `https://${config.data}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectTemplate = (templateConfig: Partial<QRConfig>) => {
    onChangeConfig({ ...config, ...templateConfig });
  };

  const handleResetAllStyling = () => {
    onChangeConfig({
      ...config,
      dotsType: DEFAULT_QR_CONFIG.dotsType,
      dotsColor: DEFAULT_QR_CONFIG.dotsColor,
      dotsColorType: DEFAULT_QR_CONFIG.dotsColorType,
      dotsGradientType: DEFAULT_QR_CONFIG.dotsGradientType,
      dotsGradientColor1: DEFAULT_QR_CONFIG.dotsGradientColor1,
      dotsGradientColor2: DEFAULT_QR_CONFIG.dotsGradientColor2,
      dotsGradientRotation: DEFAULT_QR_CONFIG.dotsGradientRotation,
      cornersSquareType: DEFAULT_QR_CONFIG.cornersSquareType,
      cornersSquareColor: DEFAULT_QR_CONFIG.cornersSquareColor,
      cornersDotType: DEFAULT_QR_CONFIG.cornersDotType,
      cornersDotColor: DEFAULT_QR_CONFIG.cornersDotColor,
      backgroundColor: DEFAULT_QR_CONFIG.backgroundColor,
      backgroundTransparent: DEFAULT_QR_CONFIG.backgroundTransparent,
      backgroundOpacity: DEFAULT_QR_CONFIG.backgroundOpacity,
      logoSrc: DEFAULT_QR_CONFIG.logoSrc,
      logoSize: DEFAULT_QR_CONFIG.logoSize,
      logoMargin: DEFAULT_QR_CONFIG.logoMargin,
      logoCornerRadius: DEFAULT_QR_CONFIG.logoCornerRadius,
      logoOpacity: DEFAULT_QR_CONFIG.logoOpacity,
      logoClearBackground: DEFAULT_QR_CONFIG.logoClearBackground,
      logoBgColor: DEFAULT_QR_CONFIG.logoBgColor,
      frameStyle: DEFAULT_QR_CONFIG.frameStyle,
      frameText: DEFAULT_QR_CONFIG.frameText,
      frameColor: DEFAULT_QR_CONFIG.frameColor,
      frameTextColor: DEFAULT_QR_CONFIG.frameTextColor,
      shadowEnabled: DEFAULT_QR_CONFIG.shadowEnabled,
      borderThickness: DEFAULT_QR_CONFIG.borderThickness,
      borderRadius: DEFAULT_QR_CONFIG.borderRadius,
      rotate: DEFAULT_QR_CONFIG.rotate,
    });
    toast.success(t('modal.undoTemplate') || 'Customizações removidas');
  };

  const handleResetShapes = () => {
    onChangeConfig({
      ...config,
      dotsType: DEFAULT_QR_CONFIG.dotsType,
      cornersSquareType: DEFAULT_QR_CONFIG.cornersSquareType,
      cornersDotType: DEFAULT_QR_CONFIG.cornersDotType,
    });
    toast.success(t('modal.undoShapes') || 'Formatos revertidos');
  };

  const handleResetColors = () => {
    onChangeConfig({
      ...config,
      dotsColor: DEFAULT_QR_CONFIG.dotsColor,
      dotsColorType: DEFAULT_QR_CONFIG.dotsColorType,
      dotsGradientType: DEFAULT_QR_CONFIG.dotsGradientType,
      dotsGradientColor1: DEFAULT_QR_CONFIG.dotsGradientColor1,
      dotsGradientColor2: DEFAULT_QR_CONFIG.dotsGradientColor2,
      dotsGradientRotation: DEFAULT_QR_CONFIG.dotsGradientRotation,
      cornersSquareColor: DEFAULT_QR_CONFIG.cornersSquareColor,
      cornersDotColor: DEFAULT_QR_CONFIG.cornersDotColor,
      backgroundColor: DEFAULT_QR_CONFIG.backgroundColor,
      backgroundTransparent: DEFAULT_QR_CONFIG.backgroundTransparent,
      backgroundOpacity: DEFAULT_QR_CONFIG.backgroundOpacity,
    });
    toast.success(t('modal.undoColors') || 'Cores revertidas');
  };

  const handleResetLogo = () => {
    onChangeConfig({
      ...config,
      logoSrc: DEFAULT_QR_CONFIG.logoSrc,
      logoSize: DEFAULT_QR_CONFIG.logoSize,
      logoMargin: DEFAULT_QR_CONFIG.logoMargin,
      logoCornerRadius: DEFAULT_QR_CONFIG.logoCornerRadius,
      logoOpacity: DEFAULT_QR_CONFIG.logoOpacity,
      logoClearBackground: DEFAULT_QR_CONFIG.logoClearBackground,
      logoBgColor: DEFAULT_QR_CONFIG.logoBgColor,
    });
    toast.success(t('modal.undoLogo') || 'Configurações de logo resetadas');
  };

  const handleResetFrame = () => {
    onChangeConfig({
      ...config,
      frameStyle: DEFAULT_QR_CONFIG.frameStyle,
      frameText: DEFAULT_QR_CONFIG.frameText,
      frameColor: DEFAULT_QR_CONFIG.frameColor,
      frameTextColor: DEFAULT_QR_CONFIG.frameTextColor,
    });
    toast.success(t('modal.undoFrame') || 'Moldura removida');
  };

  const handleResetEffects = () => {
    onChangeConfig({
      ...config,
      shadowEnabled: DEFAULT_QR_CONFIG.shadowEnabled,
      borderThickness: DEFAULT_QR_CONFIG.borderThickness,
      borderRadius: DEFAULT_QR_CONFIG.borderRadius,
      rotate: DEFAULT_QR_CONFIG.rotate,
    });
    toast.success(t('modal.undoEffects') || 'Efeitos removidos');
  };

  // Render responsive banners under QR Code
  const getDecorativeFrameContent = () => {
    switch (config.frameStyle) {
      case 'scan_me':
        return (
          <div className="flex flex-col items-center w-full mt-2.5">
            <span 
              className="px-5 py-1.5 rounded-full font-display text-[10px] font-bold uppercase tracking-widest text-white shadow-sm"
              style={{ backgroundColor: config.frameColor, color: config.frameTextColor }}
            >
              {config.frameText || 'SCAN ME'}
            </span>
          </div>
        );
      case 'open_link':
        return (
          <div className="flex flex-col items-center w-full mt-2.5">
            <span 
              className="px-4 py-1.5 border leading-none rounded-md font-sans text-[9px] font-bold uppercase tracking-widest shadow-2xs"
              style={{ borderColor: config.frameColor, color: config.frameColor, backgroundColor: '#ffffff' }}
            >
              {config.frameText || 'OPEN LINK'}
            </span>
          </div>
        );
      case 'instagram':
        return (
          <div className="flex flex-col items-center w-full mt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
              {config.frameText || 'Instagram'}
            </span>
            <span className="text-[8px] text-zinc-400 font-medium">Follow us</span>
          </div>
        );
      case 'whatsapp':
        return (
          <div className="flex flex-col items-center w-full mt-2">
            <span 
              className="px-4 py-0.5 rounded-full text-[9px] font-bold text-white shadow-2xs bg-green-500"
            >
              {config.frameText || 'WhatsApp'}
            </span>
          </div>
        );
      case 'minimal':
        return (
          <div className="flex flex-col items-center w-full mt-2">
            <div className="h-[1px] w-12 bg-zinc-200 my-1 dark:bg-zinc-800" />
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
              {config.frameText || 'CODE'}
            </span>
          </div>
        );
      case 'corporate':
        return (
          <div className="flex flex-col items-center w-full mt-2 px-3 py-1 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">
              {config.frameText || 'Enterprise Office'}
            </span>
            <span className="text-[8px] text-zinc-400">Secure Verified Code</span>
          </div>
        );
      case 'tech':
        return (
          <div className="flex flex-col items-center w-full mt-2 font-mono text-[9px] text-zinc-500 dark:text-zinc-400 tracking-wider">
            <span>[ SYS: {config.frameText || 'LIVE'} ]</span>
          </div>
        );
      case 'creative':
        return (
          <div className="flex flex-col items-center w-full mt-2 bg-purple-50 dark:bg-purple-950/20 rounded-md p-1 border border-purple-100 dark:border-purple-900/40">
            <span className="text-[9px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest px-1">
              {config.frameText || 'Creative Design'}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ cubicBezier: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="relative flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 p-4 sm:px-6 dark:border-zinc-900 bg-white/50 backdrop-blur-md dark:bg-zinc-950/50">
              <div className="flex flex-col gap-0.5">
                <h2 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                  {t('modal.title')}
                </h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {t('modal.subtitle')}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleFavorite}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  title={t('modal.favoriteCode')}
                >
                  <Star className={`h-4 w-4 ${isFavorite ? 'fill-current text-amber-500' : 'text-zinc-450 hover:text-zinc-700 dark:text-zinc-500'}`} />
                </button>

                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content Core Body */}
            <div className="flex-1 overflow-y-auto min-h-0 bg-zinc-50/50 dark:bg-zinc-900/10 grid grid-cols-1 md:grid-cols-12">
              
              {/* LEFT COLUMN: Premium Preview Panel */}
              <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-900 p-6 flex flex-col items-center justify-center gap-6 bg-white dark:bg-zinc-950/40">
                {/* Containment render area zone */}
                <div className="flex items-center justify-center p-4 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/50 dark:bg-zinc-900/30 dark:border-zinc-800/20 shadow-inner">
                  <div 
                    ref={modalExportContainerRef}
                    id="modal-qr-canvas-holder"
                    className={`flex flex-col items-center justify-center p-4 sm:p-6 transition-all ${
                      config.shadowEnabled ? 'shadow-xl shadow-zinc-250/40 dark:shadow-zinc-950/50' : 'shadow-none'
                    }`}
                    style={{ 
                      borderRadius: `${config.borderRadius}px`,
                      borderWidth: `${config.borderThickness}px`,
                      borderColor: config.dotsColor,
                      backgroundColor: config.backgroundTransparent ? 'transparent' : config.backgroundColor,
                      width: 'fit-content'
                    }}
                  >
                    <div 
                      className="flex items-center justify-center justify-items-center transition-transform duration-300"
                      style={{ transform: `rotate(${config.rotate}deg)` }}
                    >
                      <div ref={modalQrRef} className="flex items-center justify-center justify-items-center" />
                    </div>
                    {config.frameStyle !== 'none' && getDecorativeFrameContent()}
                  </div>
                </div>

                {/* Micro Actions and Shortcuts */}
                <div className="grid grid-cols-2 gap-2 w-full max-w-sm px-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 text-[11px] font-bold text-zinc-650 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5 text-zinc-450" />
                    {t('modal.copyLink')}
                  </button>
                  <button
                    onClick={handleCopyImage}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 text-[11px] font-bold text-zinc-655 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <FileImage className="h-3.5 w-3.5 text-zinc-455" />
                    {t('modal.copyImage')}
                  </button>
                  <button
                    onClick={testDestinationLink}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 text-[11px] font-bold text-zinc-650 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-450" />
                    {t('modal.testLink')}
                  </button>
                  <button
                    onClick={handleShareImage}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 text-[11px] font-bold text-zinc-650 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5 text-zinc-450" />
                    {t('modal.shareCode')}
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: Settings options panel */}
              <div className="md:col-span-7 flex flex-col md:h-full md:overflow-hidden">
                {/* Horizontal Navigation inside Options column */}
                <div className="flex flex-wrap sm:flex-nowrap w-full border-b border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 shrink-0">
                  {[
                    { id: 'download', label: t('common.download') || 'Baixar', icon: Download },
                    { id: 'presets', label: t('modal.tabPresets'), icon: Sparkles },
                    { id: 'shapes', label: t('modal.tabShapes'), icon: Sliders },
                    { id: 'colors', label: t('modal.tabColors'), icon: Palette },
                    { id: 'logo', label: t('modal.tabLogo'), icon: ImageIcon },
                    { id: 'frame', label: t('modal.tabFrame'), icon: Frame },
                    { id: 'effects', label: t('modal.tabGeneral'), icon: RotateCw },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 min-w-[100px] sm:min-w-0 flex items-center justify-center gap-1.5 border-b-2 px-2.5 py-3 text-[11px] lg:text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'border-zinc-600 text-zinc-800 dark:border-zinc-50 dark:text-zinc-100'
                            : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Tab Panel Scroll Zone */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-5"
                    >
                      {/* PRESETS GALLERIES */}
                      {activeTab === 'presets' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                              {t('modal.tabPresets')}
                            </span>
                            <button
                              type="button"
                              onClick={handleResetAllStyling}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 hover:bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {t('modal.undoTemplate') || 'Remover Customizações'}
                            </button>
                          </div>
                          
                          <TemplatesGallery 
                            onSelectTemplate={handleSelectTemplate} 
                            activeDotsColor={config.dotsColor}
                            activeBgColor={config.backgroundColor}
                          />
                        </div>
                      )}

                      {/* SHAPES CONFIGURATION */}
                      {activeTab === 'shapes' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                              {t('modal.tabShapes')}
                            </span>
                            <button
                              type="button"
                              onClick={handleResetShapes}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 hover:bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {t('modal.undoShapes') || 'Reverter Formatos'}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.pixelsType')}</span>
                              <CustomSelect 
                                value={config.dotsType} 
                                onChange={(val) => onChangeConfig({ ...config, dotsType: val })} 
                                options={dotTypes} 
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.eyeFrame')}</span>
                              <CustomSelect 
                                value={config.cornersSquareType} 
                                onChange={(val) => onChangeConfig({ ...config, cornersSquareType: val })} 
                                options={eyeFrameTypes} 
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.eyeBall')}</span>
                              <CustomSelect 
                                value={config.cornersDotType} 
                                onChange={(val) => onChangeConfig({ ...config, cornersDotType: val })} 
                                options={eyeBallTypes} 
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.errorCorrection')}</span>
                              <CustomSelect 
                                value={config.errorCorrectionLevel} 
                                onChange={(val) => onChangeConfig({ ...config, errorCorrectionLevel: val })} 
                                options={errorCorrectionLevels} 
                              />
                            </div>

                            {/* Interactive, dynamic capacity progress underneath error correction selection */}
                            <div className="mt-3.5 space-y-2 col-span-2">
                              <div className="flex items-center justify-between text-[10px] font-bold">
                                <span className={
                                  modalCapacityMetrics.status === 'error' ? 'text-red-500' :
                                  modalCapacityMetrics.status === 'warning' ? 'text-amber-500' :
                                  'text-zinc-500 dark:text-zinc-400'
                                }>
                                  {t('input.capacityProgress')
                                    .replace('{current}', String(modalCapacityMetrics.currentLength))
                                    .replace('{max}', String(modalCapacityMetrics.maxLength))
                                    .replace('{percent}', String(modalCapacityMetrics.occupationPercentage))}
                                </span>
                                {modalCapacityMetrics.currentLength > modalCapacityMetrics.maxLength && (
                                  <span className="rounded bg-red-100 dark:bg-red-950/60 px-1 py-0.5 text-[8.5px] font-bold text-red-650 dark:text-red-400 uppercase tracking-widest animate-pulse">
                                    +{modalCapacityMetrics.currentLength - modalCapacityMetrics.maxLength} {lang === 'pt-BR' ? 'excedidos' : lang === 'es' ? 'excedidos' : 'exceeded'}
                                  </span>
                                )}
                              </div>
                              <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
                                <div 
                                  className={`h-full transition-all duration-300 ${
                                    modalCapacityMetrics.status === 'error' ? 'bg-red-500' :
                                    modalCapacityMetrics.status === 'warning' ? 'bg-amber-500' :
                                    'bg-emerald-500'
                                  }`}
                                  style={{ width: `${modalCapacityMetrics.occupationPercentage}%` }}
                                />
                              </div>
                              {modalCapacityMetrics.status === 'error' && (
                                <p className="text-[10px] font-bold text-red-500 mt-1">
                                  {t('input.capacityLimitExceeded')}
                                </p>
                              )}
                              {modalCapacityMetrics.status === 'warning' && (
                                <p className="text-[10px] font-semibold text-amber-500 mt-1">
                                  {t('input.capacityLimitWarning')}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COLORS OVERHAUL (Zero wrap, perfectly aligned as requested) */}
                      {activeTab === 'colors' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                              {t('modal.tabColors')}
                            </span>
                            <button
                              type="button"
                              onClick={handleResetColors}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 hover:bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {t('modal.undoColors') || 'Reverter Cores'}
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onChangeConfig({ ...config, dotsColorType: 'single' })}
                              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer border ${
                                config.dotsColorType === 'single'
                                  ? 'bg-zinc-900 text-white border-zinc-905 dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 shadow-sm'
                                  : 'bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800'
                              }`}
                            >
                              {t('modal.solidColors')}
                            </button>
                            <button
                              type="button"
                              onClick={() => onChangeConfig({ ...config, dotsColorType: 'gradient' })}
                              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer border ${
                                config.dotsColorType === 'gradient'
                                  ? 'bg-zinc-900 text-white border-zinc-905 dark:bg-zinc-50 dark:text-zinc-950 dark:border-zinc-50 shadow-sm'
                                  : 'bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800'
                              }`}
                            >
                              {t('modal.gradientColors')}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1.5">
                            {config.dotsColorType === 'single' ? (
                              <ColorPickerPopover 
                                label={t('modal.dotsColor')}
                                color={config.dotsColor} 
                                onChange={(c) => onChangeConfig({ ...config, dotsColor: c })}
                              />
                            ) : (
                              <>
                                <ColorPickerPopover 
                                  label={t('modal.gradColor1')} 
                                  color={config.dotsGradientColor1} 
                                  onChange={(c) => onChangeConfig({ ...config, dotsGradientColor1: c })}
                                />
                                <ColorPickerPopover 
                                  label={t('modal.gradColor2')} 
                                  color={config.dotsGradientColor2} 
                                  onChange={(c) => onChangeConfig({ ...config, dotsGradientColor2: c })}
                                />
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.gradType')}</span>
                                  <CustomSelect 
                                    value={config.dotsGradientType} 
                                    onChange={(v) => onChangeConfig({ ...config, dotsGradientType: v })} 
                                    options={gradientTypes} 
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.radial') || 'Rotação'} ({config.dotsGradientRotation}°)</span>
                                  <input 
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={config.dotsGradientRotation}
                                    onChange={(e) => onChangeConfig({ ...config, dotsGradientRotation: parseInt(e.target.value) })}
                                    className="h-1.5 w-full rounded-lg bg-zinc-200 accent-zinc-900 dark:bg-zinc-800 dark:accent-zinc-100"
                                  />
                                </div>
                              </>
                            )}

                            {/* Eyes Color override for elegance */}
                            <ColorPickerPopover 
                              label={t('modal.eyeFrame')} 
                              color={config.cornersSquareColor} 
                              onChange={(c) => onChangeConfig({ ...config, cornersSquareColor: c })}
                            />
                            
                            <ColorPickerPopover 
                              label={t('modal.eyeBall')} 
                              color={config.cornersDotColor} 
                              onChange={(c) => onChangeConfig({ ...config, cornersDotColor: c })}
                            />
                          </div>

                          <div className="border-t border-zinc-200/50 pt-4 dark:border-zinc-800/40">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5 block">{t('modal.bgColor')}</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <ColorPickerPopover 
                                label={t('modal.bgColor')}
                                color={config.backgroundColor} 
                                onChange={(c) => onChangeConfig({ ...config, backgroundColor: c })}
                              />
                              <button
                                type="button"
                                onClick={() => onChangeConfig({ ...config, backgroundTransparent: !config.backgroundTransparent })}
                                className="flex items-center gap-2.5 h-10 select-none cursor-pointer group text-left mt-auto"
                              >
                                <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  config.backgroundTransparent 
                                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950' 
                                    : 'border-zinc-300 bg-white group-hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900'
                                }`}>
                                  {config.backgroundTransparent && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>
                                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                                  {t('modal.transparentBg')}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* LOGO INLINE */}
                      {activeTab === 'logo' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                              {t('modal.tabLogo')}
                            </span>
                            <button
                              type="button"
                              onClick={handleResetLogo}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 hover:bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {t('modal.undoLogo') || 'Resetar Logo'}
                            </button>
                          </div>

                          <LogoUpload 
                            logoSrc={config.logoSrc}
                            onLogoChange={(src) => {
                              onChangeConfig({ ...config, logoSrc: src });
                              if (src) {
                                toast.success(t('modal.logoSuccess'));
                              } else {
                                toast.info(t('modal.logoRemoved') || 'Logo removed');
                              }
                            }}
                          />

                          {config.logoSrc && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                  {t('modal.logoSize')} ({Math.round(config.logoSize * 100)}%)
                                </span>
                                <input 
                                  type="range"
                                  min="0.1"
                                  max="0.35"
                                  step="0.01"
                                  value={config.logoSize}
                                  onChange={(e) => onChangeConfig({ ...config, logoSize: parseFloat(e.target.value) })}
                                  className="h-1.5 w-full rounded-lg bg-zinc-200 accent-zinc-900 dark:bg-zinc-800 dark:accent-zinc-100"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                  {t('modal.logoMargin')} ({config.logoMargin}px)
                                </span>
                                <input 
                                  type="range"
                                  min="0"
                                  max="15"
                                  value={config.logoMargin}
                                  onChange={(e) => onChangeConfig({ ...config, logoMargin: parseInt(e.target.value) })}
                                  className="h-1.5 w-full rounded-lg bg-zinc-200 accent-zinc-900 dark:bg-zinc-800 dark:accent-zinc-100"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => onChangeConfig({ ...config, logoClearBackground: !config.logoClearBackground })}
                                className="flex items-center gap-2.5 h-10 select-none cursor-pointer group text-left"
                              >
                                <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  config.logoClearBackground 
                                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950' 
                                    : 'border-zinc-300 bg-white group-hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900'
                                }`}>
                                  {config.logoClearBackground && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>
                                <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-300">
                                  {t('modal.logoClearBg')}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* FRAME MOLDURAS */}
                      {activeTab === 'frame' && (
                        <div className="space-y-4 animate-fade-in">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                              {t('modal.tabFrame')}
                            </span>
                            <button
                              type="button"
                              onClick={handleResetFrame}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 hover:bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {t('modal.undoFrame') || 'Remover Moldura'}
                            </button>
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.frameStyle')}</span>
                            
                            {/* Visual select grid containing molding design illustration miniatures */}
                            <div className="grid grid-cols-3 gap-2.5">
                              {frameStyles.map((item) => {
                                const isSelected = config.frameStyle === item.value;
                                return (
                                  <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => onChangeConfig({ ...config, frameStyle: item.value as any })}
                                    className={`relative flex flex-col items-center justify-between rounded-xl border p-2 text-center transition-all hover:scale-[1.02] cursor-pointer group ${
                                      isSelected
                                        ? 'border-zinc-450 bg-zinc-100/70 text-zinc-900 dark:border-zinc-100 dark:bg-zinc-50 dark:text-zinc-950'
                                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700'
                                    }`}
                                  >
                                    <div className="relative mb-2 flex h-12 w-full items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-950 p-1.5 overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                      {item.value === 'none' && (
                                        <div className="h-6 w-6 rounded-md border border-dashed border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-[8px] font-mono text-zinc-400">
                                          Ø
                                        </div>
                                      )}
                                      
                                      {item.value === 'scan_me' && (
                                        <div className="flex flex-col items-center border border-zinc-300 dark:border-zinc-500 rounded-sm p-0.5 w-9">
                                          <div className="h-3 w-3 bg-white border border-zinc-200" />
                                          <div className="mt-0.5 h-1 w-full bg-zinc-900 rounded-[1px] dark:bg-white" />
                                        </div>
                                      )}
                                      
                                      {item.value === 'open_link' && (
                                        <div className="flex flex-col items-center border border-zinc-300 dark:border-zinc-500 rounded-sm p-0.5 w-9">
                                          <div className="h-3 w-3 bg-white border border-zinc-200" />
                                          <div className="mt-0.5 h-1 w-3/4 rounded-full bg-zinc-900 dark:bg-white" />
                                        </div>
                                      )}
                                      
                                      {item.value === 'instagram' && (
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-pink-500 p-0.5">
                                          <div className="h-full w-full rounded-full border border-amber-400 flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 bg-zinc-900 dark:bg-white rounded-xs" />
                                          </div>
                                        </div>
                                      )}
                                      
                                      {item.value === 'whatsapp' && (
                                        <div className="flex flex-col items-center border border-emerald-500 rounded-sm p-0.5 w-9">
                                          <div className="h-3 w-3 bg-white border border-zinc-200" />
                                          <div className="mt-0.5 h-0.5 w-5 bg-emerald-500" />
                                        </div>
                                      )}
                                      
                                      {item.value === 'minimal' && (
                                        <div className="relative h-6 w-6">
                                          <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-zinc-400" />
                                          <div className="absolute top-0 right-0 h-1.5 w-1.5 border-t border-r border-zinc-400" />
                                          <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-zinc-400" />
                                          <div className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-zinc-400" />
                                        </div>
                                      )}
                                      
                                      {item.value === 'corporate' && (
                                        <div className="h-6 w-8 border border-zinc-400 dark:border-white p-0.5 flex flex-col justify-between">
                                          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
                                          <div className="h-2 w-full border border-dashed border-zinc-200" />
                                          <div className="h-0.5 w-full bg-zinc-200 dark:bg-zinc-800" />
                                        </div>
                                      )}
                                      
                                      {item.value === 'tech' && (
                                        <div className="relative h-6 w-9 border border-zinc-300 dark:border-zinc-500 p-0.5 rounded-xs">
                                          <div className="absolute top-0.5 left-0.5 h-0.5 w-0.5 bg-zinc-400" />
                                          <div className="absolute top-0.5 right-0.5 h-0.5 w-0.5 bg-zinc-400" />
                                          <div className="h-full w-full border border-dashed border-zinc-200 bg-white" />
                                        </div>
                                      )}
                                      
                                      {item.value === 'creative' && (
                                        <div className="relative h-6 w-8 border border-zinc-400 dark:border-zinc-500 p-0.5 rounded-br-lg">
                                          <div className="h-full w-full border border-dotted border-zinc-250 bg-white rounded-br-md" />
                                        </div>
                                      )}
                                    </div>
                                    <span className="text-[9px] font-bold tracking-tight block max-w-full truncate uppercase text-zinc-600 dark:text-zinc-450 group-hover:text-inherit">
                                      {item.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {config.frameStyle !== 'none' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                              <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.frameText')}</span>
                                <input 
                                  type="text"
                                  placeholder="EX: SCAN ME"
                                  value={config.frameText}
                                  onChange={(e) => onChangeConfig({ ...config, frameText: e.target.value })}
                                  className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-800 focus:border-zinc-300 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                                />
                              </div>

                              <ColorPickerPopover 
                                label={t('modal.frameColor')} 
                                color={config.frameColor} 
                                onChange={(c) => onChangeConfig({ ...config, frameColor: c })}
                              />

                              <ColorPickerPopover 
                                label={t('modal.frameTextColor')} 
                                color={config.frameTextColor} 
                                onChange={(c) => onChangeConfig({ ...config, frameTextColor: c })}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* EFFECTS AND EXTRA ROTATIONS */}
                      {activeTab === 'effects' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                              {t('modal.tabGeneral')}
                            </span>
                            <button
                              type="button"
                              onClick={handleResetEffects}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/50 hover:bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 cursor-pointer transition-colors"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {t('modal.undoEffects') || 'Remover Efeitos'}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <button
                              type="button"
                              onClick={() => onChangeConfig({ ...config, shadowEnabled: !config.shadowEnabled })}
                              className="flex items-center gap-2.5 h-10 select-none cursor-pointer group text-left mt-auto"
                            >
                              <div className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                config.shadowEnabled 
                                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950' 
                                  : 'border-zinc-300 bg-white group-hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900'
                              }`}>
                                {config.shadowEnabled && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>
                              <span className="text-xs font-bold text-zinc-650 dark:text-zinc-300">
                                {t('modal.shadowEnabled')}
                              </span>
                            </button>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">{t('modal.borderThickness')} ({config.borderThickness}px)</span>
                              <div className="flex items-center gap-2">
                                <button 
                                  type="button" 
                                  onClick={() => onChangeConfig({ ...config, borderThickness: 0 })}
                                  className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap cursor-pointer ${config.borderThickness === 0 ? 'bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}
                                >
                                  {t('modal.borderNone') || 'None'}
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => onChangeConfig({ ...config, borderThickness: 2 })}
                                  className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap cursor-pointer ${config.borderThickness === 2 ? 'bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}
                                >
                                  {t('modal.border2px') || '2px Border'}
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => onChangeConfig({ ...config, borderThickness: 4 })}
                                  className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap cursor-pointer ${config.borderThickness === 4 ? 'bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}
                                >
                                  {t('modal.border4px') || '4px Border'}
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                {t('modal.borderRadius')} ({config.borderRadius}px)
                              </span>
                              <input 
                                type="range"
                                min="0"
                                max="40"
                                value={config.borderRadius}
                                onChange={(e) => onChangeConfig({ ...config, borderRadius: parseInt(e.target.value) })}
                                className="h-1.5 w-full rounded-lg bg-zinc-200 accent-zinc-900 dark:bg-zinc-800 dark:accent-zinc-100"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                {t('modal.rotate')} ({config.rotate}°)
                              </span>
                              <CustomSelect 
                                value={config.rotate}
                                onChange={(val) => onChangeConfig({ ...config, rotate: val })}
                                options={[
                                  { value: 0, label: t('modal.rotateNormal') || '0° Normal' },
                                  { value: 90, label: t('modal.rotateClockwise') || '90° Clockwise' },
                                  { value: 180, label: t('modal.rotateUpsideDown') || '180° Upside Down' },
                                  { value: 270, label: t('modal.rotateCounterClockwise') || '270° Counter-Clockwise' },
                                ]}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'download' && (
                        <div className="space-y-5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                              {t('modal.downloadLabel') || 'Exportar QR Code'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-450">
                                {t('modal.downloadLabel') || 'Resolução'}
                              </span>
                              <CustomSelect 
                                value={downloadRes} 
                                onChange={(val) => setDownloadRes(val)} 
                                options={downloadResolutions} 
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-450">
                                {t('modal.downloadFormat') || 'Formato'}
                              </span>
                              <CustomSelect 
                                value={downloadFormat} 
                                onChange={(val) => setDownloadFormat(val)} 
                                options={downloadFormats} 
                              />
                            </div>
                          </div>

                          {/* Dynamic visual badge explaining the quality/utility */}
                          <div className="rounded-xl border border-zinc-150 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider mb-1">
                              {downloadFormat === 'svg' ? 'Formato Vetorial Profissional' : downloadFormat === 'pdf' ? 'Folha de Impressão Vetorial' : 'Imagem de Alta Definição'}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              {downloadFormat === 'svg' 
                                ? (lang === 'pt-BR' 
                                  ? 'Os arquivos SVG são vetores infinitamente escaláveis. Ideais para impressos profissionais, grandes mídias e projetos de design onde a nitidez precisa ser absoluta.'
                                  : lang === 'es'
                                    ? 'Los archivos SVG son vectores infinitamente escalables. Ideales para impresiones profesionales, grandes medios de comunicación y proyectos de diseño.'
                                    : 'SVG files are infinitely scalable vectors. Ideal for professional prints, high-quality mediums, and design projects where absolute sharpness is required.')
                                : downloadFormat === 'pdf'
                                  ? (lang === 'pt-BR'
                                    ? 'O formato PDF gera um documento pronto para impressão profissional de alta fidelidade sem perda de qualidade ou distorções.'
                                    : lang === 'es'
                                      ? 'El formato PDF genera un documento listo para la impresión profesional de alta fidelidad sin pérdida de calidad.'
                                      : 'PDF format generates a ready-to-print high-fidelity document without any quality loss or distortion.')
                                  : (lang === 'pt-BR'
                                    ? `Gera uma imagem ${downloadRes} x ${downloadRes} pixels em formato ${downloadFormat.toUpperCase()}. Perfeita para telas, sites e redes sociais.`
                                    : lang === 'es'
                                      ? `Genera una imagen de ${downloadRes} x ${downloadRes} píxeles en formato ${downloadFormat.toUpperCase()}. Perfecta para pantallas, sitios web y redes sociales.`
                                      : `Generates a ${downloadRes} x ${downloadRes} pixels image in ${downloadFormat.toUpperCase()} format. Perfect for screens, websites, and social media.`)}
                            </p>
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={triggerDownloadAction}
                              disabled={isExporting}
                              className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 uppercase tracking-widest"
                              id="download-tab-btn-action"
                            >
                              {isExporting ? <RefreshCw className="h-4.5 w-4.5 animate-spin" /> : <Download className="h-4.5 w-4.5" />}
                              {t('common.download')} {downloadFormat.toUpperCase()}
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
