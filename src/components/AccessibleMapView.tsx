import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Share2, 
  RotateCcw,
  Sparkles,
  Compass
} from 'lucide-react';
import { FreedomMapData } from '../types';

interface AccessibleMapViewProps {
  data: FreedomMapData;
  onBackToGraph: () => void;
  onShare: () => void;
  onReset: () => void;
}

export const AccessibleMapView: React.FC<AccessibleMapViewProps> = ({
  data,
  onBackToGraph,
  onShare,
  onReset
}) => {
  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14 bg-white text-slate-900 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Navigation bar back to graph */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToGraph}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-700 hover:text-slate-950 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Interactive Map</span>
          </button>

          <button
            onClick={onShare}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-slate-900 hover:bg-slate-800 transition shadow-md cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Map</span>
          </button>
        </div>

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em] mb-2">
            <span>Structured Hierarchy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">
            Decision Blueprint
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete vector breakdown of your 2026 freedom journey.
          </p>
        </div>

        {/* Freedom Statement Card matching Immersive theme */}
        <div className="p-7 rounded-3xl bg-slate-900 text-white shadow-xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Freedom Statement
          </div>
          <p className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            “{data.freedomStatement}”
          </p>
        </div>

        {/* Section 1: The Transformation Vector */}
        <div className="space-y-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            01. TRANSFORMATION VECTOR
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-cyan-600 tracking-widest uppercase mb-2 block">
                Freedom From
              </span>
              <h2 className="text-xl font-medium leading-tight text-slate-800">
                "{data.freedomFrom}"
              </h2>
              <p className="text-xs text-slate-400 mt-3">
                The recurring past friction and uncertainty you are actively releasing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-orange-500 tracking-widest uppercase mb-2 block">
                Moving Toward
              </span>
              <h2 className="text-2xl font-light italic text-slate-900 leading-tight">
                {data.freedomToward}
              </h2>
              <p className="text-xs text-slate-400 mt-3">
                The authentic state of purpose, autonomy, and sovereignty you are stepping into.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Core Context */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">
            02. CORE CONTEXT
          </h2>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            "{data.coreContext}"
          </p>
        </div>

        {/* Section 3: Strategic Factors */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            03. KEY STRATEGIC LEVERS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.factors.map((factor, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-0.5">
                    Lever 0{idx + 1}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    {factor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: First Step */}
        <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[10px] font-bold text-green-600 tracking-widest uppercase mb-3 block">
            Your First Step
          </span>
          <div className="text-lg font-medium text-slate-800 italic">
            "{data.firstStep}"
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Action dissolves friction. Take this micro-action within the next 24 to 48 hours.
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 hover:text-slate-900 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Synthesize New Map</span>
          </button>

          <button
            onClick={onBackToGraph}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-slate-900 hover:bg-slate-800 shadow-md transition text-center cursor-pointer"
          >
            Return to Interactive Map Graph
          </button>
        </div>
      </motion.div>
    </div>
  );
};
