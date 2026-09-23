import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

export default function ItineraryTimeline({ itinerary = [] }) {
  const [activeDay, setActiveDay] = useState(1);

  if (!itinerary.length) return null;

  return (
    <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-100">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sequential Schedule</span>
            <h3 className="text-base font-bold text-slate-900">Day-by-Day Itinerary</h3>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex space-x-2 border-b border-stone-200 pb-3">
        {itinerary.map((dayPlan) => {
          const isActive = activeDay === dayPlan.day;
          return (
            <button
              key={dayPlan.day}
              onClick={() => setActiveDay(dayPlan.day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-stone-100 text-slate-600 hover:text-slate-900 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              Day {dayPlan.day}
            </button>
          );
        })}
      </div>

      {/* Active Day Schedule */}
      {itinerary
        .filter((d) => d.day === activeDay)
        .map((dayPlan) => (
          <div key={dayPlan.day} className="space-y-4">
            <div className="text-xs font-bold text-slate-800 bg-stone-50 p-3 rounded-2xl border border-stone-200/80 flex justify-between items-center">
              <span>{dayPlan.dateLabel}</span>
              <span className="text-[10px] font-mono text-slate-500 font-semibold">{dayPlan.events.length} Planned Activities</span>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200">
              {dayPlan.events.map((evt, index) => (
                <div key={index} className="relative flex items-start space-x-3.5 group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 top-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-900 group-hover:scale-125 transition-transform shadow-sm" />

                  <div className="flex-1 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-stone-200 shadow-sm">
                        {evt.time}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        {evt.cost === 0 ? 'Free' : `₹${evt.cost}`}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{evt.activity}</h4>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 pt-0.5 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {evt.location}
                      </span>
                      {evt.travelTime && evt.travelTime !== '-' && (
                        <span className="flex items-center gap-1 text-purple-700 font-mono font-semibold">
                          <Navigation className="w-3 h-3 text-purple-600" />
                          {evt.travelTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
