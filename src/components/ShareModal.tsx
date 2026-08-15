import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  MessageCircle, 
  Sparkles,
  Smartphone,
  Square,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FreedomMapData } from '../types';
import { generateFreedomCardBlob, CardFormat } from '../lib/canvasExporter';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FreedomMapData;
  onNewMap: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  data,
  onNewMap
}) => {
  const [format, setFormat] = useState<CardFormat>('4:5');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9933', '#FFFFFF', '#138808', '#6366F1']
    });
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateFreedomCardBlob(data, format);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `My-Freedom-Map-${format === '4:5' ? 'Feed' : 'Story'}-2026.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerConfetti();
    } catch (err) {
      console.error('Error generating card image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWebShare = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateFreedomCardBlob(data, format);
      const file = new File([blob], 'my-freedom-map-2026.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'MY INDIA. MY FREEDOM. 🇮🇳',
          text: `“${data.freedomStatement}” — I just mapped my 2026 Freedom Map. What do you want to be free from in 2026?`,
          files: [file],
          url: window.location.origin
        });
        triggerConfetti();
      } else {
        handleDownload();
      }
    } catch (err) {
      console.warn('Share dismissed or unsupported:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🇮🇳 *MY INDIA. MY FREEDOM. (15 Aug 2026)*\n\n` +
      `"India became free in 1947. What do you want to be free from in 2026?"\n\n` +
      `🕊️ *Freedom From:* "${data.freedomFrom}"\n` +
      `🚀 *Moving Toward:* "${data.freedomToward}"\n` +
      `✨ *My Statement:* "${data.freedomStatement}"\n` +
      `🎯 *First Step:* "${data.firstStep}"\n\n` +
      `Create your anonymous Freedom Map in seconds at: ${window.location.origin}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    triggerConfetti();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-5 bg-orange-500 rounded-full" />
              <div className="w-1 h-5 bg-slate-200 rounded-full" />
              <div className="w-1 h-5 bg-green-600 rounded-full" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                Share My Freedom Map
              </h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                High-Resolution PNG • Decision Intelligence Card
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Format Selector Pills */}
          <div className="flex items-center justify-center gap-2 p-1 rounded-full bg-slate-100 max-w-xs mx-auto">
            <button
              onClick={() => setFormat('4:5')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                format === '4:5'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>4:5 Feed</span>
            </button>

            <button
              onClick={() => setFormat('9:16')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                format === '9:16'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 Story</span>
            </button>
          </div>

          {/* Live Visual Card Preview matching Immersive UI */}
          <div className="relative mx-auto max-w-sm rounded-2xl bg-white border border-slate-200 p-5 shadow-lg overflow-hidden">
            {/* Top Tricolor Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="bg-orange-500 flex-1" />
              <div className="bg-slate-100 flex-1" />
              <div className="bg-green-600 flex-1" />
            </div>

            <div className="text-center pt-2 mb-4">
              <div className="text-xs font-black tracking-widest text-slate-900">
                MY INDIA. <span className="font-light italic text-slate-400">MY FREEDOM.</span>
              </div>
              <div className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-0.5">
                LYKSPIRE HQ™ / 15 AUG 2026
              </div>
            </div>

            {/* Content preview blocks */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-left">
                <div className="text-[9px] font-bold text-cyan-600 uppercase tracking-widest">
                  FREEDOM FROM
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  "{data.freedomFrom}"
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-left">
                <div className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">
                  MOVING TOWARD
                </div>
                <div className="text-xs font-light italic text-slate-900 mt-0.5">
                  {data.freedomToward}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white text-center">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  FREEDOM STATEMENT
                </div>
                <div className="text-sm font-black text-white tracking-tight">
                  “{data.freedomStatement}”
                </div>
              </div>

              {/* Tech Advisor Callout Card in Preview */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-left">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-orange-500 via-slate-300 to-green-600 rounded-full" />
                  <div>
                    <div className="text-[9px] font-bold text-slate-900 uppercase tracking-wider">
                      Looking for a Tech Advisor?
                    </div>
                    <div className="text-[9px] text-blue-600 font-semibold truncate">
                      https://techadvisor.lykspire.com/
                    </div>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">GET IN TOUCH →</span>
              </div>
            </div>

            <div className="text-center mt-3 pt-3 border-t border-slate-100">
              <div className="text-[9px] text-slate-400 tracking-widest uppercase italic">
                Decision Intelligence for the human experience.
              </div>
            </div>
          </div>

          {/* Action Buttons Grid matching Immersive rounded-full buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWebShare}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-xs tracking-wider uppercase bg-slate-900 hover:bg-slate-800 text-white shadow-md transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Card</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-xs tracking-wider uppercase border-2 border-slate-900 text-slate-900 hover:bg-slate-50 transition cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Generating...' : `Download Image (${format})`}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-xs tracking-wider uppercase bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-md transition cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-full font-bold text-xs tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Tech Advisor Dedicated Outbound Route Link */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-50/70 via-white to-emerald-50/70 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div>
              <div className="text-xs font-black text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Looking for a Tech Advisor?</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Strategic technology advisory & architecture consulting
              </p>
            </div>
            <a
              href="https://techadvisor.lykspire.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wider uppercase transition shadow-xs cursor-pointer shrink-0"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Next Map prompt */}
          <div className="pt-1 text-center">
            <button
              onClick={() => {
                onClose();
                onNewMap();
              }}
              className="text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-slate-900 transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore another freedom thought</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
