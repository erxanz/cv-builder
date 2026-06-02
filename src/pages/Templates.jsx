import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  DEFAULT_TEMPLATE_ID,
  CV_TEMPLATES,
  getTemplateById,
} from "../data/cv";
import { useLocalStorage } from "../hooks/useLocalStorage";

function formatLayoutLabel(layout) {
  if (layout === "ats") return "ATS";
  if (layout === "fulltext") return "Full Text";
  if (layout === "compact") return "Compact";
  if (layout === "classic") return "Classic";
  if (layout === "photo") return "Foto";
  if (layout === "academic") return "Akademik";
  return layout;
}

export default function Templates() {
  const navigate = useNavigate();
  const [, setSelectedTemplate] = useLocalStorage("cv_selected_template", DEFAULT_TEMPLATE_ID);
  const [query, setQuery] = useState("");
  const [previewId, setPreviewId] = useState(null);

  const filtered = useMemo(() => {
    if (!query) return CV_TEMPLATES;
    return CV_TEMPLATES.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()) || t.category.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const handleChooseTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">Template</h1>
            <p className="mt-1 text-sm text-slate-600">Pilih desain, lalu lanjutkan ke builder.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/builder")} className="px-4 py-2">Langsung ke Builder</Button>
            <Button variant="secondary" onClick={() => navigate("/")} className="px-4 py-2">Kembali</Button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari template atau kategori..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm focus:outline-none"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tpl) => (
            <article key={tpl.id} className="group overflow-hidden rounded-2xl border bg-white p-4 shadow-sm">
              <div className="mb-3 h-40 w-full rounded bg-slate-50" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{tpl.category}</p>
                  <h3 className="mt-1 text-lg font-bold">{tpl.name}</h3>
                </div>
                <div className="text-sm text-slate-600">{formatLayoutLabel(tpl.layout)}</div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button onClick={() => handleChooseTemplate(tpl.id)} className="px-3 py-2">Pakai</Button>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setPreviewId(tpl.id)} className="px-3 py-2">Preview</Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {previewId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-w-3xl rounded-lg bg-white p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">Preview Template</h3>
                  <p className="text-sm text-slate-600">{getTemplateById(previewId).name}</p>
                </div>
                <div>
                  <Button variant="ghost" onClick={() => setPreviewId(null)}>Tutup</Button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="h-72 w-full overflow-hidden rounded border bg-slate-50">
                  <div className="h-full w-full bg-white p-6">
                    <div className="h-8 w-48 rounded bg-slate-100" />
                    <div className="mt-4 h-5 w-40 rounded bg-slate-100" />
                    <div className="mt-6 h-40 w-full rounded bg-slate-100" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Deskripsi</h4>
                  <p className="mt-2 text-sm text-slate-600">{getTemplateById(previewId).description}</p>
                  <div className="mt-4">
                    <h5 className="text-sm font-medium">Highlight</h5>
                    <ul className="mt-2 ml-4 list-disc text-sm text-slate-600">
                      {getTemplateById(previewId).highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button onClick={() => { handleChooseTemplate(previewId); setPreviewId(null); }}>Pakai Template Ini</Button>
                    <Button variant="secondary" onClick={() => setPreviewId(null)}>Tutup</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
