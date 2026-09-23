import React from 'react';
import { Utensils, Star, MapPin, Sparkles, ExternalLink, MessageSquare } from 'lucide-react';

export default function RestaurantCard({ restaurant }) {
  if (!restaurant) return null;

  const googleMapsUrl = restaurant.googleMapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(restaurant.name + ' ' + restaurant.location)}`;

  return (
    <div className="editorial-card rounded-2xl overflow-hidden border border-stone-200/90 bg-white space-y-0 flex flex-col justify-between">
      <div>
        {/* Restaurant Cover Image & Ratings Overlay */}
        {restaurant.image && (
          <div className="relative h-36 w-full overflow-hidden bg-slate-100">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 left-2.5 bg-slate-900/85 backdrop-blur-md text-[10px] text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Utensils className="w-3 h-3 text-amber-400" />
              <span>{restaurant.cuisine}</span>
            </div>

            <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{restaurant.rating}</span>
            </div>
          </div>
        )}

        <div className="p-4 space-y-2.5">
          {/* Title & Reviews count */}
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{restaurant.name}</h4>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono font-medium">
                <MessageSquare className="w-3 h-3 text-amber-600" />
                <span>{restaurant.reviewsCount || '1,500+ Google reviews'}</span>
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg shrink-0 ml-2">
              {restaurant.priceRange}
            </span>
          </div>

          {/* Location & Distance */}
          <div className="flex flex-wrap items-center justify-between gap-1 text-xs pt-1 border-t border-stone-100">
            <span className="text-slate-600 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              {restaurant.location}
            </span>
            {restaurant.distance && (
              <span className="text-[10px] text-purple-800 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-md font-mono font-semibold">
                {restaurant.distance}
              </span>
            )}
          </div>

          {/* Must Try Highlight */}
          {restaurant.highlight && (
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl px-3 py-1.5 text-xs text-amber-900 flex items-center space-x-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span className="truncate"><strong>Must Try:</strong> {restaurant.highlight}</span>
            </div>
          )}
        </div>
      </div>

      {/* Google Maps Link Footer */}
      <div className="px-4 pb-4 pt-1">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
        >
          <span>View Menu & Reviews on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 text-purple-700" />
        </a>
      </div>
    </div>
  );
}
