"use client";
export default function SubsystemsPage() {
  const systems = ["Propulsion", "Power", "Communication", "Navigation", "Thermal"];
  return (
    <div className="p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Subsystem Status</h1>
      <div className="grid grid-cols-2 gap-4">
        {systems.map((s) => (
          <div key={s} className="bg-slate-900/40 border border-slate-800 p-4 rounded-lg flex justify-between">
            <span>{s} System</span>
            <span className="text-emerald-400 font-bold">OK</span>
          </div>
        ))}
      </div>
    </div>
  );
}