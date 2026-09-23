import React from 'react';
import { Star, Clock, MapPin, Plus, Check } from 'lucide-react';

export default function AttractionCard({ attraction, onToggle }) {
  if (!attraction) return null;

  return (
    <div className={`editorial-card rounded-2xl overflow-hidden border transition-all ${
      attraction.added ? 'border-slate-900 bg-white' : 'border-stone-200 bg-stone-50/50 opacity-90'
    }`}>
      <div className="relative h-36 w-full overflow-hidden bg-slate-100">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-[10px] text-white font-semibold px-2 py-0.5 rounded-md">
          {attraction.category}
        </div>
        <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xs px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{attraction.rating}</span>
        </div>
      </div>

      <div className="p-3.5 space-y-2.5">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">{attraction.name}</h4>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              {attraction.location}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 shrink-0 ml-2">
            {attraction.cost === 0 ? 'Free Entry' : `₹${attraction.cost}`}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs font-mono text-slate-600">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3 text-slate-400" />
            {attraction.duration}
          </span>

          <button
            onClick={() => onToggle && onToggle(attraction.id)}
            className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
              attraction.added
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-stone-100 text-slate-700 border border-stone-200 hover:bg-stone-200'
            }`}
          >
            {attraction.added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Itinerary</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-slate-500" />
                <span>Add to Trip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
