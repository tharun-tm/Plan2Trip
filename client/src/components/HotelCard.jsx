import React, { useState } from 'react';
import { Bed, Star, MapPin, Wifi, Coffee, Compass, CheckCircle, ArrowRightLeft, ShieldCheck, X } from 'lucide-react';

export default function HotelCard({ hotel, options = [] }) {
  const [showComparison, setShowComparison] = useState(false);

  if (!hotel) return null;

  return (
    <>
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
              <Bed className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Strategic Accommodations</span>
              <h3 className="text-sm font-bold text-white">Recommended Stay</h3>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
            ₹{hotel.pricePerNight.toLocaleString()} / night
          </span>
        </div>

        {/* Main Hotel Banner Card */}
        <div className="bg-slate-900/90 rounded-xl overflow-hidden border border-slate-800 space-y-3">
          <div className="relative h-32 w-full overflow-hidden bg-slate-800">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md text-amber-400 font-bold text-xs px-2 py-0.5 rounded-full flex items-center space-x-1 border border-slate-800">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{hotel.rating}</span>
            </div>
          </div>

          <div className="p-3.5 pt-0 space-y-2">
            <div>
              <h4 className="text-sm font-bold text-white">{hotel.name}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {hotel.location} • <span className="text-teal-300 font-mono text-[11px]">{hotel.distanceToAttractions}</span>
              </p>
            </div>

            {/* Amenities Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hotel.amenities?.map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded-md font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-300">
              <span>Total for {hotel.nights || 2} nights:</span>
              <span className="font-bold text-emerald-400">₹{hotel.totalCost?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Why This Hotel */}
        <div className="bg-teal-950/20 border border-teal-500/20 rounded-xl p-3 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-teal-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Why This Hotel?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            "{hotel.whyThisHotel}"
          </p>
        </div>

        {/* Compare Hotels Action Button */}
        <button
          onClick={() => setShowComparison(true)}
          className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center space-x-2 transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-teal-400" />
          <span>Compare Alternative Hotels</span>
        </button>
      </div>

      {/* Hotel Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Bed className="w-4 h-4 text-teal-400" />
                  Hotel Proximity & Cost Comparison
                </h3>
                <p className="text-xs text-slate-400">Comparing night rates and transit efficiency</p>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    opt.isRecommended
                      ? 'bg-teal-950/20 border-teal-500/50'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-xs font-bold text-white">{opt.name}</h4>
                        {opt.isRecommended && (
                          <span className="text-[9px] bg-teal-500/20 text-teal-300 border border-teal-500/30 px-1.5 py-0.5 rounded font-bold">
                            Top Pick
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{opt.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white">₹{opt.pricePerNight}/night</span>
                      <div className="text-[10px] text-slate-500 font-mono">Total: ₹{opt.totalCost}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-300 bg-slate-900 p-2 rounded-lg border border-slate-800">
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
