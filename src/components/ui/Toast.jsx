import React from "react";

export function Toast({ open, title, message, progress, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] rounded-2xl bg-white/95 shadow-lg ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="mt-1 text-xs text-slate-600">{message}</p>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
      </div>
      <div className="h-1.5 w-full rounded-b-2xl bg-slate-100">
        <div
          className="h-1.5 rounded-b-2xl bg-emerald-500 transition-all"
          style={{ width: `${Math.min(Math.max(progress || 0, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

export default Toast;
