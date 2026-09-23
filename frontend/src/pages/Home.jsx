import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bus, Bed, MapPin, Route, ShieldCheck, Sparkles, CheckCircle2, Clock, Navigation } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const MOBILITY_FEATURES = [
    {
      num: '01',
      title: 'Smart Transport',
      description: 'Find the best transportation option based on cost, travel time and convenience.',
      icon: Bus,
      tag: 'Transit Choice'
    },
    {
      num: '02',
      title: 'Optimized Routes',
      description: 'Reduce unnecessary travel by intelligently organizing your destinations in sequence.',
      icon: Route,
      tag: 'Distance Saver'
    },
    {
      num: '03',
      title: 'Budget-Aware Stays',
      description: 'Recommend accommodation that fits the budget while keeping daily travel distances low.',
      icon: Bed,
      tag: 'Strategic Stay'
    },
    {
      num: '04',
      title: 'Adaptive Itinerary',
      description: 'Build a day-by-day plan around your available time without backtracking.',
      icon: MapPin,
      tag: 'Time Efficiency'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-4 md:py-8">
      {/* Editorial Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-slate-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            <span>AI for Smart Mobility</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] font-sans">
              Plan smarter.<br />
              <span className="text-brand-700">Travel better.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              AI-powered trip planning that finds the best way to move, stay and explore within your budget.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              onClick={() => navigate('/plan')}
              className="py-4 px-8 bg-slate-900 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-soft transition-all flex items-center justify-center space-x-2 text-base"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-700" />
              <span>Real-world routes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-700" />
              <span>Budget enforced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-700" />
              <span>No AI hallucinations</span>
            </div>
          </div>
        </div>

        {/* Right Composition Column (Desktop Visual Composition & Mobile Card Stack) */}
        <div className="lg:col-span-5 relative">
          <div className="relative space-y-4 lg:space-y-0">
            {/* Main Destination Card */}
            <div className="editorial-card rounded-3xl p-5 space-y-4 lg:transform lg:rotate-1 lg:hover:rotate-0 transition-transform">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
                  alt="Goa Beach Destination"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-semibold text-xs px-2.5 py-1 rounded-lg">
                  Goa • 3 Days
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm font-mono">
                  Budget: ₹12,000
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">Mangaluru → Goa Mobility Escape</h3>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    Saved ₹1,700
                  </span>
                </div>
                <p className="text-xs text-slate-500">Overnight Sleeper Bus + Panaji Central Stay + Fontainhas Walk</p>
              </div>

              {/* Overlapping Floating Sub-Cards */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-xs">
                  <div className="flex items-center gap-1 text-brand-700 font-semibold text-[11px]">
                    <Bus className="w-3.5 h-3.5" />
                    <span>Express Sleeper</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">₹2,400 (7h 30m)</div>
                </div>

                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-xs">
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <Bed className="w-3.5 h-3.5" />
                    <span>SeaBreeze Eco Stay</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">12m to sights</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Mobility Message Section */}
      <section className="space-y-8 pt-6 border-t border-stone-200/80">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5" />
            <span>Why Plan2Trip</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your trip, optimized around you.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Plan2Trip considers your budget, time, destination and preferences to build a mobility-first travel plan.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOBILITY_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.num}
                className="editorial-card rounded-2xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-stone-400">{feat.num}</span>
                    <div className="w-8 h-8 rounded-xl bg-stone-100 text-slate-800 flex items-center justify-center border border-stone-200">
                      <Icon className="w-4 h-4 text-brand-700" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded-md">
                    {feat.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
