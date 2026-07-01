// frontend/src/components/FleetStatus.tsx
import { DonutChart } from "@tremor/react";

export default function FleetStatus({ data }: { data: any[] }) {
  return (
    <div className="rounded-xl bg-slate-900/40 border border-slate-800/50 p-6">
      <h3 className="text-sm font-bold text-slate-400 uppercase mb-6">Fleet Status</h3>
      <div className="h-64 w-full [&_path]:stroke-white [&_path]:stroke-2">
        <DonutChart 
          className="h-64" 
          data={data} 
          category="value" 
          index="name" 
          colors={["cyan", "amber", "rose", "violet", "emerald"]} 
        />
      </div>
    </div>
  );
}