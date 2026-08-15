import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { IndianFlag } from './IndianFlag';

interface HeroViewProps {
  counter: number;
  onStart: () => void;
}

export const HeroView: React.FC<HeroViewProps> = ({ counter, onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-between px-4 sm:px-8 py-10 sm:py-14 bg-white overflow-hidden select-none">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-orange-100/30 via-sky-50/25 to-emerald-50/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Indian Flag Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-3 pt-2"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 shadow-xs">
          <IndianFlag width={24} height={16} className="rounded-xs" />
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-slate-700">
            Independence Day 2026
          </span>
        </div>
      </motion.div>

      {/* Main Core Typography & Slogan */}
      <div className="max-w-4xl mx-auto text-center my-auto py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none mb-6">
            MY INDIA.{' '}
            <span className="text-slate-400 font-light italic block sm:inline">
              MY FREEDOM.
            </span>
          </h1>

          <p className="text-xl sm:text-3xl text-slate-800 font-normal max-w-2xl mx-auto leading-relaxed mt-6 italic">
            "India became free in 1947.{' '}
            <span className="font-bold not-italic text-slate-950">
              What do you want to be free from in 2026?
            </span>"
          </p>

          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-slate-400 mt-6">
            One thought is enough • Zero sign-up required
          </p>
        </motion.div>

        {/* Primary CTA with Immersive Button Styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 sm:mt-12 flex flex-col items-center gap-4"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-4 sm:py-5 text-sm sm:text-base font-bold tracking-widest uppercase text-white bg-slate-900 hover:bg-slate-800 rounded-full shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          >
            <span>Explore My Freedom Map</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>

          {/* Privacy statement */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Private & Ephemeral • No logs • Pure Decision Intelligence</span>
          </div>
        </motion.div>
      </div>

      {/* Global Pulse & Lykspire Footer Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-5xl mx-auto flex flex-col items-center gap-3 pt-6 border-t border-slate-100"
      >
        {/* Tech Advisor Banner */}
        <a
          href="https://techadvisor.lykspire.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 hover:bg-blue-50 border border-slate-200/90 hover:border-blue-300 text-xs text-slate-600 hover:text-blue-950 transition-all shadow-xs"
        >
          <span className="font-semibold">Looking for a Tech Advisor?</span>
          <span className="text-blue-700 font-bold group-hover:underline flex items-center gap-1">
            Get in touch
            <span className="text-[10px]">↗</span>
          </span>
        </a>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 pt-1">
          <p className="text-[9px] tracking-widest uppercase italic">
            Decision Intelligence for the human experience.
          </p>

          <div className="flex items-center gap-2 font-mono font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{counter.toLocaleString()} Freedom Maps Explored</span>
          </div>

          <p className="text-[9px] tracking-widest uppercase">
            LYKSPIRE HQ™ / 15 AUG 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
};
