import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass, ArrowRight, Zap, ShieldCheck, Flame } from 'lucide-react';

const POPULAR_ROUTES = [
  {
    id: 'route-1',
    origin: 'Bengaluru',
    destination: 'Coorg',
    duration: '3 Days / 2 Nights',
    estBudget: '₹8,500',
    bestMode: 'KSRTC Volvo Airavat Bus (6h 30m)',
    highlights: ['Abbey Falls', 'Raja Seat Sunset', 'Coffee Estate Stay'],
    mobilityScore: 96,
    tag: 'Top Eco Escape'
  },
  {
    id: 'route-2',
    origin: 'Mumbai',
    destination: 'Lonavala & Khandala',
    duration: '2 Days / 1 Night',
    estBudget: '₹4,500',
    bestMode: 'Deccan Express Train (2h 15m)',
    highlights: ['Tiger Leap', 'Karla Caves', 'Local Chikki Spots'],
    mobilityScore: 92,
    tag: 'Weekend Transit Match'
  },
  {
    id: 'route-3',
    origin: 'Delhi',
    destination: 'Agra',
    duration: '1 Day Express',
    estBudget: '₹3,200',
    bestMode: 'Gatimaan Express Train (1h 40m)',
    highlights: ['Taj Mahal', 'Agra Fort', 'Petha Food Trail'],
    mobilityScore: 98,
    tag: 'Fastest Transit Route'
  }
];

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-1 text-center">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-bold">
          <Flame className="w-3 h-3 text-amber-400" />
          Popular Smart Mobility Routes
        </div>
        <h1 className="text-xl font-extrabold text-white">Explore Optimized Paths</h1>
        <p className="text-xs text-slate-400">Discover pre-calculated efficient routes with verified transit options.</p>
      </div>

      <div className="space-y-3">
        {POPULAR_ROUTES.map((route) => (
          <div
            key={route.id}
            className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-md">
                  {route.tag}
                </span>
                <h3 className="text-base font-bold text-white mt-1.5 flex items-center gap-1.5">
                  <span>{route.origin}</span>
                  <span className="text-brand-400 font-mono">→</span>
                  <span className="text-teal-300">{route.destination}</span>
                </h3>
                <p className="text-xs text-slate-400">{route.duration}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400 block">{route.estBudget}</span>
                <span className="text-[10px] text-slate-500 font-mono">Score {route.mobilityScore}/100</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
              <span className="text-slate-500 block text-[10px]">Optimal Transit Mode:</span>
              <span className="text-blue-300 font-semibold">{route.bestMode}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {route.highlights.map((h, i) => (
                <span key={i} className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md">
                  • {h}
                </span>
              ))}
            </div>

            <button
              onClick={() => navigate('/plan')}
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Customize This Route</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
