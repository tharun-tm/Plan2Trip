import React from 'react';
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

export default function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900 pb-16 md:pb-6">
          {/* Responsive Header Navigation */}
          <Navbar />

          {/* Main Genuinely Responsive Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plan" element={<PlanTrip />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/trip-overview" element={<TripOverview />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<SavedTrips />} />
            </Routes>
          </main>

          {/* Mobile Bottom Navigation Bar (md:hidden) */}
          <BottomNav />

          {/* Clean Footer */}
          <footer className="border-t border-stone-200/80 py-6 mt-12 bg-[#FAF9F6] text-center text-xs text-slate-500 font-medium">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>TripWise © 2026 • AI-Powered Smart Mobility Travel Planner</p>
              <p className="text-[11px] text-slate-400 font-mono">Hackathon Edition • Optimized Movement Engine</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </TripProvider>
  );
}
