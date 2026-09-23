import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

const PREFERENCES = [
  { id: 'budget', label: 'Budget-Friendly', icon: '💰' },
  { id: 'balanced', label: 'Balanced Comfort', icon: '⚖️' },
  { id: 'luxury', label: 'Luxury & Premium', icon: '✨' },
  { id: 'adventure', label: 'Adventure & Outdoors', icon: '🏔️' },
  { id: 'cultural', label: 'Cultural & Heritage', icon: '🏛️' },
  { id: 'foodie', label: 'Foodie & Dining', icon: '🍜' },
];

export default function TripForm() {
  const [formData, setFormData] = useState({
    startingLocation: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    currency: 'USD',
    travelers: 1,
    preference: 'balanced'
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-4 sm:p-5 space-y-4 border border-slate-800">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-500" />
            Plan Your Realistic Trip
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter your trip details to generate realistic hotels, transport, and itineraries.
          </p>
        </div>

        {/* Origin & Destination */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="e.g. New York, USA"
                value={formData.startingLocation}
                onChange={(e) => setFormData({ ...formData, startingLocation: e.target.value })}
                required
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-brand-500" />
              <input
                type="text"
                placeholder="e.g. Tokyo, Japan"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Budget & Travelers */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Total Budget</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-emerald-500" />
              <input
                type="number"
                placeholder="100"
                min="100"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Travelers</label>
            <div className="relative">
              <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="number"
                min="1"
                max="20"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) || 1 })}
                required
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Travel Preference */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Travel Style & Preference</label>
          <div className="grid grid-cols-2 gap-2">
            {PREFERENCES.map((pref) => {
              const isSelected = formData.preference === pref.id;
              return (
                <button
                  type="button"
                  key={pref.id}
                  onClick={() => setFormData({ ...formData, preference: pref.id })}
                  className={`flex items-center space-x-2 p-2 rounded-xl text-xs font-medium border transition-all text-left ${
                    isSelected
                      ? 'bg-brand-500/20 border-brand-500 text-brand-300 shadow-sm shadow-brand-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="text-sm">{pref.icon}</span>
                  <span className="truncate">{pref.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-teal-500 hover:from-brand-500 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center space-x-2 text-sm transition-all transform active:scale-[0.99]"
        >
          <span>Generate Personal Itinerary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Fact Check Banner */}
      <div className="glass-card rounded-xl p-3 border border-slate-800/80 flex items-start space-x-2.5">
        <ShieldCheck className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
        <div className="text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Fact-Grounded Planning:</strong> TripWise relies on real-world APIs for hotels, transport, & prices rather than hallucinated AI estimates.
        </div>
      </div>

      {/* Form Submission Preview */}
      {submittedData && (
        <div className="glass-panel rounded-2xl p-4 border border-brand-500/30 bg-brand-950/20 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Submitted Trip Request</span>
            <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full font-mono">Ready for AI Engine</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-mono bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div><span className="text-slate-500">From:</span> {submittedData.startingLocation}</div>
            <div><span className="text-slate-500">To:</span> {submittedData.destination}</div>
            <div><span className="text-slate-500">Dates:</span> {submittedData.startDate} ~ {submittedData.endDate}</div>
            <div><span className="text-slate-500">Budget:</span> ${submittedData.budget}</div>
            <div><span className="text-slate-500">Travelers:</span> {submittedData.travelers}</div>
            <div><span className="text-slate-500">Style:</span> {submittedData.preference}</div>
          </div>
        </div>
      )}
    </div>
  );
}
