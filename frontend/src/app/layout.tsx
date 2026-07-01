import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GEO-SAT | Telemetry Platform",
  description: "Enterprise Aerospace Analytics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0E17] text-slate-300 antialiased h-screen overflow-hidden flex`}>
        {/* Animated Sidebar */}
        <Sidebar />

        {/* Main Application Canvas */}
        <main className="flex-1 relative overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0A0E17] to-black">
          
          {/* Top Status Bar */}
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800/50 bg-[#0A0E17]/80 px-8 backdrop-blur-xl">
            <h1 className="text-xl font-semibold tracking-tight text-white drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              Fleet Navigation Panel
            </h1>
            <div className="flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-500 font-mono tracking-wider">SECURE UPLINK ESTABLISHED</span>
            </div>
          </header>

          {/* Page Content Injection */}
          <div className="p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}