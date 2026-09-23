import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Bookmark, ArrowRight, Calendar, Bus } from 'lucide-react';

export default function SavedTrips() {
  const navigate = useNavigate();
  const { savedTrips } = useTrip();

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 md:py-8">
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Bookmark className="w-6 h-6 text-brand-700" />
          My Saved Mobility Plans
        </h1>
        <p className="text-sm text-slate-600">Access your bookmarked itineraries and travel schedules.</p>
      </div>

      {savedTrips.length === 0 ? (
        <div className="editorial-card rounded-3xl p-8 text-center space-y-4">
          <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Saved Plans Yet</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">Build a trip plan and tap "Save Plan" to bookmark it here for offline access.</p>
          <button
            onClick={() => navigate('/plan')}
            className="py-2.5 px-5 bg-slate-900 text-white font-bold rounded-xl text-xs"
          >
            Start Planning
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedTrips.map((trip) => (
            <div
              key={trip.id}
              className="editorial-card rounded-3xl p-5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{trip.title}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {trip.dates}
                    </p>
                  </div>
                  <span className="text-sm font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    ₹{trip.estimatedCost?.toLocaleString()}
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 flex items-center justify-between text-xs text-slate-700 font-mono">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Bus className="w-4 h-4 text-brand-700" />
                    {trip.transport}
                  </span>
                  <span>Budget Cap: ₹{trip.budget?.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/trip-overview')}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm"
              >
                <span>View Complete Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
