import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  DEFAULT_TEMPLATE_ID,
  CV_TEMPLATES,
} from "../data/cv";
import { useLocalStorage } from "../hooks/useLocalStorage";

const templateStats = [
  { value: "4", label: "template curated" },
  { value: "ATS", label: "struktur aman dipindai" },
  { value: "1 klik", label: "lanjut ke builder" },
];

const selectionNotes = [
  "Fokus ke isi, bukan efek visual yang ramai.",
  "Setiap layout tetap nyaman dibaca di layar dan saat dicetak.",
  "Pemilihan template langsung tersimpan ke builder.",
];

export default function Templates() {
  const navigate = useNavigate();
  const [, setSelectedTemplate] = useLocalStorage(
    "cv_selected_template",
    DEFAULT_TEMPLATE_ID,
  );

  const handleChooseTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    navigate("/builder");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_48%,#ffffff_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_12%_20%,rgba(15,23,42,0.08),transparent_24%),radial-gradient(circle_at_88%_12%,rgba(14,165,233,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.7),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <section className="grid gap-8 rounded-4xl border border-slate-200 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur xl:grid-cols-[1.08fr_0.92fr] xl:p-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 shadow-sm">
              Template Library
            </div>

            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Pilih template yang terasa seperti produk, bukan dekorasi.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Semua layout dibuat tenang, terstruktur, dan siap dipakai untuk lamaran formal. Fokusnya ada pada hierarki isi, keterbacaan, dan hasil cetak yang rapi.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {templateStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
                  <p className="text-2xl font-black tracking-tight text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate("/builder")} className="px-6 py-3">
                Langsung ke Builder
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/")}
                className="border-slate-200 bg-white px-6 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-950">
                Kembali ke Beranda
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  Selection guide
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                  Satu pilihan yang jelas, bukan banyak variasi yang mirip.
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                ATS ready
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {selectionNotes.map((note, index) => (
                <div key={note} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-slate-950">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-300">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {templateStats.map((stat) => (
                <div key={`${stat.label}-compact`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-black text-white">{stat.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
              Template lineup
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Empat arah visual, satu standar yang sama: rapi.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Setiap kartu menampilkan karakter yang berbeda, tetapi semuanya tetap dibatasi oleh struktur yang sederhana dan mudah dipindai.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {CV_TEMPLATES.map((tpl) => (
            <article
              key={tpl.id}
              className={`group overflow-hidden rounded-[28px] border bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)] ${tpl.id === DEFAULT_TEMPLATE_ID ? "border-slate-300 ring-1 ring-slate-900/5" : "border-slate-200"}`}>
              <div className="border-b border-slate-200 p-4">
                <div className={`h-2 rounded-full bg-linear-to-r ${tpl.gradient} opacity-90`} />

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {tpl.category}
                  </p>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${tpl.muted}`}>
                    {tpl.id}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950">
                  {tpl.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {tpl.description}
                </p>
              </div>

              <div className="space-y-5 p-5">
                <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-2 w-20 rounded-full bg-slate-900" />
                      <div className="h-2 w-28 rounded-full bg-slate-300" />
                    </div>
                    <div className={`h-10 w-10 rounded-2xl bg-linear-to-br ${tpl.gradient}`} />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-950/5">
                      <div className="h-7 w-7 rounded-xl bg-slate-950" />
                      <div className="mt-4 h-2 w-16 rounded-full bg-slate-900/90" />
                      <div className="mt-2 h-2 w-12 rounded-full bg-slate-200" />
                    </div>
                    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-950/5">
                      <div className="h-2 w-11/12 rounded-full bg-slate-900/80" />
                      <div className="h-2 w-4/5 rounded-full bg-slate-300" />
                      <div className="h-2 w-3/5 rounded-full bg-slate-200" />
                      <div className="h-2 w-2/3 rounded-full bg-slate-100" />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Profil template
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tpl.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${tpl.muted}`}>
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <Button onClick={() => handleChooseTemplate(tpl.id)} className="w-full">
                  Pakai Template Ini
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
