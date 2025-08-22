import React, { useEffect, useState } from 'react';
import ThreeBackground from './ThreeBackground';
import Logo3D from './Logo3D';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [nameIndex, setNameIndex] = useState(0);
  const name = 'Mohamed Atef Abdelsattar';

  useEffect(() => {
    let rafId: number;
    let startTs: number | null = null;

    const durationMs = 2600;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (progress >= 100 && nameIndex >= name.length) {
      const t = setTimeout(() => onLoadingComplete(), 400);
      return () => clearTimeout(t);
    }
  }, [progress, nameIndex, name.length, onLoadingComplete]);

  useEffect(() => {
    if (nameIndex >= name.length) return;
    const timer = setTimeout(() => {
      setNameIndex(prev => prev + 1);
    }, 70);
    return () => clearTimeout(timer);
  }, [nameIndex, name.length]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <ThreeBackground />

      <div className="relative text-center space-y-8">
        <div className="relative w-44 h-44 md:w-56 md:h-56 mx-auto rounded-full pop-in">
          <div className="blue-bloom" aria-hidden="true" />
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
            <circle
              cx="50" cy="50" r="44" fill="none" strokeWidth="5"
              strokeLinejoin="round" strokeLinecap="round"
              stroke="url(#gradBlue)"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${(1 - progress / 100) * 2 * Math.PI * 44}`}
            />
            <defs>
              <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center neon-3d-blue">
            <Logo3D />
          </div>
          {/* blue-only enhanced rings */}
          <div className="ring-blue-glow" aria-hidden="true" />
          <div className="ring-blue" aria-hidden="true" />
          <div className="ring-blue-dots" aria-hidden="true" />
          <div className="meteor" aria-hidden="true"><div className="meteor-dot" /></div>
          <div className="ring-runner-blue" aria-hidden="true" />
          <div className="absolute inset-[-6px] rounded-full ring-sheen-blue animate-spin-very-slow" aria-hidden="true" />
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-blue-400/30 animate-spin-reverse" aria-hidden="true" />
          <div className="absolute inset-0 rotate-slower rounded-full border-t-2 border-blue-400/30" aria-hidden="true" />
        </div>

        {/* Centered Progress Only */}
        <div className="space-y-2 mt-6">
          <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-400/50"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute inset-y-0 left-0 w-16 bg-white/10 blur-md rounded-full pointer-events-none animate-sweep" />
          </div>
          <p className="text-lg text-blue-300 font-mono">{progress}%</p>
        </div>

        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom-fixed typed name */}
      <div className="absolute inset-x-0 bottom-6 md:bottom-8 lg:bottom-10 z-20">
        <div className="text-center">
          <span className="text-2xl md:text-3xl font-semibold tracking-wide bg-gradient-to-r from-blue-300 via-blue-400 to-blue-200 bg-clip-text text-transparent">
            {name.slice(0, nameIndex)}
          </span>
          <span className="typing-caret">|</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;