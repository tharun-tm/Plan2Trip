import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import BudgetCard from '../components/BudgetCard';
import SelectedItemsCard from '../components/SelectedItemsCard';
import TransportCard from '../components/TransportCard';
import RouteCard from '../components/RouteCard';
import HotelCard from '../components/HotelCard';
import AttractionCard from '../components/AttractionCard';
import RestaurantCard from '../components/RestaurantCard';
import ItineraryTimeline from '../components/ItineraryTimeline';
import BudgetBreakdown from '../components/BudgetBreakdown';
import { Sparkles, Bookmark, Users, IndianRupee, MapPin, Calendar, Bed, Landmark, Utensils, Bus, Filter } from 'lucide-react';

export default function TripOverview() {
  const { planData, tripInputs, isSavedCurrent, toggleSaveCurrentPlan, toggleAttraction } = useTrip();
  const [activeFilters, setActiveFilters] = useState(['all']);

  const summary = planData.tripSummary;
  const recommendedTransport = planData.recommendedTransport;
  const transportOptions = planData.transportOptions;
  const smartRoute = planData.smartRoute;
  const hotel = planData.recommendedHotel;
  const hotelOptions = planData.hotelOptions;
  const attractions = planData.attractions || [];
  const restaurants = planData.restaurants || [];
  const itinerary = planData.itinerary;
  const budgetBreakdown = planData.budgetBreakdown;

  // Use dynamic inputs if available
  const displayOrigin = tripInputs.startingLocation || summary.origin;
  const displayDestination = tripInputs.destination || summary.destination;
  const displayBudget = Number(tripInputs.budget) || summary.totalBudget;
  const displayTravelers = Number(tripInputs.travelers) || summary.travelers;

  // Categorize attractions along route from start to end
  const templeAttractions = attractions.filter(a => a.type === 'temples' || a.category?.includes('Temple') || a.category?.includes('🛕') || a.category?.includes('Shrine'));
  const beachAttractions = attractions.filter(a => a.type === 'beaches' || a.category?.includes('Beach') || a.category?.includes('Sea') || a.category?.includes('🌅') || a.category?.includes('Viewpoint'));
  const mallAttractions = attractions.filter(a => a.type === 'malls' || a.category?.includes('Mall') || a.category?.includes('Shopping') || a.category?.includes('🛍️') || a.category?.includes('Market'));
  const parkAttractions = attractions.filter(a => a.type === 'parks' || a.category?.includes('Park') || a.category?.includes('Botanical') || a.category?.includes('🌳') || a.category?.includes('Sanctuary'));
  const fortAttractions = attractions.filter(a => a.type === 'forts' || a.category?.includes('Fort') || a.category?.includes('🏰') || a.category?.includes('Heritage') || a.category?.includes('Cultural') || a.category?.includes('UNESCO'));

  const FILTER_OPTIONS = [
    { id: 'all', label: '✨ Show All' },
    { id: 'hotels', label: '🏨 Hotels & Stays' },
    { id: 'temples', label: '🛕 Temples' },
    { id: 'beaches', label: '🌅 Sea Viewpoints & Beaches' },
    { id: 'malls', label: '🛍️ Malls & Shopping' },
    { id: 'parks', label: '🌳 Parks & Nature' },
    { id: 'forts', label: '🏰 Forts & Heritage' },
    { id: 'dining', label: '🍜 Dining' },
    { id: 'transport', label: '🚌 Transport & Route' },
  ];

  const toggleFilter = (id) => {
    if (id === 'all') {
      setActiveFilters(['all']);
      return;
    }

    setActiveFilters((prev) => {
      const withoutAll = prev.filter((f) => f !== 'all');
      if (withoutAll.includes(id)) {
        const remaining = withoutAll.filter((f) => f !== id);
        return remaining.length === 0 ? ['all'] : remaining;
      } else {
        return [...withoutAll, id];
      }
    });
  };

  const isFilterActive = (id) => activeFilters.includes('all') || activeFilters.includes(id);

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
            <span>{isSavedCurrent ? 'Saved to Favorites' : 'Save to Favorites'}</span>
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

      {/* Multi-Selection Category Filter Bar */}
      <div className="editorial-card rounded-2xl p-3 border border-stone-200 bg-white shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-brand-700" />
            <span>Filter Categories (Choose one or more):</span>
          </div>
          {!activeFilters.includes('all') && (
            <button
              onClick={() => setActiveFilters(['all'])}
              className="text-[11px] font-bold text-brand-700 hover:underline"
            >
              Reset to Show All
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          {FILTER_OPTIONS.map((opt) => {
            const isSelected = activeFilters.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleFilter(opt.id)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100'
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && opt.id !== 'all' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Items & Cost Breakdown Summary Card */}
      <SelectedItemsCard />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Primary Content Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mobile Budget Card View (< lg:) */}
          <div className="block lg:hidden">
            <BudgetCard />
          </div>

          {/* 1. Transport Recommendation */}
          {isFilterActive('transport') && (
            <TransportCard
              transport={recommendedTransport}
              options={transportOptions}
              travelers={displayTravelers}
              origin={displayOrigin}
              destination={displayDestination}
            />
          )}

          {/* 2. Smart Route Optimization */}
          {isFilterActive('transport') && (
            <RouteCard smartRoute={smartRoute} origin={displayOrigin} destination={displayDestination} />
          )}

          {/* 3. Recommended Hotel */}
          {isFilterActive('hotels') && (
            <HotelCard hotel={hotel} options={hotelOptions} />
          )}

          {/* 4. Temples & Pilgrimage Sights */}
          {isFilterActive('temples') && templeAttractions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛕 Popular Temples ({displayOrigin} → {displayDestination})</span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-mono font-bold">
                    {templeAttractions.filter(a => a.added).length} Added
                  </span>
                </h3>
                <span className="text-[11px] text-slate-500 font-medium">Distance from Start Journey</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templeAttractions.map((att) => (
                  <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
                ))}
              </div>
            </div>
          )}

          {/* 5. Sea Viewpoints & Beaches */}
          {isFilterActive('beaches') && beachAttractions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🌅 Sea Viewpoints & Scenic Coastlines</span>
                  <span className="text-[10px] bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-full font-mono font-bold">
                    {beachAttractions.filter(a => a.added).length} Added
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {beachAttractions.map((att) => (
                  <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
                ))}
              </div>
            </div>
          )}

          {/* 6. Malls & Shopping */}
          {isFilterActive('malls') && mallAttractions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🛍️ Malls & Popular Shopping Centers</span>
                  <span className="text-[10px] bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full font-mono font-bold">
                    {mallAttractions.filter(a => a.added).length} Added
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mallAttractions.map((att) => (
                  <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
                ))}
              </div>
            </div>
          )}

          {/* 7. Parks & Nature */}
          {isFilterActive('parks') && parkAttractions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🌳 Parks, Botanical Gardens & Sanctuaries</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
                    {parkAttractions.filter(a => a.added).length} Added
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {parkAttractions.map((att) => (
                  <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
                ))}
              </div>
            </div>
          )}

          {/* 8. Forts & Heritage */}
          {isFilterActive('forts') && fortAttractions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏰 Forts & Heritage Landmarks</span>
                  <span className="text-[10px] bg-stone-100 text-slate-800 border border-stone-200 px-2 py-0.5 rounded-full font-mono font-bold">
                    {fortAttractions.filter(a => a.added).length} Added
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fortAttractions.map((att) => (
                  <AttractionCard key={att.id} attraction={att} onToggle={toggleAttraction} />
                ))}
              </div>
            </div>
          )}

          {/* 9. Dining */}
          {isFilterActive('dining') && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-1 flex items-center gap-1.5">
                <span>🍜 Dining Highlights & Local Food Spots</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {restaurants.map((rest) => (
                  <RestaurantCard key={rest.id} restaurant={rest} />
                ))}
              </div>
            </div>
          )}

          {/* 10. Day-by-Day Sequential Itinerary */}
          {(activeFilters.includes('all') || activeFilters.includes('transport')) && (
            <ItineraryTimeline itinerary={itinerary} />
          )}
        </div>

        {/* Right Sidebar Column (Sticky on Desktop lg:) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          {/* Desktop Budget Overview Card */}
          <div className="hidden lg:block">
            <BudgetCard />
          </div>

          {/* Budget Allocation Breakdown */}
          <BudgetBreakdown />
        </div>
      </div>
    </div>
  );
}
