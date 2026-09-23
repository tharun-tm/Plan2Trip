import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, CheckCircle2, Loader2, Sparkles, Navigation, ShieldCheck } from 'lucide-react';

const MOCK_STAGES = [
  { id: 1, text: 'Understanding your trip parameters...', icon: '🧭' },
  { id: 2, text: 'Comparing transport speed, cost & routes...', icon: '🚌' },
  { id: 3, text: 'Finding suitable stays near key sights...', icon: '🏨' },
  { id: 4, text: 'Optimizing daily sequential route chain...', icon: '🗺️' },
  { id: 5, text: 'Building itemized budget & itinerary...', icon: '✨' },
];

export default function PlanningLoader() {
  const navigate = useNavigate();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < MOCK_STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });

      setProgress((prev) => {
        if (prev < 100) {
          return Math.min(prev + 22, 100);
        }
        return 100;
      });
    }, 600);

    const timer = setTimeout(() => {
      navigate('/trip-overview');
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-6">
      {/* Animated Glowing Logo */}
      <div className="relative">
        <div className="absolute inset-0 bg-brand-500/20 rounded-full blur-xl animate-ping" />
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 via-teal-500 to-emerald-400 p-0.5 shadow-2xl shadow-brand-500/30 flex items-center justify-center mx-auto">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Compass className="w-10 h-10 text-brand-400 animate-spin-slow" />
          </div>
        </div>
      </div>

      {/* Header text */}
      <div className="space-y-1.5 max-w-xs">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[11px] font-bold">
          <Sparkles className="w-3 h-3" />
          Smart Mobility Optimizer
        </div>
        <h2 className="text-lg font-extrabold text-white tracking-tight">Designing Your Trip Plan</h2>
        <p className="text-xs text-slate-400">Synthesizing routes, stays, and budget safety buffers...</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs space-y-2">
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>Optimization Stage</span>
          <span className="font-bold text-brand-400">{progress}%</span>
        </div>
        <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-brand-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stages List */}
      <div className="w-full max-w-xs bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-2.5 text-left">
        {MOCK_STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={stage.id}
              className={`flex items-center space-x-3 p-2 rounded-xl text-xs transition-all ${
                isCurrent
                  ? 'bg-brand-500/10 border border-brand-500/30 text-white font-semibold'
                  : isDone
                  ? 'text-slate-400 opacity-70'
                  : 'text-slate-600'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                ) : (
                  <span className="text-xs">{stage.icon}</span>
                )}
              </div>
              <span className="truncate">{stage.text}</span>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="text-[10px] text-slate-500 max-w-xs flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3 text-brand-400" />
        Preparing structured mobility mock data for results screen
      </div>
    </div>
  );
}
