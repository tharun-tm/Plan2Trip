import React, { useState } from 'react';
import { Calendar, Clock, MapPin, DollarSign, Navigation, ChevronDown, ChevronUp } from 'lucide-react';

export default function ItineraryTimeline({ itinerary = [] }) {
  const [activeDay, setActiveDay] = useState(1);

  if (!itinerary.length) return null;

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Sequential Mobility Plan</span>
            <h3 className="text-sm font-bold text-white">Day-by-Day Itinerary</h3>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        {itinerary.map((dayPlan) => {
          const isActive = activeDay === dayPlan.day;
          return (
            <button
              key={dayPlan.day}
              onClick={() => setActiveDay(dayPlan.day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
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
          <div key={dayPlan.day} className="space-y-3">
            <div className="text-xs font-semibold text-slate-300 bg-slate-900/80 p-2 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>{dayPlan.dateLabel}</span>
              <span className="text-[10px] font-mono text-slate-500">{dayPlan.events.length} Events Scheduled</span>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-5 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {dayPlan.events.map((evt, index) => (
                <div key={index} className="relative flex items-start space-x-3 group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-5 top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-rose-500 group-hover:scale-125 transition-transform" />

                  <div className="flex-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {evt.time}
                      </span>
                      <span className="text-xs font-mono font-semibold text-emerald-400">
                        {evt.cost === 0 ? 'Free' : `₹${evt.cost}`}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100">{evt.activity}</h4>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-0.5 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {evt.location}
                      </span>
                      {evt.travelTime && evt.travelTime !== '-' && (
                        <span className="flex items-center gap-1 text-purple-300">
                          <Navigation className="w-3 h-3 text-purple-400" />
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
