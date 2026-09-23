import React from 'react';
import { PieChart, ShieldCheck } from 'lucide-react';

export default function BudgetBreakdown({ breakdown = [], totalBudget = 12000, estimatedTotal = 10300, remainingBudget = 1700 }) {
  return (
    <div className="editorial-card rounded-3xl p-5 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Spend Categories</span>
            <h3 className="text-base font-bold text-slate-900">Estimated Budget Breakdown</h3>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-normal">
        Clean allocation breakdown maintaining a safety reserve of ₹{remainingBudget.toLocaleString()} for spontaneous activities.
      </p>

      {/* Category List */}
      <div className="space-y-3 pt-1">
        {breakdown.map((item, idx) => {
          const percentage = Math.round((item.amount / totalBudget) * 100);
          return (
            <div key={idx} className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900">{item.category}</span>
                <span className="font-mono font-bold text-slate-700">₹{item.amount?.toLocaleString()} ({percentage}%)</span>
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="pt-3 border-t border-stone-200 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-slate-600">Total Estimated Spend:</span>
          <span className="font-bold text-slate-900 text-sm">₹{estimatedTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-xs font-mono bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
          <span className="text-emerald-800 font-bold">Remaining Safety Reserve:</span>
          <span className="font-bold text-emerald-800 text-sm">₹{remainingBudget.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/80 text-xs text-slate-600 flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>Mobility planner strictly enforces your ₹{totalBudget.toLocaleString()} budget ceiling.</span>
      </div>
    </div>
  );
}
