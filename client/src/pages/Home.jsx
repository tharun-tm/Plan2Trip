import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, MapPin, DollarSign, Bus, Route, Bed, Calendar, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const PILLARS = [
    { title: 'Destination', icon: MapPin, color: 'text-brand-400 bg-brand-500/10' },
    { title: 'Budget', icon: DollarSign, color: 'text-emerald-400 bg-emerald-500/10' },
    { title: 'Transport', icon: Bus, color: 'text-blue-400 bg-blue-500/10' },
    { title: 'Route', icon: Route, color: 'text-purple-400 bg-purple-500/10' },
    { title: 'Stay', icon: Bed, color: 'text-teal-400 bg-teal-500/10' },
    { title: 'Itinerary', icon: Calendar, color: 'text-rose-400 bg-rose-500/10' },
  ];

  return (
    <div className="space-y-6 py-2">
      {/* Hero Badge */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          AI for Smart Mobility
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          Plan smarter.<br />
          <span className="bg-gradient-to-r from-brand-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            Travel better.
          </span>
        </h1>

        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto px-2 font-normal">
          Tell us your destination, budget and time. TripWise builds a smarter mobility plan around you.
        </p>
      </div>

      {/* Primary CTA */}
      <div className="px-2">
        <button
          onClick={() => navigate('/plan')}
          className="w-full py-3.5 px-5 bg-gradient-to-r from-brand-600 via-teal-500 to-emerald-400 hover:from-brand-500 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-brand-500/20 flex items-center justify-center space-x-2 text-sm transition-all transform active:scale-[0.98]"
        >
          <span>Plan My Trip</span>
          <ArrowRight className="w-4 h-4 font-bold" />
        </button>
      </div>

      {/* 6 Pillars Mobility Preview Grid */}
      <div className="space-y-2.5 pt-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 text-center">
          Smart Mobility Framework
        </h3>

        <div className="grid grid-cols-3 gap-2 px-1">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-3 text-center space-y-1.5 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl ${pillar.color} flex items-center justify-center mx-auto border border-slate-800`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-200 block leading-tight">
                  {pillar.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobility Philosophy Card */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2 text-xs text-slate-400 leading-relaxed">
        <div className="flex items-center space-x-2 text-slate-200 font-bold">
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          <span>Movement Optimization First</span>
        </div>
        <p>
          TripWise evaluates real transit options, accommodation proximity, and travel duration to keep daily transit effort low and stay strictly within your budget.
        </p>
      </div>
    </div>
  );
}
