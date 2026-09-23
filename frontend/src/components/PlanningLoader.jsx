import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

const MOCK_STAGES = [
  { id: 1, text: 'Understanding your trip parameters...', icon: '🧭' },
  { id: 2, text: 'Comparing travel options (cost, time, convenience)...', icon: '🚌' },
  { id: 3, text: 'Finding suitable stays near key sights...', icon: '🏨' },
  { id: 4, text: 'Optimizing your route sequence...', icon: '🗺️' },
  { id: 5, text: 'Building your day-by-day itinerary...', icon: '✨' },
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
    <div className="max-w-md mx-auto min-h-[65vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      {/* Icon Logo Container */}
      <div className="w-20 h-20 rounded-3xl bg-slate-900 text-white flex items-center justify-center shadow-soft-lg">
        <Compass className="w-10 h-10 text-brand-500 animate-spin" />
      </div>

      {/* Header text */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mobility Optimizer Engine</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Designing Your Trip Plan</h2>
        <p className="text-xs text-slate-600">Calculating routes, stays, and budget safety buffers...</p>
      </div>

      {/* Progress Meter */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs font-mono font-semibold text-slate-600">
          <span>Optimization Progress</span>
          <span className="text-brand-700 font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-slate-900 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stages List */}
      <div className="w-full editorial-card rounded-2xl p-4 space-y-2.5 text-left">
        {MOCK_STAGES.map((stage, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;

          return (
            <div
              key={stage.id}
              className={`flex items-center space-x-3 p-2.5 rounded-xl text-xs font-medium transition-all ${
                isCurrent
                  ? 'bg-brand-50 text-brand-900 font-bold border border-brand-100'
                  : isDone
                  ? 'text-slate-500 opacity-70'
                  : 'text-slate-400'
              }`}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-brand-700 animate-spin" />
                ) : (
                  <span className="text-xs">{stage.icon}</span>
                )}
              </div>
              <span className="truncate">{stage.text}</span>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-700" />
        Generating factual structured travel plan
      </div>
    </div>
  );
}
