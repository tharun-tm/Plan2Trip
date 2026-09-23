import React from 'react';
import { CheckCircle2, Bus, Bed, Landmark, Utensils, AlertTriangle, CheckSquare, Square, X } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function SelectedItemsCard() {
  const {
    tripInputs,
    planData,
    selectedTransport,
    selectedHotel,
    selectedAttractions,
    includeTransport,
    toggleIncludeTransport,
    includeHotel,
    toggleIncludeHotel,
    includeDining,
    toggleIncludeDining,
    selectTransport,
    selectHotel,
    toggleAttraction,
    transportCost,
    hotelCost,
    activitiesCost,
    diningCost,
    dynamicEstimatedTotal,
    dynamicRemainingBudget,
    totalBudgetCap,
  } = useTrip();

  const travelers = Number(tripInputs.travelers) || 2;
  const isOverBudget = dynamicRemainingBudget < 0;

  const transportOptions = planData.transportOptions || [];
  const hotelOptions = planData.hotelOptions || [];

  return (
    <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-4 bg-white border border-stone-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Custom Cost Calculator</span>
            <h3 className="text-base font-bold text-slate-900">Selected Items & Budget Breakdown</h3>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-900 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
          {(includeTransport ? 1 : 0) + (includeHotel ? 1 : 0) + (includeDining ? 1 : 0) + selectedAttractions.length} Included Items
        </span>
      </div>

      <p className="text-xs text-slate-600 font-medium">
        Tick/untick items below to customize your budget calculations. Unchecking an item removes its cost from your total estimate.
      </p>

      {/* Itemized List with Interactive Checkboxes & Selector Dropdowns */}
      <div className="space-y-3">
        {/* 1. Transport Item with Checkbox */}
        <div className={`p-3.5 rounded-2xl border transition-all ${includeTransport ? 'bg-stone-50 border-stone-200/80' : 'bg-stone-50/40 border-stone-200/40 opacity-70'}`}>
          <div className="flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start space-x-2.5 min-w-0">
              <button
                onClick={toggleIncludeTransport}
                className="mt-0.5 text-slate-700 hover:text-brand-700 transition-colors"
                title="Toggle include transport in budget"
              >
                {includeTransport ? (
                  <CheckSquare className="w-4 h-4 text-slate-900 fill-slate-900/10" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Include Intercity Transport</span>
                  {!includeTransport && (
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-stone-200 px-2 py-0.5 rounded-md">
                      Opted Out (₹0)
                    </span>
                  )}
                </div>

                {includeTransport && (
                  <div className="flex items-center gap-2 pt-1">
                    <select
                      value={selectedTransport?.id || 'bus-sleeper'}
                      onChange={(e) => selectTransport(e.target.value)}
                      className="text-xs bg-white border border-stone-300 rounded-xl px-2.5 py-1 font-semibold text-slate-800 shadow-2xs focus:ring-1 focus:ring-slate-900"
                    >
                      {transportOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.type}: {opt.name} (₹{opt.pricePerPerson}/person)
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] text-slate-500 font-mono">
                      × {travelers} travelers
                    </span>
                  </div>
                )}
              </div>
            </div>

            <span className="font-mono font-bold text-slate-900 text-sm shrink-0">
              ₹{transportCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 2. Hotel / Stay Item with Checkbox */}
        <div className={`p-3.5 rounded-2xl border transition-all ${includeHotel ? 'bg-stone-50 border-stone-200/80' : 'bg-stone-50/40 border-stone-200/40 opacity-70'}`}>
          <div className="flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start space-x-2.5 min-w-0">
              <button
                onClick={toggleIncludeHotel}
                className="mt-0.5 text-slate-700 hover:text-brand-700 transition-colors"
                title="Toggle include accommodation in budget"
              >
                {includeHotel ? (
                  <CheckSquare className="w-4 h-4 text-slate-900 fill-slate-900/10" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Include Accommodation / Stay</span>
                  {!includeHotel && (
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-stone-200 px-2 py-0.5 rounded-md">
                      Opted Out (₹0)
                    </span>
                  )}
                </div>

                {includeHotel && (
                  <div className="flex items-center gap-2 pt-1">
                    <select
                      value={selectedHotel?.id || 'seabreeze-hotel'}
                      onChange={(e) => selectHotel(e.target.value)}
                      className="text-xs bg-white border border-stone-300 rounded-xl px-2.5 py-1 font-semibold text-slate-800 shadow-2xs focus:ring-1 focus:ring-slate-900"
                    >
                      {hotelOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name} (₹{opt.pricePerNight}/night)
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] text-slate-500 font-mono">
                      × 2 nights
                    </span>
                  </div>
                )}
              </div>
            </div>

            <span className="font-mono font-bold text-slate-900 text-sm shrink-0">
              ₹{hotelCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 3. Selected Attractions */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Landmark className="w-4 h-4 text-purple-700 shrink-0" />
              <h4 className="font-bold text-slate-900">
                Selected Sights & Activities ({selectedAttractions.length})
              </h4>
            </div>
            <span className="font-mono font-bold text-slate-900 text-sm">
              ₹{activitiesCost.toLocaleString()}
            </span>
          </div>

          {selectedAttractions.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1 pl-6">
              {selectedAttractions.map((att) => (
                <span
                  key={att.id}
                  className="inline-flex items-center gap-1.5 text-[11px] bg-white text-slate-800 border border-stone-200 px-2.5 py-1 rounded-lg font-medium shadow-2xs"
                >
                  <span>{att.name}</span>
                  <span className="font-mono font-bold text-emerald-700 text-[10px]">
                    ({att.cost === 0 ? 'Free' : `₹${att.cost}`})
                  </span>
                  <button
                    onClick={() => toggleAttraction(att.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors ml-0.5"
                    title="Remove from itinerary"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 pl-6 italic">No paid sights selected. Browse below to add sights.</p>
          )}
        </div>

        {/* 4. Food & Dining Item with Checkbox */}
        <div className={`p-3.5 rounded-2xl border transition-all ${includeDining ? 'bg-stone-50 border-stone-200/80' : 'bg-stone-50/40 border-stone-200/40 opacity-70'}`}>
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5 min-w-0">
              <button
                onClick={toggleIncludeDining}
                className="text-slate-700 hover:text-brand-700 transition-colors"
                title="Toggle include food allowance in budget"
              >
                {includeDining ? (
                  <CheckSquare className="w-4 h-4 text-slate-900 fill-slate-900/10" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Include Food & Dining Allowance</span>
                  {!includeDining && (
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-stone-200 px-2 py-0.5 rounded-md">
                      Opted Out (₹0)
                    </span>
                  )}
                </div>
                {includeDining && (
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    ₹1,500 allowance per traveler (3 Days)
                  </p>
                )}
              </div>
            </div>

            <span className="font-mono font-bold text-slate-900 text-sm shrink-0">
              ₹{diningCost.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Calculated Total Footer */}
      <div className="pt-3 border-t border-stone-200 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600 font-semibold">Total Estimated Cost (Selected Items Only):</span>
          <span className="font-mono font-black text-slate-900 text-base">₹{dynamicEstimatedTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-600 font-semibold">Your Total Budget Cap:</span>
          <span className="font-mono font-bold text-slate-700">₹{totalBudgetCap.toLocaleString()}</span>
        </div>

        <div
          className={`flex justify-between items-center text-xs font-mono p-3 rounded-2xl border ${
            isOverBudget
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <span className="font-bold">{isOverBudget ? 'Budget Deficit:' : 'Remaining Reserve:'}</span>
          <span className="font-black text-sm">
            {isOverBudget
              ? `- ₹${Math.abs(dynamicRemainingBudget).toLocaleString()}`
              : `+ ₹${dynamicRemainingBudget.toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Dynamic Over-Budget Alert Box */}
      {isOverBudget && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 space-y-1.5 text-xs text-red-800">
          <div className="flex items-center space-x-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Trip Exceeds Budget Cap (Deficit: ₹{Math.abs(dynamicRemainingBudget).toLocaleString()})</span>
          </div>
          <p className="leading-relaxed text-[11px] text-red-700">
            You set a budget cap of <strong>₹{totalBudgetCap.toLocaleString()}</strong>, while your checked items total <strong>₹{dynamicEstimatedTotal.toLocaleString()}</strong>.
          </p>
          <div className="pt-1 text-[11px] text-slate-700 font-medium">
            💡 <strong>How to fit inside your ₹{totalBudgetCap.toLocaleString()} budget cap:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              <li>Uncheck <em>Intercity Transport</em> or <em>Accommodation</em> if you already have private arrangements.</li>
              <li>Select free temples, parks, and sea viewpoints below instead of paid activities.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
