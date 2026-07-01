"use client";
import { useState, useEffect } from "react";
import TelemetryChart from "../../components/TelemetryChart";

export default function TelemetryPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Replace with your actual backend endpoint
    fetch("http://localhost:8000/api/mission-overview")
      .then((res) => res.json())
      .then((res) => setData(res.charts.trend)); // Populate with the trend data
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-white">Full-Spectrum Telemetry</h1>
      {data.length > 0 ? (
        <TelemetryChart data={data} />
      ) : (
        <div className="h-64 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500">
          Loading live telemetry stream...
        </div>
      )}
    </div>
  );
}