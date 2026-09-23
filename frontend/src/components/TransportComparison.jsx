import React from 'react';
import { Bus, Train, Car, X, Info } from 'lucide-react';

export default function TransportComparison({ options = [], selectedId, onClose }) {
  const getIcon = (type) => {
    switch (type) {
      case 'Train': return <Train className="w-5 h-5 text-slate-800" />;
      case 'Car': return <Car className="w-5 h-5 text-slate-800" />;
      default: return <Bus className="w-5 h-5 text-slate-800" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white border border-stone-200 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-soft-lg">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div>
            <h3 className="text-base font-bold text-slate-900">Compare Transport Options</h3>
            <p className="text-xs text-slate-500">Evaluating cost, speed, and convenience</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {options.map((opt) => {
            const isSelected = opt.id === selectedId;
            return (
              <div
                key={opt.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-stone-50 border-slate-900 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-sm">
                      {getIcon(opt.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900">{opt.name}</h4>
                        {opt.tag && (
                          <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-full">
                            {opt.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{opt.operator}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-slate-900 font-mono">
                      ₹{opt.totalCost?.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">₹{opt.pricePerPerson}/person</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/80 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Travel Time</span>
                    <span className="font-semibold text-slate-900 font-mono">{opt.travelTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Convenience</span>
                    <span className="font-semibold text-slate-900">{opt.convenience}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Mobility Score</span>
                    <span className="font-bold text-brand-700 font-mono">{opt.recommendationScore}/100</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 leading-relaxed flex items-start space-x-2">
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{opt.why}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-stone-50 border-t border-stone-200 text-[11px] text-slate-500 text-center font-medium">
          Mock data structured for future IRCTC & Amadeus API integration.
        </div>
      </div>
    </div>
  );
}
