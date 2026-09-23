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
import { Sparkles, Bookmark, Users, IndianRupee, MapPin, Calendar, Share2 } from 'lucide-react';

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

  // Use dynamic inputs if available
  const displayOrigin = tripInputs.startingLocation || summary.origin;
  const displayDestination = tripInputs.destination || summary.destination;
  const displayBudget = Number(tripInputs.budget) || summary.totalBudget;
  const displayTravelers = Number(tripInputs.travelers) || summary.travelers;

  return (
    <div className="space-y-6 py-4 md:py-8 pb-20">
      {/* Top Header Banner */}
      <div className="editorial-card rounded-3xl p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" /> Recommended Smart Plan
          </span>

          <button
            onClick={toggleSaveCurrentPlan}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              isSavedCurrent
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 text-slate-800 border border-stone-200 hover:bg-stone-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSavedCurrent ? 'fill-white' : ''}`} />
            <span>{isSavedCurrent ? 'Saved to My Trips' : 'Save Plan'}</span>
          </button>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex flex-wrap items-center gap-2">
            <span>Your Trip to {displayDestination}</span>
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            {displayOrigin} → {displayDestination} • {summary.dates}
          </p>
        </div>

        {/* Dynamic Tags Row */}
        <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
          <span className="bg-stone-100 border border-stone-200 text-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-mono font-semibold">
            <Users className="w-4 h-4 text-slate-500" />
            {displayTravelers} {displayTravelers === 1 ? 'Traveler' : 'Travelers'}
          </span>
          <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-mono font-bold">
            <IndianRupee className="w-4 h-4 text-emerald-700" />
            ₹{displayBudget.toLocaleString()} Budget
          </span>
          <span className="bg-stone-100 border border-stone-200 text-slate-800 px-3 py-1.5 rounded-xl font-semibold">
            Style: {tripInputs.preference || summary.travelStyle}
          </span>
        </div>
      </div>

      {/* Main Grid: Multi-Column on Desktop (lg:col-span-8 & lg:col-span-4), Single Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Primary Content Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mobile Budget Card View (< lg:) */}
          <div className="block lg:hidden">
            <BudgetCard
              totalBudget={displayBudget}
              estimatedTotal={summary.estimatedTotal}
              remainingBudget={displayBudget - summary.estimatedTotal}
              currency={summary.currency}
            />
          </div>

          {/* 1. Transport Recommendation */}
          <TransportCard
            transport={recommendedTransport}
            options={transportOptions}
            travelers={displayTravelers}
          />

          {/* 2. Smart Route Optimization */}
          <RouteCard smartRoute={smartRoute} />

          {/* 3. Recommended Hotel */}
          <HotelCard hotel={hotel} options={hotelOptions} />

          {/* 4. Attractions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Recommended Sights ({attractions.filter(a => a.added).length} Included)
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Click to toggle itinerary</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attractions.map((att) => (
                <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
              ))}
            </div>
          </div>

          {/* 5. Restaurants */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Dining Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {restaurants.map((rest) => (
                <RestaurantCard key={rest.id} restaurant={rest} />
              ))}
            </div>
          </div>

          {/* 6. Day-by-Day Timeline */}
          <ItineraryTimeline itinerary={itinerary} />
        </div>

        {/* Right Sidebar Column (Sticky on Desktop lg:) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Desktop Budget Overview Card */}
          <div className="hidden lg:block">
            <BudgetCard
              totalBudget={displayBudget}
              estimatedTotal={summary.estimatedTotal}
              remainingBudget={displayBudget - summary.estimatedTotal}
              currency={summary.currency}
            />
          </div>

          {/* Budget Allocation Breakdown */}
          <BudgetBreakdown
            breakdown={budgetBreakdown}
            totalBudget={displayBudget}
            estimatedTotal={summary.estimatedTotal}
            remainingBudget={displayBudget - summary.estimatedTotal}
          />
        </div>
      </div>
    </div>
  );
}
