import React, { useState } from 'react';
import { Bed, Star, MapPin, ArrowRight, ShieldCheck, X } from 'lucide-react';

export default function HotelCard({ hotel, options = [] }) {
  const [showComparison, setShowComparison] = useState(false);

  if (!hotel) return null;

  return (
    <>
      <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
              <Bed className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Stay</span>
              <h3 className="text-base font-bold text-slate-900">Budget-Aware Accommodations</h3>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-slate-900 bg-stone-100 border border-stone-200 px-3 py-1 rounded-full">
            ₹{hotel.pricePerNight?.toLocaleString()} / night
          </span>
        </div>

        {/* Image-Oriented Card Layout */}
        <div className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80 space-y-3">
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.rating}</span>
            </div>
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white font-semibold text-xs px-3 py-1 rounded-lg">
              {hotel.location}
            </div>
          </div>

          <div className="p-4 pt-1 space-y-3">
            <div>
              <h4 className="text-base font-bold text-slate-900">{hotel.name}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span className="text-teal-800 font-semibold">{hotel.distanceToAttractions}</span>
              </p>
            </div>

            {/* Amenities Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hotel.amenities?.map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-white text-slate-700 border border-stone-200/90 px-2.5 py-0.5 rounded-lg font-medium shadow-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200/60 flex justify-between items-center text-xs font-mono text-slate-700">
              <span>Total for {hotel.nights || 2} nights:</span>
              <span className="font-bold text-slate-900 text-sm">₹{hotel.totalCost?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Mobility Logic Badge */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3.5 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Why this hotel?</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            "Recommended because it fits your budget and keeps your daily travel time low."
          </p>
        </div>

        {/* Compare Hotels Action Button */}
        <button
          onClick={() => setShowComparison(true)}
          className="w-full py-3 px-4 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center space-x-2 transition-colors shadow-sm"
        >
          <span>Compare hotels</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>

      {/* Hotel Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white border border-stone-200 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-soft-lg">
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div>
                <h3 className="text-base font-bold text-slate-900">Compare Hotel Options</h3>
                <p className="text-xs text-slate-500">Evaluating night rates and sight proximity</p>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="p-2 rounded-xl bg-stone-100 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    opt.isRecommended
                      ? 'bg-stone-50 border-slate-900 shadow-sm'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900">{opt.name}</h4>
                        {opt.isRecommended && (
                          <span className="text-[10px] bg-slate-900 text-white font-bold px-2 py-0.5 rounded-full">
                            Top Pick
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{opt.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono font-bold text-slate-900">₹{opt.pricePerNight}/night</span>
                      <div className="text-[10px] text-slate-500 font-mono">Total: ₹{opt.totalCost}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-stone-200/80">
                    {opt.why}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
