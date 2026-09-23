import React from 'react';
import { Route, Navigation, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function RouteCard({ smartRoute }) {
  if (!smartRoute) return null;

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Route className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Mobility Route Chain</span>
            <h3 className="text-sm font-bold text-white">Smart Route Optimization</h3>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">Avg. Transit</span>
          <span className="text-xs font-mono font-bold text-purple-300">{smartRoute.avgTransitBetweenSights}</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Optimized sequential path designed to minimize travel time and eliminate backtrack commute loops.
      </p>

      {/* Visual Route Nodes */}
      <div className="relative pl-4 space-y-4 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-brand-500 before:via-purple-500 before:to-emerald-500">
        {smartRoute.nodes.map((node, index) => (
          <div key={node.id} className="relative flex items-start space-x-3">
            {/* Node Icon Circle */}
            <div className="relative z-10 w-7 h-7 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center text-xs shadow-md shadow-purple-500/10 shrink-0">
              <span>{node.icon || '📍'}</span>
            </div>

            {/* Node Details */}
            <div className="flex-1 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-200">{node.title}</h4>
                <span className="text-[10px] font-mono text-slate-500">{node.time}</span>
              </div>

              {node.transitFromPrev && (
                <div className="flex items-center space-x-1.5 text-[10px] text-purple-400 font-mono pt-1">
                  <Navigation className="w-3 h-3 text-purple-400 rotate-45" />
                  <span>Transit: {node.transitFromPrev}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobility Advantage Footer */}
      <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
        <span>Saves approximately <strong>45 mins</strong> daily compared to unoptimized tourist routes.</span>
      </div>
    </div>
  );
}
