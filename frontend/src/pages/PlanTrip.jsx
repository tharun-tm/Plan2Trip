import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { MapPin, Calendar, IndianRupee, Users, Compass, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

const TRAVEL_STYLES = [
  { id: 'Budget', label: 'Budget', icon: '💰', desc: 'Max savings' },
  { id: 'Balanced', label: 'Balanced', icon: '⚖️', desc: 'Price & comfort' },
  { id: 'Comfort', label: 'Comfort', icon: '🛋️', desc: 'Relaxation' },
  { id: 'Adventure', label: 'Adventure', icon: '🏔️', desc: 'Active & outdoors' },
  { id: 'Cultural', label: 'Cultural', icon: '🏛️', desc: 'Heritage' },
  { id: 'Foodie', label: 'Foodie', icon: '🍜', desc: 'Cuisine priority' },
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
      errs.travelers = 'Travelers count must be at least 1.';
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
    <div className="max-w-4xl mx-auto space-y-6 py-4 md:py-8">
      {/* Header */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mobility Parameter Configurator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Plan Your Trip
        </h1>
        <p className="text-sm text-slate-600">
          Enter your travel origin, destination, dates, and budget to calculate an optimized mobility plan.
        </p>
      </div>

      {/* Main Planning Card */}
      <form onSubmit={handleSubmit} className="editorial-card rounded-3xl p-6 md:p-8 space-y-6">
        {/* Row 1: From & To Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Starting Location (From)</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. Mangaluru"
                value={form.startingLocation}
                onChange={(e) => setForm({ ...form, startingLocation: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.startingLocation ? 'border-red-500' : 'border-stone-200 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.startingLocation && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.startingLocation}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Destination (To)</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-brand-700" />
              <input
                type="text"
                placeholder="e.g. Goa"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.destination ? 'border-red-500' : 'border-stone-200 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.destination && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.destination}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Dates & Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-900 font-mono font-medium focus:outline-none focus:bg-white transition-all ${
                  errors.startDate ? 'border-red-500' : 'border-stone-200 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.startDate && <p className="text-[11px] text-red-600 mt-1">{errors.startDate}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-900 font-mono font-medium focus:outline-none focus:bg-white transition-all ${
                  errors.endDate ? 'border-red-500' : 'border-stone-200 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.endDate && <p className="text-[11px] text-red-600 mt-1">{errors.endDate}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Travelers</label>
            <div className="relative">
              <Users className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="number"
                min="1"
                max="20"
                value={form.travelers}
                onChange={(e) => setForm({ ...form, travelers: parseInt(e.target.value) || 1 })}
                className={`w-full bg-stone-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-mono font-bold focus:outline-none focus:bg-white transition-all ${
                  errors.travelers ? 'border-red-500' : 'border-stone-200 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.travelers && <p className="text-[11px] text-red-600 mt-1">{errors.travelers}</p>}
          </div>
        </div>

        {/* Row 3: Total Budget & Travel Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Total Travel Budget (INR ₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3.5 top-3 w-4 h-4 text-emerald-700" />
              <input
                type="number"
                placeholder="12000"
                min="1"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-mono font-bold placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.budget ? 'border-red-500' : 'border-stone-200 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.budget && <p className="text-[11px] text-red-600 mt-1">{errors.budget}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Travel Style & Preference</label>
            <div className="grid grid-cols-3 gap-2">
              {TRAVEL_STYLES.slice(0, 3).map((style) => {
                const isSelected = form.preference === style.id || form.preference === style.id.toLowerCase();
                return (
                  <button
                    type="button"
                    key={style.id}
                    onClick={() => setForm({ ...form, preference: style.id })}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                        : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100 font-medium'
                    }`}
                  >
                    <span className="text-xs block truncate">{style.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Travel Style Badges (Extended) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {TRAVEL_STYLES.slice(3).map((style) => {
            const isSelected = form.preference === style.id || form.preference === style.id.toLowerCase();
            return (
              <button
                type="button"
                key={style.id}
                onClick={() => setForm({ ...form, preference: style.id })}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100 font-medium'
                }`}
              >
                <span className="text-xs block truncate">{style.label}</span>
              </button>
            );
          })}
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-slate-900 hover:bg-brand-700 text-white font-bold text-base rounded-2xl shadow-soft transition-all flex items-center justify-center space-x-2"
          >
            <span>Build My Trip</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
