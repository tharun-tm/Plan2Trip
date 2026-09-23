import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MapPin, Calendar, IndianRupee, Users, Compass, ArrowRight, AlertTriangle, Sparkles } from 'lucide-react';

const TRAVEL_STYLES = [
  { id: 'Budget', label: 'Budget', icon: '💰', desc: 'Maximum cost savings' },
  { id: 'Balanced', label: 'Balanced', icon: '⚖️', desc: 'Optimal comfort & price' },
  { id: 'Comfort', label: 'Comfort', icon: '🛋️', desc: 'Premium relaxation' },
  { id: 'Adventure', label: 'Adventure', icon: '🏔️', desc: 'Active & outdoors' },
  { id: 'Cultural', label: 'Cultural', icon: '🏛️', desc: 'Heritage & history' },
  { id: 'Foodie', label: 'Foodie', icon: '🍜', desc: 'Local cuisine priority' },
];

export default function PlanTrip() {
  const navigate = useNavigate();
  const { tripInputs, updateTripInputs } = useTrip();

  const [form, setForm] = useState(tripInputs);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.startingLocation || !form.startingLocation.trim()) {
      errs.startingLocation = 'Starting location (origin) is required.';
    }
    if (!form.destination || !form.destination.trim()) {
      errs.destination = 'Destination is required.';
    }
    if (!form.startDate) {
      errs.startDate = 'Start date is required.';
    }
    if (!form.endDate) {
      errs.endDate = 'End date is required.';
    } else if (form.startDate && new Date(form.endDate) < new Date(form.startDate)) {
      errs.endDate = 'End date cannot be before start date.';
    }
    if (!form.travelers || form.travelers < 1) {
      errs.travelers = 'Number of travelers must be at least 1.';
    }
    if (!form.budget || Number(form.budget) <= 0) {
      errs.budget = 'Total budget must be greater than ₹0.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateTripInputs(form);
      navigate('/planning');
    }
  };

  return (
    <div className="space-y-4 py-2">
      {/* Screen Title */}
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
          <Compass className="w-5 h-5 text-brand-400" />
          Plan Your Trip
        </h1>
        <p className="text-xs text-slate-400">
          Enter mobility parameters to generate an optimized itinerary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-4 space-y-4 border border-slate-800">
        {/* Origin */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Location (Origin)</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="e.g. Mangaluru"
              value={form.startingLocation}
              onChange={(e) => setForm({ ...form, startingLocation: e.target.value })}
              className={`w-full bg-slate-900 border rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                errors.startingLocation ? 'border-red-500' : 'border-slate-800 focus:border-brand-500'
              }`}
            />
          </div>
          {errors.startingLocation && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 shrink-0" />
              {errors.startingLocation}
            </p>
          )}
        </div>

        {/* Destination */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-brand-400" />
            <input
              type="text"
              placeholder="e.g. Goa"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              className={`w-full bg-slate-900 border rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                errors.destination ? 'border-red-500' : 'border-slate-800 focus:border-brand-500'
              }`}
            />
          </div>
          {errors.destination && (
            <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 shrink-0" />
              {errors.destination}
            </p>
          )}
        </div>

        {/* Start & End Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className={`w-full bg-slate-900 border rounded-xl pl-9 pr-2 py-2 text-xs text-slate-100 focus:outline-none transition-colors ${
                  errors.startDate ? 'border-red-500' : 'border-slate-800 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.startDate && <p className="text-[10px] text-red-400 mt-1">{errors.startDate}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className={`w-full bg-slate-900 border rounded-xl pl-9 pr-2 py-2 text-xs text-slate-100 focus:outline-none transition-colors ${
                  errors.endDate ? 'border-red-500' : 'border-slate-800 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.endDate && <p className="text-[10px] text-red-400 mt-1">{errors.endDate}</p>}
          </div>
        </div>

        {/* Travelers & Total Budget (INR) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Travelers</label>
            <div className="relative">
              <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="number"
                min="1"
                max="20"
                value={form.travelers}
                onChange={(e) => setForm({ ...form, travelers: parseInt(e.target.value) || 1 })}
                className={`w-full bg-slate-900 border rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 focus:outline-none transition-colors ${
                  errors.travelers ? 'border-red-500' : 'border-slate-800 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.travelers && <p className="text-[10px] text-red-400 mt-1">{errors.travelers}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Total Budget (INR ₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
              <input
                type="number"
                placeholder="12000"
                min="1"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={`w-full bg-slate-900 border rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                  errors.budget ? 'border-red-500' : 'border-slate-800 focus:border-brand-500'
                }`}
              />
            </div>
            {errors.budget && <p className="text-[10px] text-red-400 mt-1">{errors.budget}</p>}
          </div>
        </div>

        {/* Travel Style Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Travel Style & Preference</label>
          <div className="grid grid-cols-2 gap-2">
            {TRAVEL_STYLES.map((style) => {
              const isSelected = form.preference === style.id || form.preference === style.id.toLowerCase();
              return (
                <button
                  type="button"
                  key={style.id}
                  onClick={() => setForm({ ...form, preference: style.id })}
                  className={`p-2.5 rounded-xl border text-left transition-all flex items-start space-x-2 ${
                    isSelected
                      ? 'bg-brand-500/20 border-brand-500 text-white shadow-sm shadow-brand-500/10'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="text-base">{style.icon}</span>
                  <div>
                    <span className="text-xs font-bold block leading-tight">{style.label}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">{style.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 via-teal-500 to-emerald-400 hover:from-brand-500 hover:to-teal-400 text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-brand-500/20 flex items-center justify-center space-x-2 text-sm transition-all transform active:scale-[0.98] mt-2"
        >
          <span>Build My Trip</span>
          <ArrowRight className="w-4 h-4 font-bold" />
        </button>
      </form>
    </div>
  );
}
