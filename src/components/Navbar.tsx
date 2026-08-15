import React from 'react';
import { RotateCcw, ExternalLink } from 'lucide-react';
import { AppStep } from '../types';
import { IndianFlag } from './IndianFlag';

interface NavbarProps {
  currentStep: AppStep;
  counter: number;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentStep, counter, onReset }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/80 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand identity with Indian Flag and Typography */}
        <button 
          onClick={onReset}
          className="flex items-center space-x-3.5 text-left group transition hover:opacity-90 focus:outline-none cursor-pointer"
        >
          {/* Authentic Indian Flag Logo */}
          <div className="relative group-hover:scale-105 transition-transform">
            <IndianFlag width={38} height={25} className="rounded-xs shadow-sm ring-1 ring-slate-900/10" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-slate-900">
                MY INDIA. <span className="text-slate-400 font-light italic">MY FREEDOM.</span>
              </h1>
            </div>
            <p className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-bold mt-0.5">
              Independence Day 2026 • Decision Matrix
            </p>
          </div>
        </button>

        {/* Right Info: Tech Advisor Link, Global Pulse counter & Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Tech Advisor CTA in separate tab */}
          <a
            href="https://techadvisor.lykspire.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-blue-900 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 rounded-full transition-all shadow-xs hover:shadow-sm cursor-pointer whitespace-nowrap"
            title="Looking for Tech Advisor? Get in touch"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="hidden lg:inline text-slate-600 font-normal">Looking for Tech Advisor?</span>
            <span className="font-bold text-blue-900">Get in touch</span>
            <ExternalLink className="w-3 h-3 text-blue-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Global Pulse Indicator */}
          <div className="text-right flex flex-col items-end hidden md:flex">
            <p className="text-[10px] tracking-widest text-slate-400 uppercase font-bold mb-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Global Pulse</span>
            </p>
            <p className="text-xs sm:text-sm font-mono font-bold text-slate-800 leading-tight">
              {counter.toLocaleString()}{' '}
              <span className="text-[10px] font-normal text-slate-400 italic hidden sm:inline">
                Maps
              </span>
            </p>
          </div>

          {currentStep !== 'hero' && currentStep !== 'processing' && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-full transition shadow-xs cursor-pointer"
              title="Start New Thought"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
