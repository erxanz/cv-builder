import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { exportPDF } from "../utils/exportPDF";

export default function Preview() {
  const navigate = useNavigate();

  const handleDownload = () => {
    exportPDF("cv-document", "My_Professional_CV.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Action Bar */}
      <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/builder")}
          className="text-gray-300 hover:text-white">
          &larr; Kembali Edit
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            Pastikan data sudah benar
          </span>
          <Button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700">
            Unduh PDF
          </Button>
        </div>
      </div>

      {/* A4 Paper Container */}
      <div className="flex-1 overflow-auto py-10 flex justify-center items-start">
        {/* ID 'cv-document' penting untuk library html2pdf */}
        <div
          id="cv-document"
          className="bg-white w-[210mm] min-h-[297mm] shadow-2xl p-12 shrink-0">
          {/* Tempat untuk komponen Template (contoh ModernCV) */}
          <div className="animate-pulse flex flex-col items-center justify-center h-[200mm]">
            <div className="text-gray-400 font-medium">
              Area Render Template CV...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
