import React from 'react';
import { useTrip } from '../context/TripContext';
import BudgetCard from '../components/BudgetCard';
import TransportCard from '../components/TransportCard';
import RouteCard from '../components/RouteCard';
import HotelCard from '../components/HotelCard';
import AttractionCard from '../components/AttractionCard';
import RestaurantCard from '../components/RestaurantCard';
import ItineraryTimeline from '../components/ItineraryTimeline';
import BudgetBreakdown from '../components/BudgetBreakdown';
import { Sparkles, Bookmark, Check, Share2, MapPin, Calendar, Users, IndianRupee } from 'lucide-react';

export default function TripOverview() {
  const { planData, tripInputs, isSavedCurrent, toggleSaveCurrentPlan, toggleAttraction } = useTrip();

  const summary = planData.tripSummary;
  const recommendedTransport = planData.recommendedTransport;
  const transportOptions = planData.transportOptions;
  const smartRoute = planData.smartRoute;
  const hotel = planData.recommendedHotel;
  const hotelOptions = planData.hotelOptions;
  const attractions = planData.attractions;
  const restaurants = planData.restaurants;
  const itinerary = planData.itinerary;
  const budgetBreakdown = planData.budgetBreakdown;

  // Use values from tripInputs if available
  const displayOrigin = tripInputs.startingLocation || summary.origin;
  const displayDestination = tripInputs.destination || summary.destination;
  const displayBudget = Number(tripInputs.budget) || summary.totalBudget;
  const displayTravelers = Number(tripInputs.travelers) || summary.travelers;

  return (
    <div className="space-y-4 py-2 pb-16">
      {/* Overview Banner Header */}
      <div className="glass-panel rounded-2xl p-4 border border-brand-500/30 bg-gradient-to-br from-brand-950/40 via-slate-900/90 to-slate-950 space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2.5 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" /> Recommended Trip Plan
          </span>

          <button
            onClick={toggleSaveCurrentPlan}
            className={`p-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              isSavedCurrent
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSavedCurrent ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span>{isSavedCurrent ? 'Saved' : 'Save Plan'}</span>
          </button>
        </div>

        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>{displayOrigin}</span>
            <span className="text-brand-400 font-mono text-base">→</span>
            <span className="text-teal-300">{displayDestination}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{summary.dates}</p>
        </div>

        {/* Inputs Pill Row */}
        <div className="flex flex-wrap gap-2 text-xs pt-1">
          <span className="bg-slate-900/90 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            {displayTravelers} {displayTravelers === 1 ? 'Traveler' : 'Travelers'}
          </span>
          <span className="bg-slate-900/90 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono font-bold">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-500" />
            ₹{displayBudget.toLocaleString()} Budget
          </span>
          <span className="bg-slate-900/90 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-medium">
            Style: {tripInputs.preference || summary.travelStyle}
          </span>
        </div>
      </div>

      {/* 1. Budget Overview Card */}
      <BudgetCard
        totalBudget={displayBudget}
        estimatedTotal={summary.estimatedTotal}
        remainingBudget={displayBudget - summary.estimatedTotal}
        currency={summary.currency}
      />

      {/* 2. Transport Recommendation */}
      <TransportCard
        transport={recommendedTransport}
        options={transportOptions}
        travelers={displayTravelers}
      />

      {/* 3. Smart Route Optimization Diagram */}
      <RouteCard smartRoute={smartRoute} />

      {/* 4. Hotel Recommendation */}
      <HotelCard hotel={hotel} options={hotelOptions} />

      {/* 5. Recommended Attractions */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Optimized Sightseeing ({attractions.filter(a => a.added).length} Active)
          </h3>
          <span className="text-[10px] text-slate-500">Tap to include/exclude</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {attractions.map((att) => (
            <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
          ))}
        </div>
      </div>

      {/* 6. Dining Recommendations */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Nearby Dining Spots
        </h3>
        <div className="space-y-2">
          {restaurants.map((rest) => (
            <RestaurantCard key={rest.id} restaurant={rest} />
          ))}
        </div>
      </div>

      {/* 7. Day-by-Day Timeline Itinerary */}
      <ItineraryTimeline itinerary={itinerary} />

      {/* 8. Budget Breakdown */}
      <BudgetBreakdown
        breakdown={budgetBreakdown}
        totalBudget={displayBudget}
        estimatedTotal={summary.estimatedTotal}
        remainingBudget={displayBudget - summary.estimatedTotal}
      />
    </div>
  );
}
