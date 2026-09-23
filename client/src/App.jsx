import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';

import Home from './pages/Home';
import PlanTrip from './pages/PlanTrip';
import Planning from './pages/Planning';
import TripOverview from './pages/TripOverview';
import Explore from './pages/Explore';
import SavedTrips from './pages/SavedTrips';

import { Smartphone, Monitor, Sparkles } from 'lucide-react';

export default function App() {
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  return (
    <TripProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-16">
          {/* Top Navbar */}
          <Navbar />

          {/* Frame view control for desktop preview testing */}
          <div className="bg-slate-900 border-b border-slate-800/80 py-1.5 px-4 text-xs">
            <div className="max-w-md mx-auto flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                Mobile Viewport Target (390 x 844)
              </span>
              <button
                onClick={() => setIsMobileFrame(!isMobileFrame)}
                className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors border border-slate-700"
              >
                {isMobileFrame ? (
                  <>
                    <Monitor className="w-3 h-3 text-slate-400" /> Full Width View
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3 h-3 text-brand-400" /> 390x844 Frame View
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 py-3 px-3 sm:px-4">
            <div
              className={`mx-auto transition-all duration-300 ${
                isMobileFrame
                  ? 'w-[390px] min-h-[844px] border-[8px] border-slate-800 rounded-[40px] p-3.5 shadow-2xl bg-slate-950 my-2 overflow-y-auto'
                  : 'max-w-md'
              }`}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plan" element={<PlanTrip />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/trip-overview" element={<TripOverview />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/saved" element={<SavedTrips />} />
              </Routes>
            </div>
          </main>

          {/* Fixed Mobile Bottom Navigation */}
          <BottomNav />
        </div>
      </BrowserRouter>
    </TripProvider>
  );
}
