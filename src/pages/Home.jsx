import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  FiCheckCircle,
  FiMonitor,
  FiEdit3,
  FiFileText,
  FiLayout,
} from "react-icons/fi";
import { HiOutlinePrinter } from "react-icons/hi2";

const featureItems = [
  {
    icon: FiCheckCircle,
    title: "Struktur rapi",
    desc: "Susunan konten dibuat ringkas agar mudah dibaca, dipindai, dan diedit.",
  },
  {
    icon: FiMonitor,
    title: "Preview jelas",
    desc: "Anda melihat bentuk akhir CV tanpa visual yang berlebihan atau ramai.",
  },
  {
    icon: HiOutlinePrinter,
    title: "Siap cetak",
    desc: "Ekspor tetap fokus pada hasil PDF A4 dan F4 yang terlihat profesional.",
  },
];

const processItems = [
  {
    icon: FiLayout,
    title: "Pilih template",
    desc: "Mulai dari layout yang sesuai kebutuhan, lalu lanjut ke builder.",
  },
  {
    icon: FiEdit3,
    title: "Isi data bertahap",
    desc: "Form disusun per bagian supaya alur kerja lebih tenang dan tidak padat.",
  },
  {
    icon: FiFileText,
    title: "Review dan unduh",
    desc: "Cek hasil akhir lalu ekspor ke PDF dengan ukuran kertas yang tepat.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#eef3f8_42%,#ffffff_100%)] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-144 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.08),transparent_28%)]" />

      <section className="relative pt-32 lg:pt-40">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:pb-24">
          <div className="pt-6 lg:pt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              ATS friendly • A4 / F4 • Auto save
            </div>
            <h1 className="mt-6 max-w-3xl text-balance text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Bangun CV yang lebih rapi, lebih tenang, dan terasa profesional.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Fokus pada isi yang penting, visual yang bersih, dan struktur yang tidak berlapis-lapis. Hasilnya lebih nyaman dilihat dan lebih siap dipakai.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button onClick={() => navigate("/templates")} className="px-8 py-4 text-base">
                Pilih Template
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/builder")}
                className="border-slate-200 bg-white px-8 py-4 text-base text-slate-700 hover:bg-slate-50 hover:text-slate-950">
                Isi Data Sekarang
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {featureItems.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                  <item.icon className="text-2xl text-sky-600" />
                  <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:pt-10">
            <div className="absolute -left-4 top-10 hidden h-24 w-24 rounded-full bg-sky-300/20 blur-3xl lg:block" />
            <div className="absolute right-2 top-0 hidden h-36 w-36 rounded-full bg-slate-400/15 blur-3xl lg:block" />
            <div className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_22px_80px_rgba(15,23,42,0.08)]">
              <div className="rounded-[26px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 text-slate-900">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Preview CV
                    </div>
                    <div className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                      Rahman Badio
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-600">
                      Mahasiswa & Intern
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Paper</div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">A4</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Ringkasan
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      Mahasiswa yang fokus pada backend dan sistem yang andal, dengan pengalaman magang dan proyek mandiri.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Keahlian
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Docker", "MySQL", "PostgreSQL", "React"].map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Layout
                    </div>
                    <div className="mt-1 text-sm font-semibold">Minimal</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      Status
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">Siap diunduh</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                      Format
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-900">A4 / F4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fitur" className="px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Fitur utama</p>
              <h2 className="mt-3 text-4xl font-black text-slate-950">Ringkas, bersih, dan fokus ke isi</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Setiap bagian dibuat untuk mengurangi noise visual. Tidak ada kartu yang ditumpuk tanpa fungsi, jadi halaman terasa lebih tenang dan lebih premium.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureItems.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <item.icon className="text-xl" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="alur" className="px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Alur kerja</p>
            <h2 className="mt-3 text-4xl font-black text-slate-950">Tiga langkah yang sederhana dan jelas</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
              Tidak ada alur yang terasa penuh atau membingungkan. Setiap langkah membawa pengguna ke hasil akhir dengan lebih natural.
            </p>
          </div>

          <div className="space-y-4">
            {processItems.map((item, index) => (
              <div key={item.title} className="flex gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <item.icon className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{index + 1}. {item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="template" className="px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-4xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-8 shadow-sm shadow-slate-950/5 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Template</p>
              <h2 className="mt-3 text-4xl font-black text-slate-950">Mulai dari tampilan yang sudah siap pakai</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Pilih layout yang paling cocok untuk kebutuhan Anda, lalu lanjutkan ke builder tanpa harus memulai dari nol.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Button onClick={() => navigate("/templates")} className="px-6 py-3">
                Lihat Semua Template
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 pb-20 pt-0 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-4xl border border-slate-200 bg-white px-8 py-10 shadow-sm shadow-slate-950/5 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Siap mulai</p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">Masuk ke builder dan susun CV Anda sekarang</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Langsung lanjut ke pengisian data jika Anda sudah punya isi CV, atau lihat template dulu bila ingin memilih gaya yang paling cocok.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-self-end">
              <Button variant="secondary" onClick={() => navigate("/templates")}>
                Pilih Template
              </Button>
              <Button onClick={() => navigate("/builder")}>Buka Builder</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
