import React from 'react';
import { Star, Clock, MapPin, Plus, Check, Landmark } from 'lucide-react';

export default function AttractionCard({ attraction, onToggle }) {
  if (!attraction) return null;

  return (
    <div className={`glass-card rounded-2xl overflow-hidden border transition-all ${
      attraction.added ? 'border-brand-500/40 bg-slate-900/90' : 'border-slate-800/80 bg-slate-900/50 opacity-90'
    }`}>
      <div className="relative h-28 w-full overflow-hidden bg-slate-800">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-[10px] text-slate-300 font-semibold px-2 py-0.5 rounded-md border border-slate-800">
          {attraction.category}
        </div>
        <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-xs px-2 py-0.5 rounded-full flex items-center space-x-1 border border-slate-800">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{attraction.rating}</span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xs font-bold text-white leading-tight">{attraction.name}</h4>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-500" />
              {attraction.location}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 ml-2">
            {attraction.cost === 0 ? 'Free Entry' : `₹${attraction.cost}`}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-brand-400" />
            {attraction.duration}
          </span>

          <button
            onClick={() => onToggle && onToggle(attraction.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
              attraction.added
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
            }`}
          >
            {attraction.added ? (
              <>
                <Check className="w-3 h-3 text-brand-400" />
                <span>In Itinerary</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3 text-slate-400" />
                <span>Add to Trip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
