import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { deleteTrip } from '../lib/tripsService';
import { Bookmark, ArrowRight, Calendar, Bus, Loader2, Trash2, LogIn } from 'lucide-react';

export default function SavedTrips() {
  const navigate = useNavigate();
  const { savedTrips, setSavedTrips, loadTrips, loadingTrips, user, setCurrentTripId, updateTripInputs } = useTrip();

  // Reload trips when this page is visited
  useEffect(() => {
    if (user) {
      loadTrips();
    }
  }, [user]);

  const handleViewTrip = (trip) => {
    // Restore trip inputs from the saved record so TripOverview shows correct data
    updateTripInputs({
      startingLocation: trip.origin,
      destination: trip.destination,
      startDate: trip.start_date,
      endDate: trip.end_date,
      travelers: trip.travelers,
      budget: trip.budget,
      preference: trip.travel_style,
    });
    setCurrentTripId(trip.id);
    navigate('/trip-overview');
  };

  const handleDelete = async (e, tripId) => {
    e.stopPropagation();
    if (!confirm('Delete this saved trip?')) return;
    try {
      await deleteTrip(tripId);
      setSavedTrips(prev => prev.filter(t => t.id !== tripId));
    } catch (err) {
      console.error('Failed to delete trip:', err.message);
      alert('Could not delete this trip. Please try again.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-4 md:py-8">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <Bookmark className="w-6 h-6 text-brand-700" />
            My Saved Mobility Plans
          </h1>
        </div>
        <div className="editorial-card rounded-3xl p-8 text-center space-y-4">
          <LogIn className="w-10 h-10 text-brand-700 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">Sign In to See Your Trips</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Sign in with Google to access your saved trip plans from any device.
          </p>
          <button
            onClick={() => navigate('/')}
            className="py-2.5 px-5 bg-slate-900 text-white font-bold rounded-xl text-xs"
          >
            Go to Home & Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 md:py-8">
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <Bookmark className="w-6 h-6 text-brand-700" />
          My Saved Mobility Plans
        </h1>
        <p className="text-sm text-slate-600">Access your bookmarked itineraries and travel schedules.</p>
      </div>

      {loadingTrips ? (
        <div className="editorial-card rounded-3xl p-8 text-center space-y-4">
          <Loader2 className="w-8 h-8 text-brand-700 mx-auto animate-spin" />
          <p className="text-sm text-slate-600 font-medium">Loading your saved trips...</p>
        </div>
      ) : savedTrips.length === 0 ? (
        <div className="editorial-card rounded-3xl p-8 text-center space-y-4">
          <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Saved Plans Yet</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">Build a trip plan and tap "Build My Trip" to bookmark it here.</p>
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
                    <h3 className="text-base font-bold text-slate-900">
                      {trip.origin} → {trip.destination}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(trip.start_date)} – {formatDate(trip.end_date)}
                    </p>
                  </div>
                  <span className="text-sm font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    ₹{Number(trip.budget).toLocaleString()}
                  </span>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 flex items-center justify-between text-xs text-slate-700 font-mono">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Bus className="w-4 h-4 text-brand-700" />
                    {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
                  </span>
                  <span className="capitalize bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                    {trip.travel_style}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleViewTrip(trip)}
                  className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-brand-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <span>View Complete Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => handleDelete(e, trip.id)}
                  className="py-2.5 px-3 bg-stone-100 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-stone-200 hover:border-red-200 rounded-xl transition-colors"
                  title="Delete trip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
