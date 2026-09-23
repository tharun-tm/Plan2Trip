import React, { useState } from 'react';
import { Bus, Train, Car, Clock, ShieldCheck, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';
import TransportComparison from './TransportComparison';

export default function TransportCard({ transport, options, travelers = 2 }) {
  const [showComparison, setShowComparison] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-blue-400" />;
      case 'Car': return <Car className="w-5 h-5 text-purple-400" />;
      default: return <Bus className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <>
      <div className="glass-panel rounded-2xl p-4 border border-brand-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 space-y-3.5 relative overflow-hidden">
        {/* Recommended Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">Smart Mobility Match</span>
              <h3 className="text-sm font-bold text-white">Best Way to Get There</h3>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Score {transport.efficiencyScore || 94}/100
          </span>
        </div>

        {/* Transport Detail Card */}
        <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                {getIcon(transport.type)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">{transport.type} • {transport.title}</h4>
                <p className="text-xs text-slate-400 font-medium">{transport.route}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-xs">
            <div className="flex items-center space-x-1.5 text-slate-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{transport.travelTime} duration</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400">₹{transport.pricePerPerson.toLocaleString()} / person</span>
              <div className="text-xs font-bold text-brand-400 font-mono">
                Total: ₹{transport.totalCost.toLocaleString()} ({travelers} travelers)
              </div>
            </div>
          </div>
        </div>

        {/* Why We Chose This */}
        <div className="bg-brand-950/20 border border-brand-500/20 rounded-xl p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-brand-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why We Chose This</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            "{transport.reason || 'Best balance of cost, travel time and convenience for your budget.'}"
          </p>
        </div>

        {/* Compare Options CTA */}
        <button
          onClick={() => setShowComparison(true)}
          className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center space-x-2 transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-brand-400" />
          <span>Compare All Transport Modes</span>
        </button>
      </div>

      {/* Transport Comparison Modal */}
      {showComparison && (
        <TransportComparison
          options={options}
          selectedId={transport.id}
          onClose={() => setShowComparison(false)}
        />
      )}
    </>
  );
}
