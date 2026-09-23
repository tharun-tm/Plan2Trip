import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Bookmark, Compass, ArrowRight, IndianRupee, Calendar, Bus } from 'lucide-react';

export default function SavedTrips() {
  const navigate = useNavigate();
  const { savedTrips } = useTrip();

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
          <Bookmark className="w-5 h-5 text-emerald-400" />
          Saved Mobility Plans
        </h1>
        <p className="text-xs text-slate-400">Your bookmarked trip itineraries and mobility schedules.</p>
      </div>

      {savedTrips.length === 0 ? (
        <div className="glass-panel rounded-2xl p-6 text-center space-y-3 border border-slate-800">
          <Bookmark className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No Saved Plans Yet</h3>
          <p className="text-xs text-slate-500">Plan a trip and click "Save Plan" to bookmark it here.</p>
          <button
            onClick={() => navigate('/plan')}
            className="py-2 px-4 bg-brand-600 text-slate-950 font-bold rounded-xl text-xs"
          >
            Start Planning
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3 bg-slate-900/60"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white">{trip.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {trip.dates}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  ₹{trip.estimatedCost.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800 font-mono">
                <span className="flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5 text-brand-400" />
                  {trip.transport}
                </span>
                <span>Max Cap: ₹{trip.budget.toLocaleString()}</span>
              </div>

              <button
                onClick={() => navigate('/trip-overview')}
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>View Complete Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
