"use client";
import { useEffect, useState } from "react";
import LiveKPICard from "../components/LiveKPICard";
import TelemetryChart from "../components/TelemetryChart";
import FleetStatus from "../components/FleetStatus";

export default function OverviewPage() {
  const [kpiData, setKpiData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any[]>([]);
  const [liveTelemetry, setLiveTelemetry] = useState({ health: 87, temp: 45, voltage: 12.4 });

  // 1. Initial Data Fetch
  useEffect(() => {
    fetch("http://localhost:8000/api/mission-overview")
      .then((res) => res.json())
      .then((data) => {
        setKpiData(data.kpis);
        setTrendData(data.charts.trend);
        setStatusData(data.charts.distribution);
      });
  }, []);

  // 2. WebSocket Stream Listener
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/telemetry");
    socket.onmessage = (event) => {
      const live = JSON.parse(event.data);
      setLiveTelemetry(live);

      const newPoint = {
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        Thermal: live.temp,
        Power: live.voltage * 2,
        Comms: Math.random() * 10
      };

      setTrendData((prev) => [...prev.slice(1), newPoint]);
    };
    return () => socket.close();
  }, []);

  return (
    <div className="space-y-8 p-6 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-white">GEO Satellite Predictive Maintenance</h2>
        <div className="flex gap-6 text-xs font-mono text-cyan-400">
           <span>TEMP: {liveTelemetry.temp}°C</span>
           <span>VOLTAGE: {liveTelemetry.voltage}V</span>
           <span>HEALTH: {liveTelemetry.health}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => <LiveKPICard key={i} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TelemetryChart data={trendData} />
        <FleetStatus data={statusData} />
      </div>
    </div>
  );
}