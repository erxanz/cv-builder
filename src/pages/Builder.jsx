import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { ProfessionalCV } from "../components/templates/ProfessionalCV";
import {
  DEFAULT_PAPER_SIZE,
  DEFAULT_TEMPLATE_ID,
  INITIAL_CV_DATA,
  PAPER_SIZES,
  STORAGE_KEYS,
  getTemplateById,
} from "../data/cv";

const steps = [
  {
    title: "Data Pribadi",
    description: "Isi identitas dan ringkasan profil.",
  },
  {
    title: "Pendidikan",
    description: "Tulis riwayat pendidikan yang paling relevan.",
  },
  {
    title: "Pengalaman",
    description: "Tambahkan magang, proyek, atau pekerjaan.",
  },
  {
    title: "Keahlian",
    description: "Susun skill utama yang ingin ditonjolkan.",
  },
  {
    title: "Review",
    description: "Cek template dan ukuran kertas sebelum lanjut.",
  },
];

export default function Builder() {
  const navigate = useNavigate();
  const [cvData, setCvData] = useLocalStorage(
    STORAGE_KEYS.cvData,
    INITIAL_CV_DATA,
  );
  const [selectedTemplateId] = useLocalStorage(
    STORAGE_KEYS.selectedTemplate,
    DEFAULT_TEMPLATE_ID,
  );
  const [paperSize, setPaperSize] = useLocalStorage(
    STORAGE_KEYS.paperSize,
    DEFAULT_PAPER_SIZE,
  );
  const [currentStep, setCurrentStep] = useState(0);
  const selectedTemplate = useMemo(
    () => getTemplateById(selectedTemplateId),
    [selectedTemplateId],
  );

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  };

  const handleSkillsChange = (e) => {
    setCvData((prev) => ({ ...prev, skills: e.target.value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const photoUrl = typeof reader.result === "string" ? reader.result : "";

      setCvData((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          photoUrl,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  const handlePhotoClear = () => {
    setCvData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        photoUrl: "",
      },
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { school: "", degree: "", year: "" },
      ],
    }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: "", role: "", duration: "", description: "" },
      ],
    }));
  };

  const removeEducation = (index) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const removeExperience = (index) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto grid max-w-400 grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 xl:px-8">
        <section className="relative rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft sm:p-8 lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto lg:pr-4">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-slate-950 px-5 py-4 text-white">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                Alur
              </p>
              <h2 className="mt-1 text-lg font-bold">{selectedTemplate.name}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                {paperSize.toUpperCase()}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                {selectedTemplate.category}
              </span>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2.5">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setCurrentStep(index)}
                aria-current={index === currentStep}
                className={`min-w-40 flex-1 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                  index === currentStep
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                } cursor-pointer`}>
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] opacity-80">
                  Langkah {index + 1}
                </div>
                <div className="mt-1 text-sm font-bold">{step.title}</div>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Step 1
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      Informasi Pribadi
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      Nama, kontak, dan ringkasan singkat.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Nama Lengkap" name="fullName" value={cvData.personal.fullName} onChange={handlePersonalChange} />
                  <Input label="Posisi / Gelar" name="title" placeholder="Misal: Mahasiswa / Software Engineer" value={cvData.personal.title} onChange={handlePersonalChange} />
                  <Input label="Email" name="email" type="email" value={cvData.personal.email} onChange={handlePersonalChange} />
                  <Input label="Telepon" name="phone" value={cvData.personal.phone} onChange={handlePersonalChange} />
                </div>
                <Input label="Alamat" name="address" value={cvData.personal.address} onChange={handlePersonalChange} />

                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-900">Foto Profil</p>
                      <p className="max-w-2xl text-sm leading-6 text-slate-600">
                        Tambahkan foto formal untuk template yang memakai foto. Foto disimpan lokal agar tetap aman saat preview dan export PDF.
                      </p>
                      {cvData.personal.photoUrl ? (
                        <button
                          type="button"
                          onClick={handlePhotoClear}
                          className="text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-950">
                          Hapus foto
                        </button>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        {cvData.personal.photoUrl ? (
                          <img
                            src={cvData.personal.photoUrl}
                            alt="Preview foto profil"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-black uppercase tracking-[0.24em] text-slate-400">
                            {cvData.personal.fullName
                              ? cvData.personal.fullName
                                  .split(" ")
                                  .filter(Boolean)
                                  .slice(0, 2)
                                  .map((part) => part[0])
                                  .join("")
                                  .toUpperCase()
                              : "CV"}
                          </span>
                        )}
                      </div>

                      <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950">
                        Pilih Foto
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm font-semibold text-slate-700">
                    Ringkasan Profil
                  </label>
                  <textarea
                    name="summary"
                    value={cvData.personal.summary}
                    onChange={handlePersonalChange}
                    className="min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-100"
                    placeholder="Tulis 2-4 kalimat yang merangkum pengalaman, keahlian utama, dan arah karier Anda."
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Step 2
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      Pendidikan
                    </h2>
                  </div>
                  <Button variant="secondary" onClick={addEducation}>
                    Tambah Pendidikan
                  </Button>
                </div>
                <div className="space-y-4">
                  {cvData.education.map((education, index) => (
                    <div key={`${education.school}-${index}`} className="space-y-4 border-l-2 border-slate-200 pl-4">
                      <div className="flex items-center justify-between gap-3 pb-1">
                        <p className="text-sm font-semibold text-slate-900">Riwayat Pendidikan {index + 1}</p>
                        <Button variant="ghost" onClick={() => removeEducation(index)} disabled={cvData.education.length === 1}>
                          Hapus
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Input
                          label="Nama Sekolah / Kampus"
                          value={education.school}
                          onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                        />
                        <Input
                          label="Gelar / Jurusan"
                          value={education.degree}
                          onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                        />
                        <Input
                          label="Tahun"
                          value={education.year}
                          onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Step 3
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      Pengalaman
                    </h2>
                  </div>
                  <Button variant="secondary" onClick={addExperience}>
                    Tambah Pengalaman
                  </Button>
                </div>
                <div className="space-y-4">
                  {cvData.experience.map((experience, index) => (
                    <div key={`${experience.company}-${index}`} className="space-y-4 border-l-2 border-slate-200 pl-4">
                      <div className="flex items-center justify-between gap-3 pb-1">
                        <p className="text-sm font-semibold text-slate-900">Pengalaman {index + 1}</p>
                        <Button variant="ghost" onClick={() => removeExperience(index)} disabled={cvData.experience.length === 1}>
                          Hapus
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          label="Perusahaan / Proyek"
                          value={experience.company}
                          onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                        />
                        <Input
                          label="Posisi"
                          value={experience.role}
                          onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                        />
                        <Input
                          label="Durasi"
                          value={experience.duration}
                          onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                        />
                        <Input
                          label="Deskripsi Singkat"
                          value={experience.description}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Step 4
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      Keahlian
                    </h2>
                </div>
                <Input
                  label="Daftar Keahlian (pisahkan dengan koma)"
                  value={cvData.skills}
                  onChange={handleSkillsChange}
                  placeholder="Misal: Microsoft Office, Public Speaking, React"
                />
                <div className="border-t border-slate-200 pt-4 text-sm text-slate-600">
                  Gunakan kata kunci yang singkat dan relevan. Contoh: sistem operasi, framework, bahasa pemrograman, atau soft skill.
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-5">
                <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Step 5
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-slate-950">
                      Review
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Pilih ukuran kertas dan cek tata letak.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {Object.values(PAPER_SIZES).map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setPaperSize(size.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        paperSize === size.id
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-slate-50/60 hover:border-slate-300"
                      }`}>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-lg font-bold">{size.label}</p>
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">
                          {size.width} x {size.height} mm
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 opacity-80">
                        {size.description}
                      </p>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-4 text-sm text-slate-600">
                  Template: <span className="font-semibold text-slate-900">{selectedTemplate.name}</span>. Lanjut ke preview untuk cek.
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-6 lg:sticky lg:bottom-6 lg:bg-white/0 lg:pt-4">
            <Button
              variant="secondary"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}>
              Sebelumnya
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() =>
                  setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
                }>
                Selanjutnya
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/preview")}
                className="bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-400">
                Selesai & Preview
              </Button>
            )}
          </div>

        </section>

        <aside className="hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft lg:flex lg:flex-col lg:items-center lg:justify-start lg:overflow-y-auto lg:sticky lg:top-24">
          <div className="mb-4 w-full border-b border-slate-200 pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Preview langsung
            </p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-950">Tampilan {selectedTemplate.name}</p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                {paperSize.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="mx-auto w-fit">
              <ProfessionalCV data={cvData} templateId={selectedTemplate.id} paperSize={paperSize} />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
