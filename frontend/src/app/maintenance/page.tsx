"use client";
import LiveKPICard from "../../components/LiveKPICard";

export default function MaintenancePage() {
  return (
    <div className="space-y-6 p-6 text-white">
      <h1 className="text-2xl font-bold">Predictive Maintenance Forecast</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LiveKPICard title="Next Service" metric="14 Days" />
        <LiveKPICard title="MTBF" metric="342 Days" />
        <LiveKPICard title="Efficiency" metric="94.2%" />
      </div>
      <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800">
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Maintenance Schedule</h3>
        <p className="text-slate-500 italic">Predictive algorithms are calculating next optimal service interval...</p>
      </div>
    </div>
  );
}