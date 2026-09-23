import React from 'react';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';

export default function BudgetCard({ totalBudget = 12000, estimatedTotal = 10300, remainingBudget = 1700, currency = '₹' }) {
  const percentSpent = Math.min(Math.round((estimatedTotal / totalBudget) * 100), 100);
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Mobility Budget Tracker</span>
            <h3 className="text-sm font-bold text-white leading-tight">Total Trip Investment</h3>
          </div>
        </div>
        <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
          Target: {currency}{totalBudget.toLocaleString()}
        </span>
      </div>

      {/* Primary Numbers */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Spend</span>
          <div className="text-lg font-bold text-slate-100 font-mono mt-0.5">
            {currency}{estimatedTotal.toLocaleString()}
          </div>
        </div>

        <div className={`rounded-xl p-3 border ${isOverBudget ? 'bg-red-950/30 border-red-800/50' : 'bg-emerald-950/30 border-emerald-800/50'}`}>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">
            {isOverBudget ? 'Budget Deficit' : 'Remaining Savings'}
          </span>
          <div className={`text-lg font-bold font-mono mt-0.5 ${isOverBudget ? 'text-red-400' : 'text-emerald-400'}`}>
            {isOverBudget ? `- ${currency}${Math.abs(remainingBudget).toLocaleString()}` : `${currency}${remainingBudget.toLocaleString()}`}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Budget Capacity</span>
          <span className="font-semibold text-slate-300">{percentSpent}% Allocated</span>
        </div>
        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget
                ? 'bg-red-500'
                : percentSpent > 85
                ? 'bg-amber-500'
                : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${percentSpent}%` }}
          />
        </div>
      </div>

      {isOverBudget && (
        <div className="flex items-center space-x-1.5 text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-900/50">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Trip exceeds allocated budget! Adjust activities or transport options below.</span>
        </div>
      )}
    </div>
  );
}
