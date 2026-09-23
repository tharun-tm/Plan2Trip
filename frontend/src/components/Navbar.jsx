import React, { useState } from 'react';
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/plan', label: 'Plan a Trip' },
    { to: '/explore', label: 'Explore' },
    { to: '/saved', label: 'My Trips' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:bg-brand-700 transition-colors">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-extrabold text-xl text-slate-900 tracking-tight font-sans">TripWise</span>
            <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100 uppercase tracking-wide">
              Smart Mobility
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? 'text-brand-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate('/plan')}
            className="px-4 py-2 bg-slate-900 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center space-x-1.5"
          >
            <span>Plan My Trip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-stone-100 text-slate-700 hover:text-slate-900 border border-stone-200"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-4 border-t border-stone-200/80 mt-3 space-y-2 bg-[#FAF9F6]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-brand-50 text-brand-700 font-bold' : 'text-slate-700 hover:bg-stone-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 px-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/plan');
              }}
              className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2"
            >
              <span>Plan My Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
