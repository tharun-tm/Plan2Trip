import React from 'react';
import { Utensils, Star, MapPin, DollarSign, Sparkles } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  return (
    <div className="glass-card rounded-2xl p-3.5 border border-slate-800 space-y-2 bg-slate-900/60">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">{restaurant.name}</h4>
            <p className="text-[11px] text-slate-400">{restaurant.cuisine}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{restaurant.rating}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
        <span className="text-slate-400 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-500" />
          {restaurant.location}
        </span>
        <span className="font-mono text-emerald-400 font-semibold">{restaurant.priceRange}</span>
      </div>

      {restaurant.highlight && (
        <div className="bg-amber-950/20 border border-amber-500/20 rounded-lg px-2.5 py-1 text-[10px] text-amber-300 flex items-center space-x-1.5">
          <Sparkles className="w-3 h-3 shrink-0 text-amber-400" />
          <span className="truncate">Top Dish: {restaurant.highlight}</span>
        </div>
      )}
    </div>
  );
}
