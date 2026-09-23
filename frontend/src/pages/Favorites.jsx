import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import AttractionCard from '../components/AttractionCard';
import { Heart, Sparkles, MapPin, ArrowRight, Bookmark, Check } from 'lucide-react';

export default function Favorites() {
  const navigate = useNavigate();
  const { planData, toggleAttraction, isSavedCurrent, toggleSaveCurrentPlan, savedTrips, tripInputs } = useTrip();

  const favoriteAttractions = (planData.attractions || []).filter(a => a.added);
  const displayOrigin = tripInputs.startingLocation || 'Mangaluru';
  const displayDestination = tripInputs.destination || 'Goa';

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 md:py-8 pb-20">
      {/* Header Banner */}
      <div className="editorial-card rounded-3xl p-6 md:p-8 space-y-3 bg-white border border-stone-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>My Favorites ❤️</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Saved Favorites & Sights</h1>
        <p className="text-sm text-slate-600 font-medium">
          Quick access to your bookmarked places, temples, viewpoints, and saved mobility plans.
        </p>
      </div>

      {/* Current Active Saved Plan Banner (if bookmarked) */}
      <div className="editorial-card rounded-2xl p-5 bg-gradient-to-r from-stone-900 to-slate-800 text-white space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {isSavedCurrent ? 'Bookmarked Trip Plan' : 'Current Active Route'}
          </span>
          <button
            onClick={toggleSaveCurrentPlan}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isSavedCurrent
                ? 'bg-rose-500 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSavedCurrent ? 'fill-white' : ''}`} />
            <span>{isSavedCurrent ? 'Saved to Favorites' : 'Add Current Plan to Favorites'}</span>
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold">{displayOrigin} → {displayDestination}</h3>
          <p className="text-xs text-slate-300 mt-0.5 font-mono">
            {favoriteAttractions.length} bookmarked sights & activities in active itinerary
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => navigate('/trip-overview')}
            className="py-2 px-4 bg-white text-slate-900 hover:bg-stone-100 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>Open Active Trip Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Favorited Attractions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Favorited Sights & Attractions ({favoriteAttractions.length})</span>
          </h2>
          <span className="text-xs text-slate-500">Added to your active trip</span>
        </div>

        {favoriteAttractions.length === 0 ? (
          <div className="editorial-card rounded-3xl p-8 text-center space-y-4 bg-white">
            <Heart className="w-10 h-10 text-rose-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No Favorites Added Yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Browse places on the Trip Overview or Explore page and tap "Add to Trip" or bookmark them here.
            </p>
            <button
              onClick={() => navigate('/trip-overview')}
              className="py-2.5 px-5 bg-slate-900 text-white font-bold rounded-xl text-xs"
            >
              Browse Attractions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteAttractions.map((att) => (
              <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
            ))}
          </div>
        )}
      </div>

      {/* Saved Trip Plans Section */}
      {savedTrips && savedTrips.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 px-1">
            <Bookmark className="w-4 h-4 text-brand-700" />
            <span>Saved Trip Itineraries ({savedTrips.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTrips.map((trip) => (
              <div key={trip.id} className="editorial-card rounded-2xl p-4 space-y-2 bg-white border border-stone-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-slate-900">{trip.origin} → {trip.destination}</h3>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ₹{Number(trip.budget).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  {trip.travelers} {trip.travelers === 1 ? 'Traveler' : 'Travelers'} • {trip.travel_style}
                </p>
                <button
                  onClick={() => navigate('/trip-overview')}
                  className="w-full mt-2 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <span>Load Trip Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
