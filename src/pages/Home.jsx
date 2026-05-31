import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { FiCheckCircle, FiArrowRightCircle, FiLayers } from "react-icons/fi";
import { CV_TEMPLATES } from "../data/cv";

const features = [
  { icon: FiCheckCircle, title: "Mudah digunakan", desc: "Form bertahap, tanpa ribet." },
  { icon: FiLayers, title: "Template responsif", desc: "Beberapa layout siap pakai." },
  { icon: FiArrowRightCircle, title: "Ekspor PDF", desc: "Siap cetak, ukuran A4/F4." },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <header className="container mx-auto px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">CV Builder • Gratis</p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight lg:text-5xl">Buat CV profesional dalam beberapa menit</h1>
            <p className="mb-6 max-w-xl text-lg text-slate-600">Pilih template, isi data bertahap, dan unduh PDF siap pakai. Desain rapi untuk perekrutan modern.</p>

            <div className="flex gap-3">
              <Button onClick={() => navigate('/templates')} className="px-6 py-3">Lihat Template</Button>
              <Button variant="secondary" onClick={() => navigate('/builder')} className="px-6 py-3">Mulai Isi CV</Button>
            </div>
          </div>

          <div className="order-first -mb-6 lg:order-last lg:mb-0">
            <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow">
              <div className="mb-4 h-48 rounded bg-gradient-to-b from-sky-50 to-white" />
              <div className="text-sm text-slate-600">Contoh Template</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-12 rounded bg-slate-50" />
                <div className="h-12 rounded bg-slate-50" />
                <div className="h-12 rounded bg-slate-50" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Mengapa menggunakan layanan ini?</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-slate-200 bg-white p-5">
                <f.icon className="mb-3 text-2xl text-sky-600" />
                <div className="font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Template populer</h3>
            <div className="mt-2 text-right">
              <Button variant="ghost" onClick={() => navigate('/templates')}>Lihat semua</Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CV_TEMPLATES.slice(0, 6).map((tpl) => (
              <div key={tpl.id} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="h-36 w-full rounded bg-slate-50" />
                <div className="mt-3 text-sm font-semibold">{tpl.name}</div>
                <div className="mt-1 text-xs text-slate-500">{tpl.category} • {tpl.layout}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-3 text-sm text-slate-600">Siap mulai? Susun CV-mu sekarang.</div>
          <Button onClick={() => navigate('/builder')} className="px-6 py-3">Buka Builder</Button>
        </div>
      </footer>
    </div>
  );
}
