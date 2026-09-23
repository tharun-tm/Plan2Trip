import React, { useState } from 'react';
import { Bus, Train, Car, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import TransportComparison from './TransportComparison';

export default function TransportCard({ transport, options, travelers = 2 }) {
  const [showComparison, setShowComparison] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-slate-800" />;
      case 'Car': return <Car className="w-5 h-5 text-slate-800" />;
      default: return <Bus className="w-5 h-5 text-slate-800" />;
    }
  };

  return (
    <>
      <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-4">
        {/* Recommended Badge Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center border border-brand-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Transit</span>
              <h3 className="text-base font-bold text-slate-900">Best way to get there</h3>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
            Best Value
          </span>
        </div>

        {/* Transport Detail Box */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm">
                {getIcon(transport.type)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{transport.type} • {transport.title}</h4>
                <p className="text-xs text-slate-500 font-medium">{transport.route}</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-base font-bold text-slate-900 font-mono">
                ₹{transport.totalCost?.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Total ({travelers} travelers)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {transport.travelTime} travel time
            </span>
            <span className="font-mono text-slate-500">₹{transport.pricePerPerson}/person</span>
          </div>
        </div>

        {/* Rationale Explanation */}
        <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-brand-700" />
            <span>Why we chose this</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            "Best balance of travel time, cost and convenience for your budget. Overnight timing saves 1 full night of hotel accommodation spend."
          </p>
        </div>

        {/* Compare Options Button */}
        <button
          onClick={() => setShowComparison(true)}
          className="w-full py-3 px-4 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center space-x-2 transition-colors shadow-sm"
        >
          <span>Compare options</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>

      {/* Comparison Modal */}
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
