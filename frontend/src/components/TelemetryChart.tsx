// frontend/src/components/TelemetryChart.tsx
import { AreaChart } from "@tremor/react";

export default function TelemetryChart({ data }: { data: any[] }) {
  return (
    <div className="lg:col-span-2 rounded-xl bg-slate-900/40 border border-slate-800/50 p-6">
      <h3 className="text-sm font-bold text-slate-400 uppercase mb-6">Real-Time Anomaly Trend</h3>
      <AreaChart 
        className="h-72 mt-4" 
        data={data} 
        index="date" 
        categories={["Thermal", "Power", "Comms"]} 
        colors={["cyan", "amber", "red"]} 
      />
    </div>
  );
}