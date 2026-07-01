"use client";
export default function LivePage() {
  return (
    <div className="p-6 text-white text-center">
      <h1 className="text-2xl font-bold mb-4">Live Satellite Feed</h1>
      <div className="aspect-video bg-black border border-slate-800 rounded-xl flex items-center justify-center">
        <p className="text-slate-500 font-mono italic">Signal active: Streaming... (0.4ms latency)</p>
      </div>
    </div>
  );
}