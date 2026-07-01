// frontend/src/components/LiveKPICard.tsx
export default function LiveKPICard({ title, metric, status }: any) {
    return (
      <div className="relative rounded-xl bg-slate-900/40 border border-slate-800/50 p-5">
        <p className="text-[11px] font-bold text-slate-400 uppercase">{title}</p>
        <h3 className="text-3xl font-bold text-white">{metric}</h3>
      </div>
    );
  }