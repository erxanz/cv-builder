import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export default function Templates() {
  const navigate = useNavigate();

  const templates = [
    {
      id: "modern",
      name: "Modern Clean",
      desc: "Desain minimalis dan fokus pada konten.",
    },
    {
      id: "minimal",
      name: "Minimalist",
      desc: "Gaya klasik yang cocok untuk korporat.",
    },
    {
      id: "creative",
      name: "Creative UI",
      desc: "Cocok untuk desainer dan pekerja kreatif.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Pilih Template CV
          </h2>
          <p className="text-gray-600 mt-2">
            Pilih desain yang paling sesuai dengan kepribadian dan industri
            Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              {/* Dummy Image Placeholder */}
              <div className="w-full h-80 bg-gray-100 rounded-xl mb-4 border border-gray-200 flex items-center justify-center group-hover:border-blue-300 transition-colors">
                <span className="text-gray-400 font-medium">
                  {tpl.name} Preview
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{tpl.name}</h3>
              <p className="text-gray-500 text-sm mt-1 mb-5">{tpl.desc}</p>
              <Button onClick={() => navigate("/builder")} className="w-full">
                Gunakan Template Ini
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
