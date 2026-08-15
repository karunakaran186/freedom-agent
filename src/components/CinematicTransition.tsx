import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Users, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CinematicTransitionProps {
  thought: string;
  isQueued?: boolean;
  onComplete: () => void;
}

const STAGES = [
  { id: 1, label: "Receiving your thought...", desc: "Isolating the core human intention" },
  { id: 2, label: "Breaking into contextual fragments...", desc: "Extracting emotional and strategic factors" },
  { id: 3, label: "Transforming fragments into nodes...", desc: "Mapping mental variables and weights" },
  { id: 4, label: "Synthesizing connection pathways...", desc: "Bridging present friction with future autonomy" },
  { id: 5, label: "Reorganizing Decision Architect vectors...", desc: "Harmonizing factors into deterministic geometry" },
  { id: 6, label: "Dissolving background noise...", desc: "Filtering out fear, hesitation, and self-doubt" },
  { id: 7, label: "Illuminating your Freedom Path...", desc: "One clear trajectory emerges" },
  { id: 8, label: "Stabilizing your Freedom Map...", desc: "Sovereignty unlocked." }
];

export const CinematicTransition: React.FC<CinematicTransitionProps> = ({ thought, isQueued = false, onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // 8 stages over ~4.2 seconds
    const stageDuration = 520; // ms per stage
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Trigger subtle celebration confetti on final stabilize
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#FF9933', '#FFFFFF', '#138808', '#1E3A8A']
            });
          } catch (e) {
            // ignore
          }
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, stageDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  const active = STAGES[currentStage];
  const progressPercent = Math.round(((currentStage + 1) / STAGES.length) * 100);

  // Fragments generated from the thought
  const words = thought.split(' ').filter(Boolean).slice(0, 8);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 py-12 bg-white overflow-hidden">
      {/* Background Animated Energy Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-orange-100/40 via-sky-100/30 to-emerald-100/40 blur-3xl"
        />
      </div>

      <div className="max-w-xl w-full text-center">
        {/* High Traffic Queue Notice if experienced */}
        {isQueued && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>High volume of citizens exploring maps — your request is queued & synthesizing...</span>
          </motion.div>
        )}

        {/* Stage Number & Title */}
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-blue-700" />
            <span>STAGE {active.id} OF 8</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {active.label}
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {active.desc}
          </p>
        </motion.div>

        {/* Visual Stage Simulation Canvas / Box */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Stage 1: Thought display */}
          {currentStage === 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="p-6 rounded-2xl bg-white shadow-md border border-slate-200 max-w-md text-slate-800 font-semibold text-lg italic"
            >
              “{thought}”
            </motion.div>
          )}

          {/* Stage 2 & 3: Fragments turning into nodes */}
          {(currentStage === 1 || currentStage === 2) && (
            <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-3">
              {words.map((word, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0, x: (idx % 2 === 0 ? -20 : 20), y: (idx % 3 === 0 ? -20 : 20) }}
                  animate={{
                    opacity: 1,
                    scale: currentStage === 2 ? 1.05 : 1,
                    x: Math.sin(idx + 1) * 60,
                    y: Math.cos(idx + 1) * 40
                  }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all ${
                    currentStage === 2
                      ? 'bg-indigo-600 text-white shadow-indigo-300'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {currentStage === 2 ? `[${word}]` : word}
                </motion.div>
              ))}
            </div>
          )}

          {/* Stage 4 & 5: Synthesizing pathways & DecisionOS graph */}
          {(currentStage === 3 || currentStage === 4) && (
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                <line x1="150" y1="100" x2="80" y2="40" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="4 4" className="path-flow-animated" />
                <line x1="150" y1="100" x2="220" y2="40" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" className="path-flow-animated" />
                <line x1="150" y1="100" x2="80" y2="160" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" className="path-flow-animated" />
                <line x1="150" y1="100" x2="220" y2="160" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 4" className="path-flow-animated" />
              </svg>

              <div className="relative z-10 w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xl shadow-indigo-500/30 animate-pulse">
                YOU
              </div>
            </div>
          )}

          {/* Stage 6, 7 & 8: Clear Freedom Path emerges & stabilizes */}
          {(currentStage >= 5) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
            >
              {/* Emerging golden / cyan ray */}
              <div className="w-full max-w-sm flex items-center justify-between px-4 py-3 rounded-2xl bg-white shadow-xl border border-indigo-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF9933] animate-ping" />
                  <span className="text-xs font-bold text-slate-900">FREEDOM VECTOR</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-600">STABILIZING 100%</span>
              </div>

              <div className="mt-4 text-xs font-bold tracking-widest text-indigo-600 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Path of Sovereignty Unlocked</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-slate-400 mt-2">
            <span>DECISION ARCHITECT TRANSFORMATION</span>
            <span>{progressPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
