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
  getTemplateById,
} from "../data/cv";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Toast from "../components/ui/Toast";

export default function Preview() {
  const navigate = useNavigate();
  const [cvData] = useLocalStorage("cv_data_autosave", INITIAL_CV_DATA);
  const [paperSize, setPaperSize] = useLocalStorage(
    "cv_paper_size",
    DEFAULT_PAPER_SIZE,
  );
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedTemplateId] = useLocalStorage(
    "cv_selected_template",
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

      await exportPDF("cv-render-area", "My_Professional_CV.pdf", paperSize);

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
      <main className="mx-auto max-w-400 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <section className="overflow-auto rounded-4xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Preview
                </p>
                <p className="mt-1 text-sm text-[#475569]">
                  {selectedTemplate.name} • {paper.label} • {paper.width} x {paper.height} mm
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
                {Object.values(PAPER_SIZES).map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setPaperSize(size.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                      paperSize === size.id
                        ? "bg-white text-[#1E293B] shadow-sm"
                        : "text-[#475569] hover:text-[#1E293B]"
                    }`}>
                    {size.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/builder")}
                  className="border-slate-200 bg-white text-[#1E293B] hover:bg-slate-50 hover:text-[#1E293B]">
                  Kembali Edit
                </Button>
                <Button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] focus:ring-blue-300">
                  {isGenerating ? "Membuat PDF..." : "Unduh PDF"}
                </Button>
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

            <div className="overflow-x-auto rounded-3xl bg-slate-50 p-6">
              <div className="mx-auto w-fit">
                <ProfessionalCV
                  data={cvData}
                  templateId={selectedTemplate.id}
                  paperSize={paperSize}
                />
              </div>
            </div>
          </section>

          <aside className="rounded-4xl border border-slate-200 bg-white p-6 text-[#1E293B] shadow-soft">
            <h2 className="text-lg font-bold">Checklist final</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#475569]">
              <p>Pastikan nama, kontak, dan ringkasan profil sudah paling kuat.</p>
              <p>
                Periksa apakah pengalaman dan pendidikan sudah tersusun dari yang
                paling relevan.
              </p>
              <p>
                Jika CV terasa terlalu padat, kembali ke builder dan sesuaikan
                ukuran kertas.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Template aktif
              </p>
              <p className="mt-2 text-base font-semibold text-[#1E293B]">
                {selectedTemplate.name}
              </p>
              <p className="mt-1 text-sm text-[#475569]">
                {selectedTemplate.description}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
