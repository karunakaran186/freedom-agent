import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Lightbulb, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface InputViewProps {
  onSubmit: (thought: string) => void;
  isLoading: boolean;
}

const PLACEHOLDERS = [
  "Financial uncertainty and career stagnation...",
  "Overthinking every single decision...",
  "Fear of quitting my job to build something real...",
  "The pressure to constantly live up to expectations...",
  "Feeling stuck between security and ambition...",
  "Fear of making the wrong trade-off..."
];

const INSPIRATION_EXAMPLES = [
  "I want to leave my job but I'm scared about money.",
  "I keep postponing starting my own business.",
  "I don't know whether I should buy a house or invest.",
  "I want to stop overthinking every single decision.",
  "I feel stuck between safety and my actual ambition.",
  "I want more creative and time freedom in my daily life."
];

export const InputView: React.FC<InputViewProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
  };

  const handlePickExample = (example: string) => {
    setInput(example);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-center max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-14 select-none">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        {/* Step Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
            Step 01 • Articulate One Thought
          </span>
        </div>

        {/* Question Header matching Immersive UI typography */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
          What do you want <br className="hidden sm:inline" />
          <span className="text-slate-400 font-light italic">
            freedom from?
          </span>
        </h2>

        <p className="text-slate-500 text-sm sm:text-base mt-2">
          Express whatever is holding you back. Decision Architect agents will interpret your vectors in real-time.
        </p>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="relative rounded-3xl bg-white border-2 border-slate-200 focus-within:border-slate-900 shadow-xl transition-all p-5 sm:p-7">
            <label htmlFor="thoughtInput" className="block text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">
              I want freedom from...
            </label>

            <div className="relative min-h-[140px] sm:min-h-[160px]">
              <textarea
                id="thoughtInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                maxLength={500}
                autoFocus
                placeholder={`e.g., "${PLACEHOLDERS[placeholderIndex]}"`}
                className="w-full h-full bg-transparent text-lg sm:text-2xl font-medium text-slate-900 placeholder:text-slate-300 resize-none focus:outline-none leading-relaxed"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    handleSubmit(e);
                  }
                }}
              />
            </div>

            {/* Bottom Form Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span>{input.length}/500 chars</span>
                <span>•</span>
                <span className="hidden sm:inline">Press Cmd+Enter</span>
              </div>

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md ${
                  input.trim() && !isLoading
                    ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer transform hover:-translate-y-0.5'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Synthesize Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Inspiration Chips */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Select a real scenario to explore:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INSPIRATION_EXAMPLES.map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePickExample(example)}
                className="text-left text-xs sm:text-sm px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Transient runtime memory only. Zero logs. Zero user data storage.</span>
        </div>
      </motion.div>
    </div>
  );
};
