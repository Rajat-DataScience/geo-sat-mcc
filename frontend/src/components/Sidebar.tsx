"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  AlertTriangle,
  Wrench,
  Cpu,
  Radio,
  BrainCircuit,
  Bot,
  Box,
  Globe2,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Telemetry", href: "/telemetry", icon: Activity },
  { name: "Anomaly Detection", href: "/anomalies", icon: AlertTriangle, alert: 7 },
  { name: "Predictive Maint.", href: "/maintenance", icon: Wrench },
  { name: "Subsystems", href: "/subsystems", icon: Cpu },
  { name: "Live Monitor", href: "/live", icon: Radio, badge: "LIVE" },
  { name: "ML Insights", href: "/ml-insights", icon: BrainCircuit },
  { name: "AI Assistant", href: "/orion", icon: Bot },
  { name: "Digital Twin", href: "/digital-twin", icon: Box },
  { name: "Orbital Analytics", href: "/orbital", icon: Globe2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-slate-800/50 bg-[#06090F]/90 backdrop-blur-xl flex flex-col z-50 transition-all">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold tracking-wider text-sm">
            GEO-SAT MCC
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-hide">
        <div className="px-3 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          Mission Views
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${isActive ? "bg-slate-800/50 text-white" : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-200"}`}>
                <div className="flex items-center gap-3">
                  <item.icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {item.alert && (
                  <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-red-500/20">
                    {item.alert}
                  </span>
                )}
                {item.badge && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-emerald-500/20">
                    {item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}