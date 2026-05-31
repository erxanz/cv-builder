import React, { forwardRef } from "react";

export const Input = forwardRef(
  ({ label, error, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full mb-4">
        {label && (
          <label className="text-sm font-semibold text-gray-700">{label}</label>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-200 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-100 focus:border-blue-500 hover:border-gray-400"
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
