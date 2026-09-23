import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function BudgetCard({ totalBudget: propsBudget, estimatedTotal: propsEstimated, remainingBudget: propsRemaining, currency = '₹' }) {
  const context = useTrip();

  const totalBudget = propsBudget !== undefined ? propsBudget : context.totalBudgetCap;
  const estimatedTotal = propsEstimated !== undefined ? propsEstimated : context.dynamicEstimatedTotal;
  const remainingBudget = propsRemaining !== undefined ? propsRemaining : context.dynamicRemainingBudget;

  const percentSpent = totalBudget > 0 ? Math.min(Math.round((estimatedTotal / totalBudget) * 100), 100) : 100;
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-slate-800 flex items-center justify-center border border-stone-200">
            <Wallet className="w-4 h-4 text-brand-700" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mobility Budget Plan</span>
            <h3 className="text-sm font-bold text-slate-900">Trip Cost Overview</h3>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-700 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
          Max Cap: {currency}{totalBudget.toLocaleString()}
        </span>
      </div>

      {/* Main Budget Grid */}
      <div className="grid grid-cols-3 gap-3 pt-1">
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Estimated Cost</span>
          <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
            {currency}{estimatedTotal.toLocaleString()}
          </div>
        </div>

        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Budget</span>
          <div className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-0.5">
            {currency}{totalBudget.toLocaleString()}
          </div>
        </div>

        <div className={`p-3 rounded-2xl border ${isOverBudget ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200/80'}`}>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            {isOverBudget ? 'Deficit' : 'Remaining'}
          </span>
          <div className={`text-base sm:text-lg font-bold font-mono mt-0.5 ${isOverBudget ? 'text-red-700' : 'text-emerald-700'}`}>
            {isOverBudget ? `- ${currency}${Math.abs(remainingBudget).toLocaleString()}` : `${currency}${remainingBudget.toLocaleString()}`}
          </div>
        </div>
      </div>

      {/* Visual Capacity Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-600 font-medium">
          <span>Allocated Spend Capacity</span>
          <span className="font-mono font-bold text-slate-900">{percentSpent}% Used</span>
        </div>
        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-stone-200/80">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? 'bg-red-600' : 'bg-slate-900'
            }`}
            style={{ width: `${percentSpent}%` }}
          />
        </div>
      </div>

      {isOverBudget && (
        <div className="flex items-center space-x-2 text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>Estimated trip cost exceeds total budget. Adjust activities or transport options below.</span>
        </div>
      )}
    </div>
  );
}
