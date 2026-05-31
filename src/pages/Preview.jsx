import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { exportPDF } from "../utils/exportPDF";
import { ProfessionalCV } from "../components/templates/ProfessionalCV";
import {
  DEFAULT_PAPER_SIZE,
  DEFAULT_TEMPLATE_ID,
  INITIAL_CV_DATA,
  PAPER_SIZES,
  STORAGE_KEYS,
  getTemplateById,
} from "../data/cv";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Toast from "../components/ui/Toast";

export default function Preview() {
  const navigate = useNavigate();
  const [cvData] = useLocalStorage(STORAGE_KEYS.cvData, INITIAL_CV_DATA);
  const [paperSize, setPaperSize] = useLocalStorage(
    STORAGE_KEYS.paperSize,
    DEFAULT_PAPER_SIZE,
  );
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedTemplateId] = useLocalStorage(
    STORAGE_KEYS.selectedTemplate,
    DEFAULT_TEMPLATE_ID,
  );
  const selectedTemplate = getTemplateById(selectedTemplateId);
  const paper = PAPER_SIZES[paperSize] ?? PAPER_SIZES.a4;

  const handleDownload = async () => {
    let timer = null;
    try {
      setIsGenerating(true);
      setToastOpen(true);
      setProgress(5);

      // animate progress up to 90% while export runs
      timer = setInterval(() => {
        setProgress((p) => Math.min(90, p + Math.random() * 12));
      }, 300);

      await exportPDF("cv-render-area", "My_Professional_CV.pdf", paperSize, {
        fitToSinglePage: true,
      });

      // clear any previous error message on success
      setErrorMessage("");

      // finish
      setProgress(100);
      setTimeout(() => setToastOpen(false), 700);
    } catch (err) {
      console.error("Export error:", err);
      setErrorMessage(err?.message || "Gagal membuat PDF");
      setToastOpen(true);
      setProgress(0);
    } finally {
      if (timer) clearInterval(timer);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
            <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Preview</p>
                <p className="mt-1 text-sm text-[#475569]">{selectedTemplate.name} • {paper.label}</p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                {Object.values(PAPER_SIZES).map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setPaperSize(size.id)}
                    className={`rounded-md px-3 py-1 text-sm font-semibold transition-all ${
                      paperSize === size.id
                        ? "bg-white text-[#1E293B] shadow-sm"
                        : "text-[#475569] hover:text-[#1E293B]"
                    }`}>
                    {size.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/builder")}
                  className="text-sm px-3 py-2 border-slate-200 bg-white text-[#1E293B] hover:bg-slate-50">
                  Edit
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="text-sm px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] focus:ring-blue-300">
                  {isGenerating ? "Membuat..." : "Unduh"}
                </Button>
              </div>
              </div>
            </div>

            <Toast
              open={toastOpen}
              title={isGenerating ? "Membuat PDF" : errorMessage ? "Gagal" : "Selesai"}
              message={isGenerating ? "Menyiapkan dokumen untuk diunduh" : errorMessage || "PDF siap"}
              progress={progress}
              onClose={() => {
                setToastOpen(false);
                setErrorMessage("");
              }}
            />

            <div className="overflow-x-auto bg-slate-100/60 p-2 sm:p-3 lg:p-4">
              <div className="mx-auto w-fit">
                <ProfessionalCV data={cvData} templateId={selectedTemplate.id} paperSize={paperSize} />
              </div>
            </div>
          </section>
          <aside className="rounded-lg border border-slate-200 bg-white p-4 text-[#1E293B] shadow-soft">
            <h2 className="text-sm font-bold">Periksa cepat</h2>
            <ul className="mt-3 space-y-2 text-sm leading-5 text-[#475569]">
              <li>Nama & kontak sudah benar</li>
              <li>Pengalaman disusun dari yang relevan</li>
              <li>Ringkasan singkat dan jelas</li>
            </ul>

            <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Template aktif</p>
              <p className="mt-1 text-sm font-semibold text-[#1E293B]">{selectedTemplate.name}</p>
              {selectedTemplate.description ? (
                <p className="mt-1 text-xs text-[#475569] line-clamp-2">{selectedTemplate.description}</p>
              ) : null}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
