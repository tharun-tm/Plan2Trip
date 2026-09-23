import React from 'react';
import { Utensils, Star, MapPin, Sparkles } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  return (
    <div className="editorial-card rounded-2xl p-4 space-y-2.5">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-700">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">{restaurant.name}</h4>
            <p className="text-xs text-slate-500">{restaurant.cuisine}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs font-bold text-slate-900 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200 font-mono">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{restaurant.rating}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
        <span className="text-slate-500 flex items-center gap-1 font-medium">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {restaurant.location}
        </span>
        <span className="font-mono text-slate-900 font-semibold">{restaurant.priceRange}</span>
      </div>

      {restaurant.highlight && (
        <div className="bg-stone-50 border border-stone-200/80 rounded-xl px-3 py-1.5 text-xs text-slate-700 flex items-center space-x-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-600" />
          <span className="truncate">Must Try: {restaurant.highlight}</span>
        </div>
      )}
    </div>
  );
}
