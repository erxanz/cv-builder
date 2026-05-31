import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
// Import komponen form nantinya di sini, misal: import { CVForm } from '../components/cv/CVForm';

export default function Builder() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-gray-800 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900">CV Editor</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate("/preview")}>
              Lihat Hasil
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
            Data Pribadi
          </h2>

          {/* Ini adalah tempat untuk meletakkan CVForm nantinya */}
          <div className="text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <p>
              Komponen Form (Data Diri, Pendidikan, Pengalaman) akan dirender di
              sini.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
