"use client";
export default function AnomaliesPage() {
  const anomalies = [
    { id: "A-102", status: "Critical", msg: "Voltage Spike Detected", time: "15:20" },
    { id: "B-405", status: "Warning", msg: "Thermal Throttle", time: "15:18" },
  ];

  return (
    <div className="space-y-6 p-6 text-white">
      <h1 className="text-2xl font-bold">Anomaly Detection Log</h1>
      <div className="grid gap-4">
        {anomalies.map((a) => (
          <div key={a.id} className="bg-slate-900/40 border border-red-500/20 p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-red-400">{a.msg}</p>
              <p className="text-xs text-slate-500">ID: {a.id} | {a.time}</p>
            </div>
            <span className="text-[10px] font-bold uppercase bg-red-500/20 px-2 py-1 rounded">{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}