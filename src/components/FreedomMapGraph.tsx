import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText, 
  Compass, 
  ChevronRight, 
  Zap,
  Activity
} from 'lucide-react';
import { FreedomMapData, MapNode, MapEdge } from '../types';
import { buildGraphNodesAndEdges } from '../lib/freedomEngine';

interface FreedomMapGraphProps {
  data: FreedomMapData;
  onShare: () => void;
  onViewAccessible: () => void;
  onViewReflection: () => void;
  onReset: () => void;
}

export const FreedomMapGraph: React.FC<FreedomMapGraphProps> = ({
  data,
  onShare,
  onViewAccessible,
  onViewReflection,
  onReset
}) => {
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [realtimeTelemetry, setRealtimeTelemetry] = useState({
    fps: 60,
    vectorsCalculated: 6,
    pathPurity: '99.8%',
    activeFlowHz: 120
  });

  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trigger real-time map generation telemetry on mount
  useEffect(() => {
    setIsSynthesizing(true);
    const timer = setTimeout(() => {
      setIsSynthesizing(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [data]);

  // Real-time telemetry pulse loop
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeTelemetry(prev => ({
        ...prev,
        activeFlowHz: 118 + Math.floor(Math.random() * 6),
        fps: 59 + Math.floor(Math.random() * 3)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const { nodes, edges } = buildGraphNodesAndEdges(data, isMobile);

  useEffect(() => {
    const towardNode = nodes.find(n => n.id === 'toward') || nodes[0];
    setSelectedNode(towardNode);
  }, [data]);

  const handleTriggerRealtimeGeneration = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
    }, 1200);
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-element') || (e.target as HTMLElement).closest('.interactive-control')) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStartRef.current.x,
      y: touch.clientY - dragStartRef.current.y
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const activeEdgeIds = new Set(
    edges
      .filter(e => e.active || (selectedNode && (e.source === selectedNode.id || e.target === selectedNode.id)))
      .map(e => e.id)
  );

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col bg-white text-slate-900 overflow-hidden select-none">
      
      {/* Top Ambient Telemetry Pill Header */}
      <div className="z-10 w-full max-w-6xl mx-auto px-4 pt-3 sm:pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50/90 border border-slate-200/80 text-[11px] font-mono text-slate-600 shadow-xs backdrop-blur-md">
          {/* Micro tricolor indicator */}
          <div className="flex items-center space-x-0.5">
            <span className="w-1.5 h-3 bg-[#FF9933] rounded-full" />
            <span className="w-1.5 h-3 bg-blue-700 rounded-full" />
            <span className="w-1.5 h-3 bg-[#138808] rounded-full" />
          </div>
          <span className="font-bold text-slate-800 tracking-wider">FREEDOM VECTOR MATRIX</span>
          <span>•</span>
          <span>{realtimeTelemetry.fps} FPS</span>
          <span>•</span>
          <span>{realtimeTelemetry.activeFlowHz} Hz Flux</span>
        </div>

        {/* Zoom & Pan Controls */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-full border border-slate-200 shadow-xs">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.15, 1.8))}
            className="interactive-control p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.15, 0.6))}
            className="interactive-control p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="interactive-control p-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        className={`relative flex-1 w-full overflow-hidden bg-grid-dots ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Indian Flag Tricolor Ambient Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] pointer-events-none -z-10 flex flex-col items-center justify-between opacity-35 blur-3xl">
          <div className="w-full h-1/3 bg-[#FF9933]/30 rounded-t-full" />
          <div className="w-full h-1/3 bg-blue-100/30" />
          <div className="w-full h-1/3 bg-[#138808]/30 rounded-b-full" />
        </div>

        {/* Real-time Synthesis Laser-Sweep Overlay */}
        <AnimatePresence>
          {isSynthesizing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-center items-center"
            >
              <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-[1px]" />
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#FF9933] via-blue-600 to-[#138808] shadow-[0_0_20px_#FF9933]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transform container for zoom and pan */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            width: '1000px',
            height: '750px',
            margin: '0 auto',
            position: 'relative'
          }}
          className="mx-auto"
        >
          {/* SVG Connection Lines & Trailing Particles with Indian Tricolor Gradients */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 750">
            <defs>
              {/* Indian Flag Exact Gradients */}
              <linearGradient id="grad-saffron" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF9933" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="grad-green" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#138808" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="grad-tricolor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9933" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#138808" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#0284C7" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#138808" stopOpacity="0.75" />
              </linearGradient>

              {/* Particle Glow Filter */}
              <filter id="immersive-particle-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3.5" result="blur1" />
                <feGaussianBlur stdDeviation="1.5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {edges.map((edge) => {
              const srcNode = nodes.find(n => n.id === edge.source);
              const tgtNode = nodes.find(n => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              const isHighlighted = activeEdgeIds.has(edge.id) || edge.active;
              
              // Map edge types to Tricolor gradient lines
              let strokeUrl = 'url(#grad-tricolor)';
              if (tgtNode.type === 'toward') strokeUrl = 'url(#grad-saffron)';
              if (tgtNode.type === 'step') strokeUrl = 'url(#grad-green)';

              const strokeColor = tgtNode.type === 'toward' ? '#FF9933' : tgtNode.type === 'step' ? '#138808' : '#0284C7';

              // Smooth bezier curve calculation
              const dx = tgtNode.x - srcNode.x;
              const dy = tgtNode.y - srcNode.y;
              const cx1 = srcNode.x + dx * 0.25;
              const cy1 = srcNode.y + dy * 0.75;
              const pathD = `M ${srcNode.x} ${srcNode.y} C ${cx1} ${cy1}, ${srcNode.x + dx * 0.75} ${srcNode.y + dy * 0.25}, ${tgtNode.x} ${tgtNode.y}`;

              const animDuration = edge.active ? "2.2s" : "2.8s";

              return (
                <g key={edge.id}>
                  {/* Subtle outer glow on active vector */}
                  {isHighlighted && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={8}
                      strokeOpacity={0.18}
                      filter="url(#immersive-particle-glow)"
                    />
                  )}

                  {/* Main Connection Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={strokeUrl}
                    strokeWidth={isHighlighted ? 2.8 : 2.2}
                    strokeDasharray={tgtNode.type === 'toward' || tgtNode.type === 'step' ? '5 4' : 'none'}
                    className={isHighlighted ? 'path-flow-animated' : ''}
                    strokeOpacity={isHighlighted ? 0.98 : 0.55}
                  />

                  {/* Trailing Particle Cluster Flow */}
                  {isHighlighted && (
                    <g>
                      {/* Core Particle with Tricolor Aura */}
                      <circle r={5} fill="#FFFFFF" stroke={strokeColor} strokeWidth={2} filter="url(#immersive-particle-glow)">
                        <animateMotion
                          path={pathD}
                          dur={animDuration}
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle r={2.5} fill={strokeColor}>
                        <animateMotion
                          path={pathD}
                          dur={animDuration}
                          repeatCount="indefinite"
                        />
                      </circle>
                      {/* Primary Trail Particle */}
                      <circle r={3.5} fill={strokeColor} opacity={0.85}>
                        <animateMotion
                          path={pathD}
                          dur={animDuration}
                          begin="-0.08s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Graph Nodes matching Immersive UI Archetype */}
          {nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const isYou = node.type === 'you';
            const isToward = node.type === 'toward';
            const isFrom = node.type === 'from';
            const isStep = node.type === 'step';
            const isFactor = node.type === 'factor';

            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(node);
                }}
                className={`node-element absolute z-10 cursor-pointer group transition-all duration-200 ${
                  isSelected ? 'scale-105 z-30' : 'hover:scale-102'
                }`}
              >
                {/* Central "YOU" Sovereign Center styled with Ashoka Chakra Navy & subtle 24-spoke geometry */}
                {isYou && (
                  <div className="relative flex items-center justify-center">
                    {/* Concentric Tricolor Ambient Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-sky-300 to-emerald-400 blur-2xl opacity-30 scale-150 animate-pulse-slow" />
                    
                    {/* Tricolor Ring Wrapper */}
                    <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] shadow-2xl transition-transform group-hover:scale-105">
                      <div className="w-32 h-32 rounded-full border-2 border-blue-900 bg-white flex flex-col items-center justify-center z-10 relative overflow-hidden">
                        {/* Subtle 24-spoke Ashoka Chakra background pattern */}
                        <svg className="absolute inset-0 w-full h-full text-blue-900/15 pointer-events-none animate-spin-very-slow" viewBox="0 0 100 100">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <line
                              key={i}
                              x1="50"
                              y1="50"
                              x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
                              y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                          ))}
                          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>

                        <span className="text-base font-black tracking-widest uppercase text-blue-950 z-10">YOU</span>
                        <span className="text-[9px] text-blue-800 font-extrabold tracking-widest uppercase mt-0.5 z-10">SOVEREIGN</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Moving Toward (Top Center - Kesari Saffron / Orange) */}
                {isToward && (
                  <div className="text-center w-72 sm:w-84">
                    <div className="p-[2px] rounded-2xl bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 shadow-xl shadow-orange-500/10">
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md transition-all hover:bg-white">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-[10px] font-bold text-orange-700 tracking-widest uppercase mb-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                          <span>MOVING TOWARD • SAFFRON</span>
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif-display italic font-semibold text-slate-900 leading-tight">
                          {node.title}
                        </h2>
                        <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-orange-600 uppercase tracking-wider font-bold">
                          <span>Ascending Sovereignty</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Freedom From (Left Wing - Tricolor Saffron/White Accent) */}
                {isFrom && (
                  <div className="text-right w-60 sm:w-72">
                    <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-orange-400/90 via-slate-200 to-sky-300 shadow-xl shadow-orange-500/5">
                      <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md transition-all hover:bg-white text-left">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-[10px] font-bold text-orange-600 tracking-widest uppercase mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span>Freedom From</span>
                        </span>
                        <h2 className="text-sm sm:text-base font-semibold leading-snug text-slate-800">
                          "{node.title}"
                        </h2>
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          <span>Dissolving Past Friction</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Levers / Factors (Right Wing - Saffron / Blue / Green) */}
                {isFactor && (
                  <div className="text-left w-56 sm:w-64">
                    <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-slate-200 via-sky-200 to-emerald-200 shadow-md">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md transition-all hover:bg-white">
                        <div className="flex items-center space-x-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: node.color }} />
                          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: node.color }}>
                            {node.label}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                          {node.title}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* First Step (Bottom Center - India Green #138808) */}
                {isStep && (
                  <div className="text-center w-84 sm:w-96">
                    <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-green-600 shadow-xl shadow-emerald-500/15">
                      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/95 backdrop-blur-md transition-all hover:bg-white">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 tracking-widest uppercase mb-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                          <span>FIRST STEP • GREEN GROWTH</span>
                        </span>
                        <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                          "{node.title}"
                        </p>
                        <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-2">
                          Execute within 24-48 hours
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Freedom Statement & Action Center matching Immersive Theme */}
      <div className="relative z-20 bg-white/95 backdrop-blur-md border-t border-slate-100 pt-5 pb-6 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-1.5">
              Freedom Statement
            </p>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              “{data.freedomStatement}”
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
            <button
              onClick={onShare}
              className="px-6 sm:px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share My Map</span>
            </button>

            <button
              onClick={onViewAccessible}
              className="px-6 sm:px-8 py-3 border border-slate-200 text-slate-600 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Structured View</span>
            </button>

            <button
              onClick={onViewReflection}
              className="px-6 sm:px-8 py-3 border border-violet-200 text-violet-700 bg-violet-50/50 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-violet-100 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Reflection</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleTriggerRealtimeGeneration}
              className="px-4 py-3 border border-slate-200 text-slate-500 hover:text-slate-800 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Re-Synthesize Vectors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Re-Synthesize</span>
            </button>
          </div>
        </div>

        {/* Footer Subtext matching Immersive Design layout */}
        <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[9px] text-slate-400 tracking-widest uppercase gap-2">
          <p className="italic">Decision Intelligence for the human experience.</p>
          <p>LYKSPIRE HQ™ / 15 AUG 2026</p>
        </div>
      </div>
    </div>
  );
};
