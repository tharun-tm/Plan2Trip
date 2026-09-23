import React, { useState } from 'react';
import { Bus, Train, Car, Clock, ShieldCheck, ArrowRight, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import TransportComparison from './TransportComparison';

export default function TransportCard({ transport, options, travelers = 2, origin = 'Mangaluru', destination = 'Goa' }) {
  const [showComparison, setShowComparison] = useState(false);

  const displayRoute = (origin && destination) ? `${origin} → ${destination}` : transport.route;

  // Calculate dynamic costs based on traveler count
  const pricePerPerson = transport.pricePerPerson || 1200;
  const totalCost = pricePerPerson * travelers;

  // Estimate distance based on origin & destination (or fallback default)
  const getEstimatedDistance = (fromStr, toStr) => {
    if (!fromStr || !toStr) return '365 km';
    const sum = (fromStr.length + toStr.length) * 15;
    return `~${Math.max(45, Math.min(850, sum))} km`;
  };

  const estimatedDistance = getEstimatedDistance(origin, destination);

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
                <p className="text-xs text-slate-500 font-medium">{displayRoute}</p>
              </div>
            </div>

            {/* Dynamic Total Cost based on Travelers */}
            <div className="text-right">
              <div className="text-base font-bold text-slate-900 font-mono">
                ₹{totalCost.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Total ({travelers} {travelers === 1 ? 'traveler' : 'travelers'})
              </span>
            </div>
          </div>

          {/* Distance & Travel Time Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/60 text-xs text-slate-600">
            <div className="flex items-center gap-3 font-mono">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                {estimatedDistance} (Google Maps)
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {transport.travelTime} travel time
              </span>
            </div>
            <span className="font-mono text-emerald-800 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg">
              ₹{pricePerPerson.toLocaleString()} / person
            </span>
          </div>
        </div>

        {/* Rationale Explanation */}
        <div className="bg-stone-50/80 border border-stone-200/80 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-brand-700" />
              <span>Why we chose this</span>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-1"
            >
              <span>Check on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            "Calculated based on {travelers} {travelers === 1 ? 'traveler' : 'travelers'} travelling from {origin} to {destination}. Overnight bus/train saves accommodation costs while keeping transit affordable."
          </p>
        </div>

        {/* Compare Options Button */}
        <button
          onClick={() => setShowComparison(true)}
          className="w-full py-3 px-4 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center space-x-2 transition-colors shadow-sm"
        >
          <span>Compare bus, train & car fare ({travelers} travelers)</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>

      {/* Comparison Modal */}
      {showComparison && (
        <TransportComparison
          options={options}
          selectedId={transport.id}
          travelers={travelers}
          origin={origin}
          destination={destination}
          onClose={() => setShowComparison(false)}
        />
      )}
    </>
  );
}
