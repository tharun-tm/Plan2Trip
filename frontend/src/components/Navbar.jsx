import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';
import { MapPin, Menu, X, LogIn, LogOut, User, Heart } from 'lucide-react';
import { supabase, signInWithGoogle, signOut } from '../lib/supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
    } else {
      await signInWithGoogle();
    }
  };

  const navLinks = [
    { to: '/plan', label: 'Plan a Trip' },
    { to: '/explore', label: 'Explore' },
    { to: '/favorites', label: 'Favorites', icon: Heart },
    { to: '/saved', label: 'My Trips' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name (Plan2Trip) */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:bg-brand-700 transition-colors">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-black text-xl text-slate-900 tracking-tight font-sans">Plan2Trip</span>
            <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100 uppercase tracking-wide">
              Smart Mobility
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7">
          {navLinks.map((link, idx) => (
            <NavLink
              key={`${link.to}-${link.label}`}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isActive ? 'text-brand-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {link.icon && <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={handleAuthAction}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs rounded-xl border border-stone-200 transition-all flex items-center space-x-1.5"
            title={user ? `Signed in as ${user.email}` : 'Sign in with Google'}
          >
            {user ? (
              <>
                <User className="w-3.5 h-3.5 text-brand-700" />
                <span className="max-w-[120px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                <LogOut className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5 text-brand-700" />
                <span>Sign In</span>
              </>
            )}
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
              key={`${link.to}-${link.label}`}
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
          <div className="pt-2 px-1 space-y-2">
            <button
              onClick={async () => {
                setMobileMenuOpen(false);
                await handleAuthAction();
              }}
              className="w-full py-2.5 bg-stone-100 border border-stone-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center space-x-2"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4 text-slate-600" />
                  <span>Sign Out ({user.email?.split('@')[0]})</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-brand-700" />
                  <span>Sign In with Google</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
