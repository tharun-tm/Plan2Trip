import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, MapPin, Heart, Bookmark } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/plan', label: 'Plan', icon: Compass },
    { to: '/explore', label: 'Explore', icon: MapPin },
    { to: '/favorites', label: 'Favorites', icon: Heart },
    { to: '/saved', label: 'My Trips', icon: Bookmark },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-stone-200/90 py-1.5 px-2 shadow-lg shadow-slate-900/10">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-0.5 px-2 py-1 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-brand-700 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg transition-all ${isActive ? 'bg-brand-50 text-brand-700 shadow-2xs' : ''}`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-700 fill-brand-700/20' : 'text-slate-500'}`} />
                  </div>
                  <span className="text-[10px] font-medium leading-none tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
