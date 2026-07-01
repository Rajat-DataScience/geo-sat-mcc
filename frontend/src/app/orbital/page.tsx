"use client";
export default function OrbitalPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Orbital Analytics</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/40 p-4 rounded-lg">Inclination: 98.2°</div>
        <div className="bg-slate-900/40 p-4 rounded-lg">Altitude: 550km</div>
      </div>
    </div>
  );
}