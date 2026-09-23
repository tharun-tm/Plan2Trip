import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Sparkles, Bus, Train } from 'lucide-react';

const POPULAR_ROUTES = [
  {
    id: 'route-1',
    origin: 'Bengaluru',
    destination: 'Coorg',
    duration: '3 Days / 2 Nights',
    estBudget: '₹8,500',
    bestMode: 'KSRTC Volvo Airavat Bus (6h 30m)',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1609828913664-85888a70669b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Taj Mahal', 'Agra Fort', 'Petha Food Trail'],
    mobilityScore: 98,
    tag: 'Fastest Express Route'
  }
];

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4 md:py-8">
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Mobility Corridors</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore Popular Smart Routes</h1>
        <p className="text-sm text-slate-600">Discover pre-calculated efficient routes with verified transit and stay options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {POPULAR_ROUTES.map((route) => (
          <div
            key={route.id}
            className="editorial-card rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={route.image}
                  alt={route.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  {route.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                  Est: {route.estBudget}
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{route.origin}</span>
                    <span className="text-brand-700 font-mono">→</span>
                    <span className="text-slate-800">{route.destination}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{route.duration}</p>
                </div>

                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-xs text-slate-700">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Optimal Transit:</span>
                  <span className="font-semibold text-slate-900">{route.bestMode}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {route.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] bg-stone-100 text-slate-600 border border-stone-200/80 px-2 py-0.5 rounded-md font-medium">
                      • {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => navigate('/plan')}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                <span>Customize This Route</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
