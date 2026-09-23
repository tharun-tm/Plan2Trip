import React from 'react';
import { Bus, Train, Car, X, Check, Award, Clock, DollarSign, Info } from 'lucide-react';

export default function TransportComparison({ options = [], selectedId, onClose }) {
  const getIcon = (type) => {
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-blue-400" />;
      case 'Car': return <Car className="w-5 h-5 text-purple-400" />;
      default: return <Bus className="w-5 h-5 text-brand-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-400" />
              Transport Mobility Comparison
            </h3>
            <p className="text-xs text-slate-400">Comparing speed, cost, and mobility efficiency score</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {options.map((opt) => {
            const isSelected = opt.id === selectedId;
            return (
              <div
                key={opt.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-brand-950/20 border-brand-500/50 shadow-md shadow-brand-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {getIcon(opt.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-xs font-bold text-slate-100">{opt.name}</h4>
                        {opt.tag && (
                          <span className="text-[9px] font-semibold bg-slate-800 text-brand-400 px-1.5 py-0.5 rounded border border-slate-700">
                            {opt.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{opt.operator}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-white font-mono">
                      ₹{opt.totalCost.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">₹{opt.pricePerPerson}/person</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[9px]">Travel Time</span>
                    <span className="font-semibold text-slate-300 font-mono">{opt.travelTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px]">Convenience</span>
                    <span className="font-semibold text-slate-300">{opt.convenience}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[9px]">Mobility Score</span>
                    <span className="font-extrabold text-brand-400 font-mono">{opt.recommendationScore}/100</span>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/60 leading-tight flex items-start space-x-1.5">
                  <Info className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                  <span>{opt.why}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note Disclaimer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 text-center">
          Mock data prepared for upcoming live Amadeus & IRCTC API integration.
        </div>
      </div>
    </div>
  );
}
