import { forwardRef } from "react";

export const Input = forwardRef(
  ({ label, error, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full mb-5">
        {label && (
          <label className="text-sm font-semibold text-slate-700">{label}</label>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-900 transition-colors focus:outline-none focus:ring-2 shadow-sm ${
            error
              ? "border-red-500 focus:ring-red-200 focus:border-red-500"
              : "border-slate-200 focus:ring-slate-100 focus:border-slate-500 hover:border-slate-300"
          }`}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-red-500">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
