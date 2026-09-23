import React from 'react';
import { PieChart, ShieldCheck, DollarSign } from 'lucide-react';

export default function BudgetBreakdown({ breakdown = [], totalBudget = 12000, estimatedTotal = 10300, remainingBudget = 1700 }) {
  return (
    <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <PieChart className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Financial Discipline</span>
            <h3 className="text-sm font-bold text-white">Itemized Budget Allocation</h3>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Smart allocation ensuring guaranteed safety buffer of ₹{remainingBudget.toLocaleString()} for unforeseen expenses.
      </p>

      {/* Categories List */}
      <div className="space-y-2.5 pt-1">
        {breakdown.map((item, idx) => {
          const percentage = Math.round((item.amount / totalBudget) * 100);
          return (
            <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-200">{item.category}</span>
                <span className="font-mono font-bold text-slate-100">₹{item.amount.toLocaleString()} ({percentage}%)</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className={`h-full ${item.color || 'bg-brand-500'} rounded-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="pt-2 border-t border-slate-800 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-400">Total Estimated Cost:</span>
          <span className="font-bold text-white text-sm">₹{estimatedTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-xs font-mono bg-emerald-950/20 p-2 rounded-xl border border-emerald-500/20">
          <span className="text-emerald-400 font-semibold">Remaining Safety Buffer:</span>
          <span className="font-bold text-emerald-300 text-sm">₹{remainingBudget.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-400 flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Mobility engine locked to maximum user cap of ₹{totalBudget.toLocaleString()}.</span>
      </div>
    </div>
  );
}
