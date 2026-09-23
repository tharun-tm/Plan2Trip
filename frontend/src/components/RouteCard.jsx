import React, { useState } from 'react';
import { Route, Navigation, ShieldCheck, MapPin, ArrowRight, Map, List, Compass, Hotel, Landmark, Utensils, ExternalLink } from 'lucide-react';

export default function RouteCard({ smartRoute, origin = 'Mangaluru', destination = 'Goa' }) {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'timeline'
  const [mapCategory, setMapCategory] = useState('route'); // 'route', 'temples', 'hotels', 'attractions', 'food'
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!smartRoute) return null;

  const firstNode = origin || 'Origin';
  const lastNode = destination || 'Destination';

  // Format node titles dynamically to match user selected origin & destination
  const displayNodes = smartRoute.nodes?.map((node, index) => {
    if (index === 0 && origin) {
      return { ...node, title: `${origin} Arrival Hub` };
    }
    return node;
  }) || [];

  // Generate dynamic Google Maps Embed URL based on category
  const getMapEmbedUrl = () => {
    const isRealKey = apiKey && apiKey !== 'your_google_maps_api_key_here';

    if (mapCategory === 'temples') {
      const q = `temples in ${destination} or near ${origin} to ${destination}`;
      return isRealKey
        ? `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(q)}`
        : `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
    }

    if (mapCategory === 'hotels') {
      const q = `hotels and stays in ${destination}`;
      return isRealKey
        ? `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(q)}`
        : `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
    }

    if (mapCategory === 'attractions') {
      const q = `tourist attractions and sights near ${destination}`;
      return isRealKey
        ? `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(q)}`
        : `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
    }

    if (mapCategory === 'food') {
      const q = `restaurants and food near ${destination}`;
      return isRealKey
        ? `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(q)}`
        : `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
    }

    // Default 'route' direction map
    const mapQuery = `${firstNode} to ${lastNode}`;
    return isRealKey
      ? `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${encodeURIComponent(firstNode)}&destination=${encodeURIComponent(lastNode)}`
      : `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
  };

  const getDirectGoogleMapsUrl = () => {
    if (mapCategory === 'temples') {
      return `https://www.google.com/maps/search/temples+near+${encodeURIComponent(destination)}`;
    }
    if (mapCategory === 'hotels') {
      return `https://www.google.com/maps/search/hotels+near+${encodeURIComponent(destination)}`;
    }
    if (mapCategory === 'attractions') {
      return `https://www.google.com/maps/search/sights+near+${encodeURIComponent(destination)}`;
    }
    if (mapCategory === 'food') {
      return `https://www.google.com/maps/search/restaurants+near+${encodeURIComponent(destination)}`;
    }
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(firstNode)}&destination=${encodeURIComponent(lastNode)}`;
  };

  return (
    <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Google Maps Places Explorer</span>
            <h3 className="text-base font-bold text-slate-900">Smart Route & Nearby Discovery</h3>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-2">
          <div className="bg-stone-100 p-1 rounded-xl border border-stone-200 flex items-center space-x-1">
            <button
              onClick={() => setViewMode('map')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Google Map Explorer</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Route Chain</span>
            </button>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Avg Transit</span>
            <span className="text-xs font-mono font-bold text-purple-700">{smartRoute.avgTransitBetweenSights}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-normal">
        Sequentially planned itinerary path designed to minimize travel distance. Use Google Maps filters below to discover hotels, temples, and places on the way!
      </p>

      {/* Google Map View */}
      {viewMode === 'map' && (
        <div className="space-y-3">
          {/* Nearby Categories Pill Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Explore:
            </span>

            <button
              onClick={() => setMapCategory('route')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all border ${
                mapCategory === 'route'
                  ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                  : 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              <Route className="w-3.5 h-3.5" />
              <span>Route ({firstNode} → {lastNode})</span>
            </button>

            <button
              onClick={() => setMapCategory('temples')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all border ${
                mapCategory === 'temples'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>🛕 Temples on the way</span>
            </button>

            <button
              onClick={() => setMapCategory('hotels')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all border ${
                mapCategory === 'hotels'
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>🏨 Hotels & Stays</span>
            </button>

            <button
              onClick={() => setMapCategory('attractions')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all border ${
                mapCategory === 'attractions'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>📍 Nearby Places</span>
            </button>

            <button
              onClick={() => setMapCategory('food')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all border ${
                mapCategory === 'food'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>🍜 Restaurants & Food</span>
            </button>
          </div>

          {/* Interactive Map Canvas Container */}
          <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-stone-200 shadow-inner bg-slate-100">
            <iframe
              title="Google Maps Route & Places Explorer"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={getMapEmbedUrl()}
            />
          </div>

          {/* Direct Google Maps Link Footer */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              Showing: {mapCategory === 'temples' ? `Temples near ${destination}` : mapCategory === 'hotels' ? `Hotels near ${destination}` : mapCategory === 'food' ? `Dining near ${destination}` : mapCategory === 'attractions' ? `Attractions near ${destination}` : `Route: ${firstNode} → ${lastNode}`}
            </span>
            <a
              href={getDirectGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:underline font-bold flex items-center gap-1"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Route Chain View */}
      {viewMode === 'timeline' && (
        <>
          {/* Desktop Horizontal Route Chain */}
          <div className="hidden md:flex items-center justify-between gap-2 overflow-x-auto pb-2 pt-2">
            {displayNodes.map((node, index) => (
              <React.Fragment key={node.id}>
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 min-w-[140px] flex-1 space-y-1 text-center">
                  <span className="text-base block">{node.icon || '📍'}</span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{node.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono block">{node.time}</span>
                </div>
                {index < displayNodes.length - 1 && (
                  <div className="flex flex-col items-center justify-center shrink-0 px-1 text-[10px] text-slate-400 font-mono">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="text-[9px] text-slate-500 whitespace-nowrap">{node.transitFromPrev || '12 mins'}</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Vertical Route Timeline */}
          <div className="md:hidden relative pl-4 space-y-3.5 before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
            {displayNodes.map((node) => (
              <div key={node.id} className="relative flex items-start space-x-3">
                <div className="relative z-10 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-sm shrink-0">
                  <span>{node.icon || '📍'}</span>
                </div>

                <div className="flex-1 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{node.title}</h4>
                    <span className="text-[10px] font-mono text-slate-500 font-medium">{node.time}</span>
                  </div>

                  {node.transitFromPrev && (
                    <div className="flex items-center space-x-1 text-[10px] text-purple-700 font-mono pt-0.5 font-semibold">
                      <Navigation className="w-3 h-3 rotate-45" />
                      <span>Transit: {node.transitFromPrev}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 text-xs text-slate-600 flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
        <span>Saves approximately <strong>45 mins</strong> daily travel time compared to unoptimized tourist routes.</span>
      </div>
    </div>
  );
}
