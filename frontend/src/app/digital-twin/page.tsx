"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import SatelliteModel from "@/components/SatelliteModel";
import { Activity, Radio, ShieldAlert } from "lucide-react";

export default function DigitalTwinPage() {
  return (
    <div className="h-[calc(100vh-8rem)] w-full flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 3D Viewport Panel */}
      <div className="flex-1 relative rounded-xl bg-black border border-slate-800/50 overflow-hidden shadow-2xl">
        
        {/* Futuristic Overlay UI */}
        <div className="absolute top-6 left-6 z-10">
          <h2 className="text-2xl font-bold text-white tracking-widest drop-shadow-lg">ORBITAL TWIN</h2>
          <p className="text-cyan-400 font-mono text-xs mt-1">AXIS: FREE-ROTATION | SCENE: LEO</p>
        </div>
        
        <div className="absolute bottom-6 left-6 z-10 flex gap-4">
          <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 px-4 py-2 rounded-lg flex items-center gap-3">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            <span className="text-xs text-slate-300 font-mono">TELEMETRY LINK: NOMINAL</span>
          </div>
        </div>

        {/* The Three.js Canvas */}
        <Canvas camera={{ position: [5, 4, 7], fov: 45 }}>
          <color attach="background" args={["#020617"]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
          
          <Environment preset="city" />
          <SatelliteModel />
          <OrbitControls enablePan={false} autoRotate={false} maxDistance={15} minDistance={3} />
        </Canvas>
      </div>

      {/* Side Diagnostics Panel */}
      <div className="w-80 flex flex-col gap-4">
        <div className="bg-slate-900/40 border border-slate-800/50 backdrop-blur-md rounded-xl p-5">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-4">Structural Diagnostics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
              <span className="text-sm text-slate-300 flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-500" /> Array Alpha</span>
              <span className="text-emerald-400 font-mono text-sm">100%</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
              <span className="text-sm text-slate-300 flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-500" /> Array Beta</span>
              <span className="text-emerald-400 font-mono text-sm">98.2%</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800/50 pb-2">
              <span className="text-sm text-slate-300 flex items-center gap-2"><Radio className="w-4 h-4 text-amber-500" /> Comm Dish</span>
              <span className="text-amber-400 font-mono text-sm">82.1%</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm text-slate-300 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-red-500" /> Thermal Shield</span>
              <span className="text-red-400 font-mono text-sm">WARNING</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}