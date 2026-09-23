import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function HealthStatus() {
  const [status, setStatus] = useState({ loading: true, data: null, error: null });

  const checkHealth = async () => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStatus({ loading: false, data, error: null });
    } catch (err) {
      setStatus({ loading: false, data: null, error: err.message });
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="glass-card rounded-xl p-3 text-xs border border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-brand-500 animate-pulse" />
          <span className="font-semibold text-slate-300">Backend API Status</span>
        </div>
        <button
          onClick={checkHealth}
          className="text-slate-400 hover:text-brand-500 transition-colors p-1 rounded"
          title="Refresh connection status"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${status.loading ? 'animate-spin text-brand-500' : ''}`} />
        </button>
      </div>

      <div className="mt-2 text-slate-400">
        {status.loading ? (
          <span className="text-amber-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            Connecting to backend server...
          </span>
        ) : status.error ? (
          <span className="text-red-400 flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            Backend Offline ({status.error})
          </span>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Connected & Healthy ({status.data?.service})
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Timestamp: {new Date(status.data?.timestamp).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
