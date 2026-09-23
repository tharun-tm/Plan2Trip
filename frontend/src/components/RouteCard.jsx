import React from 'react';
import { Route, Navigation, ShieldCheck, MapPin, ArrowRight, Clock } from 'lucide-react';

export default function RouteCard({ smartRoute }) {
  if (!smartRoute) return null;

  return (
    <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Movement Chain</span>
            <h3 className="text-base font-bold text-slate-900">Smart Route Optimization</h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Avg Transit</span>
          <span className="text-xs font-mono font-bold text-purple-700">{smartRoute.avgTransitBetweenSights}</span>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-normal">
        Sequentially planned itinerary path designed to minimize daily travel distance and prevent backtrack commuting.
      </p>

      {/* Desktop Horizontal Route Chain (md:flex) */}
      <div className="hidden md:flex items-center justify-between gap-2 overflow-x-auto pb-2 pt-2">
        {smartRoute.nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 min-w-[140px] flex-1 space-y-1 text-center">
              <span className="text-base block">{node.icon || '📍'}</span>
              <h4 className="text-xs font-bold text-slate-900 truncate">{node.title}</h4>
              <span className="text-[10px] text-slate-500 font-mono block">{node.time}</span>
            </div>
            {index < smartRoute.nodes.length - 1 && (
              <div className="flex flex-col items-center justify-center shrink-0 px-1 text-[10px] text-slate-400 font-mono">
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span className="text-[9px] text-slate-500 whitespace-nowrap">{node.transitFromPrev || '12 mins'}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Vertical Route Timeline (md:hidden) */}
      <div className="md:hidden relative pl-4 space-y-3.5 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
        {smartRoute.nodes.map((node) => (
          <div key={node.id} className="relative flex items-start space-x-3">
            <div className="relative z-10 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-sm shrink-0">
              <span>{node.icon || '📍'}</span>
            </div>

            <div className="flex-1 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-0.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{node.title}</h4>
                <span className="text-[10px] font-mono text-slate-500 font-medium">{node.time}</span>
              </div>

              {node.transitFromPrev && (
                <div className="flex items-center space-x-1 text-[10px] text-purple-700 font-mono pt-0.5 font-semibold">
                  <Navigation className="w-3 h-3 rotate-45" />
                  <span>Transit: {node.transitFromPrev}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 text-xs text-slate-600 flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
        <span>Saves approximately <strong>45 mins</strong> daily travel time compared to unoptimized tourist routes.</span>
      </div>
    </div>
  );
}
