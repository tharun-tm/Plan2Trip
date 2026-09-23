import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Compass, ArrowLeft, Zap } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 py-3 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors mr-1"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center shadow-md shadow-brand-500/20">
              <Compass className="w-4 h-4 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-base text-white tracking-tight">TripWise</span>
                <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 text-brand-400" />
                  Smart Mobility
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-[10px] text-slate-400 bg-slate-900/80 border border-slate-800 px-2 py-1 rounded-full font-mono">
          Hackathon Edition
        </div>
      </div>
    </header>
  );
}
