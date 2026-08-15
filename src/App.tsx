import React, { useState, useEffect } from 'react';
import { AppStep, FreedomMapData } from './types';
import { generateDeterministicFreedomMap } from './lib/freedomEngine';
import { Navbar } from './components/Navbar';
import { HeroView } from './components/HeroView';
import { InputView } from './components/InputView';
import { CinematicTransition } from './components/CinematicTransition';
import { FreedomMapGraph } from './components/FreedomMapGraph';
import { AccessibleMapView } from './components/AccessibleMapView';
import { ReflectionView } from './components/ReflectionView';
import { ShareModal } from './components/ShareModal';

export default function App() {
  const [step, setStep] = useState<AppStep>('hero');
  const [counter, setCounter] = useState<number>(2000);
  const [activeThought, setActiveThought] = useState<string>('');
  const [freedomData, setFreedomData] = useState<FreedomMapData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAccessible, setShowAccessible] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [isQueuedNotice, setIsQueuedNotice] = useState<boolean>(false);

  // Fetch initial anonymous counter starting from 2000
  useEffect(() => {
    fetch('/api/counter')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number' && data.count >= 2000) {
          setCounter(data.count);
        } else {
          setCounter(2000);
        }
      })
      .catch(() => {
        setCounter(2000);
      });
  }, []);

  // Handle thought submission with +5 increment
  const handleThoughtSubmit = async (thought: string) => {
    setActiveThought(thought);
    setIsLoading(true);
    setErrorNotice(null);
    setIsQueuedNotice(false);
    setStep('processing');

    // Optimistically increment counter by +5
    setCounter(prev => Math.max(2000, prev + 5));

    // If server takes more than 1.8 seconds (under heavy load/traffic), flag queued notice
    const queueTimer = setTimeout(() => {
      setIsQueuedNotice(true);
    }, 1800);

    // Kick off server AI call in parallel with cinematic animation
    try {
      const res = await fetch('/api/generate-freedom-map', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought })
      });

      clearTimeout(queueTimer);

      if (res.ok) {
        const json = await res.json();
        if (json?.data) {
          setFreedomData(json.data);
          if (json.counter && json.counter >= 2000) {
            setCounter(json.counter);
          }
          if (json.highTraffic || json.queued) {
            setIsQueuedNotice(true);
          }
          return;
        }
      }
      // If server returned non-ok or rate limited, generate deterministic fallback smoothly
      const fallback = generateDeterministicFreedomMap(thought);
      setFreedomData(fallback);
    } catch (err) {
      console.warn('High traffic or network latency, engaging deterministic engine:', err);
      const fallback = generateDeterministicFreedomMap(thought);
      setFreedomData(fallback);
    } finally {
      clearTimeout(queueTimer);
      setIsLoading(false);
    }
  };

  // Called when cinematic 8-stage transition finishes
  const handleCinematicComplete = () => {
    if (!freedomData && activeThought) {
      // Ensure data is ready
      const fallback = generateDeterministicFreedomMap(activeThought);
      setFreedomData(fallback);
    }
    setStep('map');
  };

  const handleReset = () => {
    setStep('hero');
    setActiveThought('');
    setFreedomData(null);
    setShowAccessible(false);
    setShareModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <Navbar
        currentStep={step}
        counter={counter}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {step === 'hero' && (
          <HeroView
            counter={counter}
            onStart={() => setStep('input')}
          />
        )}

        {step === 'input' && (
          <InputView
            onSubmit={handleThoughtSubmit}
            isLoading={isLoading}
          />
        )}

        {step === 'processing' && (
          <CinematicTransition
            thought={activeThought}
            isQueued={isQueuedNotice}
            onComplete={handleCinematicComplete}
          />
        )}

        {step === 'map' && freedomData && !showAccessible && (
          <FreedomMapGraph
            data={freedomData}
            onShare={() => setShareModalOpen(true)}
            onViewAccessible={() => setShowAccessible(true)}
            onViewReflection={() => setStep('reflection')}
            onReset={handleReset}
          />
        )}

        {step === 'map' && freedomData && showAccessible && (
          <AccessibleMapView
            data={freedomData}
            onBackToGraph={() => setShowAccessible(false)}
            onShare={() => setShareModalOpen(true)}
            onReset={handleReset}
          />
        )}

        {step === 'reflection' && freedomData && (
          <ReflectionView
            data={freedomData}
            onBackToMap={() => setStep('map')}
            onNewThought={handleReset}
            onShare={() => setShareModalOpen(true)}
          />
        )}
      </main>

      {/* Share Modal Dialog */}
      {freedomData && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          data={freedomData}
          onNewMap={handleReset}
        />
      )}
    </div>
  );
}
