import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Bangun Karier Anda dengan <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            CV Profesional
          </span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Buat Curriculum Vitae yang menarik perhatian HRD dalam hitungan menit.
          Pilih template, isi data diri, dan unduh format PDF secara gratis.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => navigate("/builder")}
            className="w-full sm:w-auto text-lg px-8 py-3">
            Mulai Buat CV
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/templates")}
            className="w-full sm:w-auto text-lg px-8 py-3">
            Lihat Template
          </Button>
        </div>
      </div>
    </div>
  );
}
