import React from 'react';
import { useTrip } from '../context/TripContext';
import { signInWithGoogle } from '../lib/supabaseClient';
import { LogIn, Sparkles, ShieldCheck, Compass, MapPin, Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useTrip();

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-brand-700 animate-spin" />
        <span className="text-sm font-semibold text-slate-600">Verifying session...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-8 sm:my-16 space-y-6 text-center">
        <div className="editorial-card rounded-3xl p-6 sm:p-8 space-y-6 border border-stone-200/90 shadow-soft-lg bg-white">
          {/* Logo / Header Icon */}
          <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-700 flex items-center justify-center mx-auto shadow-sm">
            <Compass className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Authentication Required
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In to Use Plan2Trip
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Please sign in with your Google account to plan trips, view optimized mobility routes, and save itineraries.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 text-left space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Save & sync trips securely across all devices</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Real-time Google Maps distance & route planning</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Budget-aware transport & hotel recommendations</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={signInWithGoogle}
            className="w-full py-3.5 px-5 bg-slate-900 hover:bg-brand-700 text-white font-bold text-sm rounded-2xl shadow-soft transition-all flex items-center justify-center space-x-3 group"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    );
  }

  return children;
}
