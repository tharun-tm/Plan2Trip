import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { saveTrip } from '../lib/tripsService';
import { LOCATIONS_DATA } from '../data/karnatakaLocations';
import { MapPin, Calendar, IndianRupee, Users, ArrowRight, AlertCircle, Sparkles, LogIn, Loader2, Check } from 'lucide-react';

const BUDGET_PRESETS = [
  { amount: 100, label: '₹100 (Pocket)' },
  { amount: 500, label: '₹500 (Micro)' },
  { amount: 1000, label: '₹1,000 (Low)' },
  { amount: 5000, label: '₹5,000 (Standard)' },
  { amount: 12000, label: '₹12,000 (Comfort)' },
  { amount: 25000, label: '₹25,000 (Luxury)' },
];

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
  const { tripInputs, updateTripInputs, planData, user, setCurrentTripId } = useTrip();

  const [form, setForm] = useState(tripInputs);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Filter state for location suggestions dropdown
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const filterLocations = (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return LOCATIONS_DATA.slice(0, 15);
    const term = searchTerm.toLowerCase();
    return LOCATIONS_DATA.filter(
      loc =>
        loc.name.toLowerCase().includes(term) ||
        loc.district.toLowerCase().includes(term) ||
        loc.type.toLowerCase().includes(term) ||
        loc.state.toLowerCase().includes(term)
    ).slice(0, 20);
  };

  // Multi-select handler for Travel Style & Preferences
  const togglePreference = (styleId) => {
    let current = [];
    if (Array.isArray(form.preference)) {
      current = [...form.preference];
    } else if (typeof form.preference === 'string' && form.preference) {
      current = form.preference.split(',').map(s => s.trim());
    } else {
      current = ['Balanced'];
    }

    const existsIndex = current.findIndex(p => p.toLowerCase() === styleId.toLowerCase());
    if (existsIndex >= 0) {
      // Don't deselect if it's the only remaining item
      if (current.length > 1) {
        current.splice(existsIndex, 1);
      }
    } else {
      current.push(styleId);
    }

    setForm({ ...form, preference: current });
  };

  const isPreferenceSelected = (styleId) => {
    if (Array.isArray(form.preference)) {
      return form.preference.some(p => p.toLowerCase() === styleId.toLowerCase());
    }
    if (typeof form.preference === 'string' && form.preference) {
      return form.preference.toLowerCase().split(',').map(s => s.trim()).includes(styleId.toLowerCase());
    }
    return styleId.toLowerCase() === 'balanced';
  };

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
    if (!form.budget || Number(form.budget) < 100) {
      errs.budget = 'Total travel budget must be at least ₹100.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError(null);

    if (!validate()) return;

    // Convert preference array to readable string if needed for legacy components
    const normalizedPreference = Array.isArray(form.preference)
      ? form.preference.join(', ')
      : form.preference;

    const finalForm = {
      ...form,
      preference: normalizedPreference,
    };

    updateTripInputs(finalForm);

    // If user is logged in, save to Supabase
    if (user) {
      try {
        setSaving(true);
        const saved = await saveTrip(finalForm, planData, user.id);
        setCurrentTripId(saved.id);
      } catch (err) {
        console.error('Supabase save error:', err);
        const msg = err?.message || err?.details || JSON.stringify(err);
        setSaveError(`Save failed: ${msg}`);
        setSaving(false);
        return;
      } finally {
        setSaving(false);
      }
    }

    navigate('/planning');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4 md:py-8">
      {/* Native Browser Datalist for 100+ Karnataka Districts and Taluks */}
      <datalist id="all-districts-taluks">
        {LOCATIONS_DATA.map((loc) => (
          <option key={`${loc.name}-${loc.district}`} value={loc.name}>
            {loc.name} ({loc.district} - {loc.type})
          </option>
        ))}
      </datalist>

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
          Select origin, destination, multi-style preferences (Adventure, Cultural, Foodie), and budget starting from ₹100!
        </p>
      </div>

      {/* Not logged in notice */}
      {!user && (
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl px-4 py-3 text-sm font-medium">
          <LogIn className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Sign in to save your trip plans across devices. You can still build a trip without signing in.</span>
        </div>
      )}

      {/* Save error */}
      {saveError && (
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 rounded-2xl px-4 py-3 text-sm font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Planning Card */}
      <form onSubmit={handleSubmit} className="editorial-card rounded-3xl p-6 md:p-8 space-y-6">
        {/* Row 1: From & To Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Starting Location (From) */}
          <div className="space-y-1.5 relative">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Starting Location (From)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                list="all-districts-taluks"
                placeholder="Search district / taluk (e.g. Mangaluru, Puttur, Sirsi)"
                value={form.startingLocation}
                onFocus={() => setShowFromSuggestions(true)}
                onChange={(e) => {
                  setForm({ ...form, startingLocation: e.target.value });
                  setShowFromSuggestions(true);
                }}
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

            {/* Dropdown Suggestions List for FROM */}
            {showFromSuggestions && (
              <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-stone-200 rounded-2xl shadow-xl max-h-56 overflow-y-auto divide-y divide-stone-100">
                <div className="p-2 bg-stone-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 border-b border-stone-200">
                  <span>Districts & Taluks ({filterLocations(form.startingLocation).length})</span>
                  <button
                    type="button"
                    onClick={() => setShowFromSuggestions(false)}
                    className="text-slate-500 hover:text-slate-900"
                  >
                    Close ✕
                  </button>
                </div>
                {filterLocations(form.startingLocation).map((loc) => (
                  <button
                    type="button"
                    key={`from-item-${loc.name}-${loc.district}`}
                    onClick={() => {
                      setForm({ ...form, startingLocation: loc.name });
                      setShowFromSuggestions(false);
                    }}
                    className="w-full text-left p-2.5 hover:bg-brand-50 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-brand-700 block">
                        {loc.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        District: {loc.district} • {loc.type}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-stone-100 px-1.5 py-0.5 rounded">
                      {loc.state}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Quick District Select Chips */}
            <div className="pt-1">
              <span className="text-[10px] font-semibold text-slate-400 block mb-1">Popular Origin Hubs:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Mangaluru', 'Puttur', 'Udupi', 'Bengaluru', 'Sirsi', 'Belagavi', 'Mysuru'].map((loc) => (
                  <button
                    type="button"
                    key={`from-${loc}`}
                    onClick={() => setForm({ ...form, startingLocation: loc })}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border transition-all ${
                      form.startingLocation === loc
                        ? 'bg-brand-700 text-white border-brand-700 shadow-xs font-bold'
                        : 'bg-stone-100 text-slate-600 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Destination (To) */}
          <div className="space-y-1.5 relative">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Destination (To)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-brand-700" />
              <input
                type="text"
                list="all-districts-taluks"
                placeholder="Search district / taluk (e.g. Goa, Kundapura, Madikeri)"
                value={form.destination}
                onFocus={() => setShowToSuggestions(true)}
                onChange={(e) => {
                  setForm({ ...form, destination: e.target.value });
                  setShowToSuggestions(true);
                }}
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

            {/* Dropdown Suggestions List for TO */}
            {showToSuggestions && (
              <div className="absolute z-30 left-0 right-0 top-full mt-1 bg-white border border-stone-200 rounded-2xl shadow-xl max-h-56 overflow-y-auto divide-y divide-stone-100">
                <div className="p-2 bg-stone-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 border-b border-stone-200">
                  <span>Districts & Taluks ({filterLocations(form.destination).length})</span>
                  <button
                    type="button"
                    onClick={() => setShowToSuggestions(false)}
                    className="text-slate-500 hover:text-slate-900"
                  >
                    Close ✕
                  </button>
                </div>
                {filterLocations(form.destination).map((loc) => (
                  <button
                    type="button"
                    key={`to-item-${loc.name}-${loc.district}`}
                    onClick={() => {
                      setForm({ ...form, destination: loc.name });
                      setShowToSuggestions(false);
                    }}
                    className="w-full text-left p-2.5 hover:bg-brand-50 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-brand-700 block">
                        {loc.name}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        District: {loc.district} • {loc.type}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-stone-100 px-1.5 py-0.5 rounded">
                      {loc.state}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Quick District Select Chips */}
            <div className="pt-1">
              <span className="text-[10px] font-semibold text-slate-400 block mb-1">Popular Destinations:</span>
              <div className="flex flex-wrap gap-1.5">
                {['Goa', 'Kundapura', 'Gokarna', 'Madikeri (Coorg)', 'Chikmagalur', 'Sakleshpur', 'Dandeli'].map((loc) => (
                  <button
                    type="button"
                    key={`to-${loc}`}
                    onClick={() => setForm({ ...form, destination: loc })}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border transition-all ${
                      form.destination === loc
                        ? 'bg-brand-700 text-white border-brand-700 shadow-xs font-bold'
                        : 'bg-stone-100 text-slate-600 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
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

        {/* Row 3: Total Budget & Travel Style (Multi-select) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Total Budget (INR ₹) starting from ₹100 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Total Travel Budget (INR ₹)
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3.5 top-3 w-4 h-4 text-emerald-700" />
              <input
                type="number"
                placeholder="100"
                min="100"
                step="50"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className={`w-full bg-stone-50 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 font-mono font-bold placeholder-slate-400 focus:outline-none focus:bg-white transition-all ${
                  errors.budget ? 'border-red-500' : 'border-stone-200 focus:border-brand-700'
                }`}
              />
            </div>
            {errors.budget ? (
              <p className="text-[11px] text-red-600 font-medium mt-1">{errors.budget}</p>
            ) : (
              <p className="text-[10px] text-slate-500">Starts from ₹100. Enter any amount you want!</p>
            )}

            {/* Quick Budget Preset Selectors */}
            <div className="pt-1">
              <span className="text-[10px] font-semibold text-slate-400 block mb-1">Quick Budget Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {BUDGET_PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={`budget-${preset.amount}`}
                    onClick={() => setForm({ ...form, budget: preset.amount })}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold border transition-all ${
                      Number(form.budget) === preset.amount
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-stone-100 text-slate-700 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Style Options (Multi-select enabled) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Travel Style & Preferences
              </label>
              <span className="text-[10px] text-brand-700 font-bold bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
                Select multiple ✨
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {TRAVEL_STYLES.slice(0, 3).map((style) => {
                const selected = isPreferenceSelected(style.id);
                return (
                  <button
                    type="button"
                    key={style.id}
                    onClick={() => togglePreference(style.id)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all flex items-center justify-center space-x-1 ${
                      selected
                        ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm ring-1 ring-slate-900'
                        : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100 font-medium'
                    }`}
                  >
                    <span className="text-xs truncate">{style.label}</span>
                    {selected && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Travel Style Badges Extended (Multi-select enabled) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {TRAVEL_STYLES.slice(3).map((style) => {
            const selected = isPreferenceSelected(style.id);
            return (
              <button
                type="button"
                key={style.id}
                onClick={() => togglePreference(style.id)}
                className={`py-2 px-2.5 rounded-xl border text-center transition-all flex items-center justify-center space-x-1 ${
                  selected
                    ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-sm ring-1 ring-slate-900'
                    : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100 font-medium'
                }`}
              >
                <span className="text-xs truncate">{style.label}</span>
                {selected && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Selected Preferences Summary Pill Bar */}
        {Array.isArray(form.preference) && form.preference.length > 0 && (
          <div className="flex items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium text-[11px]">Selected:</span>
            <div className="flex flex-wrap gap-1.5">
              {form.preference.map((pref) => (
                <span
                  key={`selected-${pref}`}
                  className="bg-brand-50 border border-brand-200 text-brand-800 text-[11px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1"
                >
                  <span>{pref}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Primary CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 px-6 bg-slate-900 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl shadow-soft transition-all flex items-center justify-center space-x-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving your trip...</span>
              </>
            ) : (
              <>
                <span>Build My Trip</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
