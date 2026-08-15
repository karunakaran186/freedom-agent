import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Share2, Compass } from 'lucide-react';
import { FreedomMapData } from '../types';

interface ReflectionViewProps {
  data: FreedomMapData;
  onBackToMap: () => void;
  onNewThought: () => void;
  onShare: () => void;
}

export const ReflectionView: React.FC<ReflectionViewProps> = ({
  data,
  onBackToMap,
  onNewThought,
  onShare
}) => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-between px-4 sm:px-8 py-12 sm:py-16 bg-white text-slate-900 overflow-hidden select-none">
      {/* Subtle Violet Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-100/30 via-cyan-50/20 to-orange-50/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3"
      >
        <div className="flex items-center space-x-1">
          <div className="w-1 h-6 bg-orange-500 rounded-full" />
          <div className="w-1 h-6 bg-slate-200 rounded-full" />
          <div className="w-1 h-6 bg-green-600 rounded-full" />
        </div>
        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-slate-400">
          MY INDIA. MY FREEDOM. 15 AUG 2026
        </span>
      </motion.div>

      {/* Main Philosophical Reflection */}
      <div className="max-w-3xl mx-auto text-center my-auto py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="text-[10px] font-bold text-orange-500 tracking-widest uppercase mb-2 block">
            National & Personal Sovereignty
          </span>

          <h2 className="text-3xl sm:text-5xl font-light italic text-slate-900 leading-tight">
            “Freedom isn't only about where we live.<br />
            <span className="font-black not-italic text-slate-900">
              It is about the courage to make the decision we have avoided.
            </span>”
          </h2>

          {/* User's Declared Freedom Statement Reminder */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 max-w-xl mx-auto text-center shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-2">
              Freedom Statement
            </p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              “{data.freedomStatement}”
            </h3>
            <p className="text-xs text-slate-500 mt-2 italic">
              Your first step: "{data.firstStep}"
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed uppercase tracking-wider">
            In 1947, a nation of millions took autonomy of its destiny. Today, your sovereign choice writes the next chapter of yours.
          </p>

          {/* Action CTAs matching Immersive button styles */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onBackToMap}
              className="w-full sm:w-auto px-8 py-3.5 border border-slate-200 text-slate-700 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-slate-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Interactive Map</span>
            </button>

            <button
              onClick={onShare}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Map</span>
            </button>

            <button
              onClick={onNewThought}
              className="w-full sm:w-auto px-8 py-3.5 border border-violet-200 text-violet-700 bg-violet-50/60 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-violet-100 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>New Thought</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding & Tech Advisor Link */}
      <div className="w-full max-w-5xl mx-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <p className="text-[10px] italic">Decision Intelligence for the human experience.</p>
        
        <a
          href="https://techadvisor.lykspire.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-blue-900 transition-colors"
        >
          <span>Looking for a Tech Advisor?</span>
          <span className="text-blue-700 font-bold">Get in touch ↗</span>
        </a>

        <p className="text-[10px] tracking-widest uppercase">LYKSPIRE HQ™ / 15 AUG 2026</p>
      </div>
    </div>
  );
};
