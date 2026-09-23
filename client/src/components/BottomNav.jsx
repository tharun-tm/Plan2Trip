import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, MapPin, Bookmark } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/plan', label: 'Plan Trip', icon: Compass },
    { to: '/explore', label: 'Explore', icon: MapPin },
    { to: '/saved', label: 'Saved', icon: Bookmark },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800 bg-slate-950/90 backdrop-blur-lg py-2 px-3">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'text-brand-400 font-semibold scale-105'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg ${isActive ? 'bg-brand-500/10' : ''}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                  </div>
                  <span className="text-[11px] leading-none">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
