import React from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiChevronRight,
  FiClock,
  FiCircle,
  FiFolder,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { getPaperSizeById, getTemplateById } from "../../data/cv";

const defaultEducation = [
  {
    school: "Nama Institusi",
    degree: "Program Studi atau jurusan",
    year: "Tahun / Status",
  },
];

const defaultExperience = [
  {
    company: "Nama perusahaan atau organisasi",
    role: "Nama peran",
    duration: "2024 - Sekarang",
    description: "",
    bullets: [
      "Tulis tanggung jawab utama di sini.",
      "Tulis kontribusi atau pencapaian yang relevan.",
      "Tulis hasil kerja yang bisa diukur jika ada.",
    ],
  },
];

const defaultProjects = [
  {
    name: "Dashboard Manajemen Tugas",
    summary:
      "Aplikasi dummy untuk mencatat, memantau, dan menyelesaikan tugas dengan alur yang sederhana.",
    tags: ["Web App", "CRUD", "Dashboard"],
  },
  {
    name: "Portal Portofolio Pribadi",
    summary:
      "Contoh proyek untuk menampilkan profil, pengalaman, dan karya dalam tampilan yang ringkas.",
    tags: ["Portfolio", "React", "UI"],
  },
];

const sectionTitleClass =
  "text-[11px] font-bold uppercase tracking-[0.34em] text-slate-500";

const templatePalette = {
  slate: {
    accent: "#0f172a",
    soft: "#eff6ff",
    text: "#1e293b",
  },
  emerald: {
    accent: "#047857",
    soft: "#ecfdf5",
    text: "#064e3b",
  },
  blue: {
    accent: "#2563eb",
    soft: "#eff6ff",
    text: "#1d4ed8",
  },
  amber: {
    accent: "#d97706",
    soft: "#fffbeb",
    text: "#92400e",
  },
};

function resolveContactHref(kind, value) {
  if (!value) {
    return null;
  }

  if (kind === "email") {
    return `mailto:${value}`;
  }

  if (kind === "phone") {
    return `tel:${value.replace(/\s+/g, "")}`;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.includes("github.com") || value.includes("linkedin.com")) {
    return `https://${value}`;
  }

  return null;
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      <p className={sectionTitleClass}>{eyebrow}</p>
      <h2 className="text-xl font-bold tracking-tight text-[#1E293B] sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-[#475569]">{description}</p>
      ) : null}
    </div>
  );
}

function ContactItem({ icon: Icon, label, value, href }) {
  const node = (
    <span className="flex items-start gap-2 rounded-2xl bg-[#F8FAFCCC] px-3 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F8FAFC]">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm">
        <Icon className="text-sm" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-medium text-[#1E293B]">
          {value}
        </span>
      </span>
    </span>
  );

  if (!href) {
    return node;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      {node}
    </a>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-100">
      {children}
    </span>
  );
}

function TimelineItem({ item, isLast }) {
  return (
    <article className={`relative pl-9 ${isLast ? "" : "pb-4"}`}>
      <span className="absolute left-3 top-2 h-full w-px bg-slate-200" aria-hidden="true" />
      <span className="absolute left-0.5 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900">
        <FiCircle className="text-[10px] fill-current" />
      </span>

      <div className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-[#1E293B]">{item.role}</p>
            <p className="mt-1 text-sm font-semibold text-slate-600">{item.company}</p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <FiClock className="text-[10px]" />
            {item.duration}
          </div>
        </div>

        {item.description ? (
          <p className="text-sm leading-6 text-[#475569]">{item.description}</p>
        ) : null}

        {Array.isArray(item.bullets) && item.bullets.length > 0 ? (
          <ul className="space-y-2">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm leading-6 text-[#475569]">
                <FiChevronRight className="mt-1 shrink-0 text-[#2563EB]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-[#F8FAFCB3] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-[#F8FAFC]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <FiFolder className="text-base" />
          </span>
          <div>
            <p className="text-base font-bold text-[#1E293B]">{project.name}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Selected project
            </p>
          </div>
        </div>

        <FiArrowUpRight className="mt-1 text-lg text-[#2563EB] opacity-70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      </div>

      <p className="mt-4 text-sm leading-6 text-[#475569]">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function getInitials(fullName) {
  return (fullName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function PhotoFrame({ fullName, photoUrl, majorLabel, palette }) {
  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
        <div className="aspect-4/5 w-full">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`Foto profil ${fullName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: `linear-gradient(180deg, ${palette.soft} 0%, #ffffff 100%)` }}>
              <div className="text-center">
                <div
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-black shadow-sm"
                  style={{ backgroundColor: palette.accent, color: "#ffffff" }}>
                  {getInitials(fullName || "Nama Lengkap") || "CV"}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Photo ready
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">{majorLabel}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-1 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Foto profil
        </p>
        <p className="text-lg font-bold text-[#1E293B]">{fullName || "Nama Lengkap"}</p>
        <p className="text-sm text-slate-600">{majorLabel}</p>
      </div>
    </div>
  );
}

export function ProfessionalCV({
  data,
  templateId = "executive",
  paperSize = "a4",
}) {
  const { personal = {}, education, experience, skills, projects } = data || {};
  const template = getTemplateById(templateId);
  const paper = getPaperSizeById(paperSize);
  const palette = templatePalette[template.accent] ?? templatePalette.slate;
  const layout = template.layout ?? "classic";
  const isPhotoLayout = layout === "photo";
  const isFullTextLayout = layout === "fulltext";
  const isAcademicLayout = layout === "academic";

  const skillItems = (skills || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const contactItems = [
    {
      icon: FiMail,
      label: "Email",
      value: personal.email || "email@domain.com",
      href: resolveContactHref("email", personal.email || "email@domain.com"),
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: personal.phone || "+62 812 0000 0000",
      href: resolveContactHref("phone", personal.phone || "+62 812 0000 0000"),
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: personal.github || "github.com/username",
      href: resolveContactHref("github", personal.github || "github.com/username"),
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: personal.linkedin || "linkedin.com/in/username",
      href: resolveContactHref("linkedin", personal.linkedin || "linkedin.com/in/username"),
    },
  ];

  const educationItems = education?.length ? education : defaultEducation;
  const experienceItems = experience?.length ? experience : defaultExperience;
  const projectItems = projects?.length ? projects : defaultProjects;
  const primaryEducation = educationItems[0];
  const majorLabel =
    primaryEducation?.degree || personal.title || "Program studi atau jurusan";
  const summaryText =
    personal.summary ||
    "Ringkasan singkat tentang profil profesional, minat utama, dan arah karier yang ingin ditonjolkan.";
  const articleClassName =
    "mx-auto overflow-hidden rounded-[34px] border border-slate-200 bg-white text-[#1E293B] shadow-[0_18px_60px_rgba(15,23,42,0.08)] " +
    (isFullTextLayout ? "p-6 sm:p-10" : "p-5 sm:p-8 lg:p-10");

  return (
    <article
      id="cv-render-area"
      aria-label={`Resume ${template.name} ${paper.label}`}
      style={{ width: `${paper.width}mm`, minHeight: `${paper.height}mm` }}
      className={articleClassName}>
      {isPhotoLayout ? (
        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-5 border-b border-slate-200 pb-8 lg:border-b-0 lg:pb-0">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.34em]"
                style={{ backgroundColor: palette.soft, color: palette.text }}>
                {template.category} • {paper.label}
              </span>

              <div>
                <h1 className="text-4xl font-black tracking-tight text-[#1E293B] sm:text-5xl">
                  {personal.fullName || "Nama Lengkap"}
                </h1>
                <p className="mt-3 max-w-2xl text-lg font-semibold sm:text-xl" style={{ color: palette.accent }}>
                  {personal.title || "Posisi atau jurusan"}
                </p>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-[#475569] sm:text-base">
                {summaryText}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {contactItems.map((item) => (
                  <ContactItem key={item.label} {...item} />
                ))}
              </div>
            </div>

            <PhotoFrame
              fullName={personal.fullName || "Nama Lengkap"}
              photoUrl={personal.photoUrl}
              majorLabel={majorLabel}
              palette={palette}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <aside className="space-y-8">
              <section className="space-y-3">
                <SectionHeading
                  eyebrow="Tentang Saya"
                  title="Profil singkat"
                  description="Layout dengan foto tetap mempertahankan area ringkasan yang tenang dan mudah dibaca." />
                <p className="mt-4 text-sm leading-7 text-[#475569]">{summaryText}</p>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Pendidikan"
                  title="Riwayat akademik"
                  description="Cocok untuk mahasiswa atau lulusan baru yang ingin menonjolkan jurusan." />

                <div className="space-y-3">
                  {educationItems.map((edu) => (
                    <article key={`${edu.school}-${edu.degree}`} className="rounded-2xl bg-[#F8FAFCB3] p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-sm">
                          <FiBookOpen className="text-base" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-bold text-[#1E293B]">{edu.year}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">{edu.school}</p>
                          <p className="mt-1 text-sm leading-6 text-[#475569]">{edu.degree}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Keahlian Teknis"
                  title="Skill utama"
                  description="Keahlian penting tetap ditampilkan sebagai chip agar tampilan foto tetap rapi." />

                <div className="mt-5 flex flex-wrap gap-2">
                  {skillItems.length > 0 ? (
                    skillItems.map((skill) => <Pill key={skill}>{skill}</Pill>)
                  ) : (
                    <p className="text-sm text-[#475569]">Keahlian belum ditambahkan.</p>
                  )}
                </div>
              </section>
            </aside>

            <section className="space-y-8">
              <section className="space-y-4">
                <SectionHeading
                  eyebrow="Pengalaman"
                  title="Timeline magang"
                  description="Pengalaman profesional atau proyek kerja ditata di kolom utama agar lebih fokus." />

                <div className="space-y-1">
                  {experienceItems.map((item, index) => (
                    <TimelineItem
                      key={`${item.role}-${index}`}
                      item={item}
                      isLast={index === experienceItems.length - 1}
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Proyek"
                  title="Sorotan portofolio"
                  description="Kartu proyek tetap bersih agar CV dengan foto tidak terasa penuh." />

                <div className="grid gap-4 md:grid-cols-2">
                  {projectItems.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </section>
            </section>
          </div>
        </div>
      ) : isFullTextLayout ? (
        <div className="space-y-8">
          <header className="space-y-5 border-b border-slate-200 pb-8">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.34em]"
              style={{ backgroundColor: palette.soft, color: palette.text }}>
              {template.category} • {paper.label}
            </span>

            <div>
              <h1 className="text-4xl font-black tracking-tight text-[#1E293B] sm:text-5xl">
                {personal.fullName || "Nama Lengkap"}
              </h1>
              <p className="mt-3 max-w-3xl text-lg font-semibold sm:text-xl" style={{ color: palette.accent }}>
                {personal.title || "Posisi atau jurusan"}
              </p>
            </div>

            <p className="max-w-4xl text-sm leading-7 text-[#475569] sm:text-base">
              {summaryText}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {contactItems.map((item) => (
                <ContactItem key={item.label} {...item} />
              ))}
            </div>
          </header>

          <div className="space-y-8">
            <section className="space-y-4">
              <SectionHeading
                eyebrow="Pendidikan"
                title="Riwayat akademik"
                description="Template full-text menempatkan pendidikan lebih awal agar cocok untuk jurusan yang banyak menilai latar akademik." />

              <div className="space-y-3">
                {educationItems.map((edu) => (
                  <article key={`${edu.school}-${edu.degree}`} className="rounded-2xl border border-slate-200 bg-[#F8FAFCB3] p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-sm">
                        <FiBookOpen className="text-base" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-[#1E293B]">{edu.year}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">{edu.school}</p>
                        <p className="mt-1 text-sm leading-6 text-[#475569]">{edu.degree}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <SectionHeading
                eyebrow="Pengalaman"
                title="Catatan profesional"
                description="Berguna untuk jurusan hukum, sastra, administrasi, atau posisi yang memerlukan deskripsi naratif." />

              <div className="space-y-1">
                {experienceItems.map((item, index) => (
                  <TimelineItem
                    key={`${item.role}-${index}`}
                    item={item}
                    isLast={index === experienceItems.length - 1}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <SectionHeading
                eyebrow="Proyek"
                title="Portofolio pilihan"
                description="Kartu proyek tetap dipertahankan, tetapi disusun sesederhana mungkin supaya narasinya lebih dominan." />

              <div className="grid gap-4 md:grid-cols-2">
                {projectItems.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <SectionHeading
                eyebrow="Keahlian Teknis"
                title="Skill utama"
                description="Daftar skill tetap ada di bagian akhir agar template terasa benar-benar full tulisan." />

              <div className="flex flex-wrap gap-2">
                {skillItems.length > 0 ? (
                  skillItems.map((skill) => <Pill key={skill}>{skill}</Pill>)
                ) : (
                  <p className="text-sm text-[#475569]">Keahlian belum ditambahkan.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      ) : isAcademicLayout ? (
        <div className="space-y-8">
          <header className="grid gap-6 border-b border-slate-200 pb-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.34em]"
                style={{ backgroundColor: palette.soft, color: palette.text }}>
                {template.category} • {paper.label}
              </span>

              <div>
                <h1 className="text-4xl font-black tracking-tight text-[#1E293B] sm:text-5xl">
                  {personal.fullName || "Nama Lengkap"}
                </h1>
                <p className="mt-3 max-w-2xl text-lg font-semibold sm:text-xl" style={{ color: palette.accent }}>
                  {majorLabel}
                </p>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-[#475569] sm:text-base">
                {summaryText}
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {contactItems.map((item) => (
                  <ContactItem key={item.label} {...item} />
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-200 bg-[#F8FAFCB3] p-5">
              <SectionHeading
                eyebrow="Fokus Akademik"
                title="Jurusan & konteks"
                description="Layout ini menonjolkan jalur pendidikan lebih dulu, lalu pengalaman dan proyek sebagai bukti pendukung." />

              <div className="mt-5 space-y-3">
                {educationItems.map((edu) => (
                  <article key={`${edu.school}-${edu.degree}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{edu.year}</p>
                    <p className="mt-2 text-base font-bold text-[#1E293B]">{edu.school}</p>
                    <p className="mt-1 text-sm leading-6 text-[#475569]">{edu.degree}</p>
                  </article>
                ))}
              </div>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
            <aside className="space-y-8">
              <section className="space-y-4">
                <SectionHeading
                  eyebrow="Pendidikan"
                  title="Riwayat akademik"
                  description="Cocok untuk jurusan yang ingin menonjolkan universitas, gelar, dan status studi." />

                <div className="space-y-3">
                  {educationItems.map((edu) => (
                    <article key={`${edu.school}-${edu.degree}`} className="rounded-2xl bg-[#F8FAFCB3] p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-sm">
                          <FiBookOpen className="text-base" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-bold text-[#1E293B]">{edu.year}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">{edu.school}</p>
                          <p className="mt-1 text-sm leading-6 text-[#475569]">{edu.degree}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Keahlian"
                  title="Skill utama"
                  description="Daftar skill ditampilkan ringkas agar fokus tetap ada pada portofolio akademik." />

                <div className="flex flex-wrap gap-2">
                  {skillItems.length > 0 ? (
                    skillItems.map((skill) => <Pill key={skill}>{skill}</Pill>)
                  ) : (
                    <p className="text-sm text-[#475569]">Keahlian belum ditambahkan.</p>
                  )}
                </div>
              </section>
            </aside>

            <section className="space-y-8">
              <section className="space-y-4">
                <SectionHeading
                  eyebrow="Pengalaman"
                  title="Timeline kegiatan"
                  description="Pengalaman kerja, organisasi, atau riset tetap menjadi bukti pendukung yang mudah dibaca." />

                <div className="space-y-1">
                  {experienceItems.map((item, index) => (
                    <TimelineItem
                      key={`${item.role}-${index}`}
                      item={item}
                      isLast={index === experienceItems.length - 1}
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Proyek"
                  title="Sorotan portofolio"
                  description="Cocok untuk skripsi, penelitian, atau proyek akademik yang ingin dipertahankan sebagai referensi." />

                <div className="grid gap-4 md:grid-cols-2">
                  {projectItems.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </section>
            </section>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="mb-2 flex flex-col gap-6 border-b border-slate-200 pb-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.34em]"
                style={{ backgroundColor: palette.soft, color: palette.text }}>
                {template.category} • {paper.label}
              </span>

              <div>
                <h1 className="text-4xl font-black tracking-tight text-[#1E293B] sm:text-5xl">
                  {personal.fullName || "Nama Lengkap"}
                </h1>
                <p className="mt-3 max-w-2xl text-lg font-semibold sm:text-xl" style={{ color: palette.accent }}>
                  {personal.title || "Posisi atau jurusan"}
                </p>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-[#475569] sm:text-base">
                {summaryText}
              </p>

              <div className="flex flex-wrap gap-2">
                {(template.idealFor || []).map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:w-xl">
              {contactItems.map((item) => (
                <ContactItem key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="space-y-8">
              <section className="space-y-3">
                <SectionHeading
                  eyebrow="Tentang Saya"
                  title="Profil singkat"
                  description="Ringkasan fokus profesional dan arah minat teknis yang ingin ditonjolkan." />
                <p className="mt-4 text-sm leading-7 text-[#475569]">{summaryText}</p>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Pendidikan"
                  title="Riwayat akademik"
                  description="Sediakan nama universitas dan jurusan untuk melengkapi identitas akademik." />

                <div className="space-y-3">
                  {educationItems.map((edu) => (
                    <article key={`${edu.school}-${edu.degree}`} className="rounded-2xl bg-[#F8FAFCB3] p-4">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-sm">
                          <FiBookOpen className="text-base" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-bold text-[#1E293B]">{edu.year}</p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">{edu.school}</p>
                          <p className="mt-1 text-sm leading-6 text-[#475569]">{edu.degree}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Keahlian Teknis"
                  title="Skill utama"
                  description="Pill/tag sederhana dengan aksen biru untuk menonjolkan stack yang paling relevan." />

                <div className="mt-5 flex flex-wrap gap-2">
                  {skillItems.length > 0 ? (
                    skillItems.map((skill) => <Pill key={skill}>{skill}</Pill>)
                  ) : (
                    <p className="text-sm text-[#475569]">Keahlian belum ditambahkan.</p>
                  )}
                </div>
              </section>
            </aside>

            <section className="space-y-8">
              <section className="space-y-4">
                <SectionHeading
                  eyebrow="Pengalaman"
                  title="Timeline magang"
                  description="Tampilkan progres internship saat ini dengan bullet point yang bisa diisi ulang." />

                <div className="space-y-1">
                  {experienceItems.map((item, index) => (
                    <TimelineItem
                      key={`${item.role}-${index}`}
                      item={item}
                      isLast={index === experienceItems.length - 1}
                    />
                  ))}
                </div>
              </section>

              <section className="space-y-4 border-t border-slate-200 pt-8">
                <SectionHeading
                  eyebrow="Proyek"
                  title="Sorotan portofolio"
                  description="Kartu proyek dibuat ringkas, bersih, dan memiliki efek hover halus untuk menambah interaksi visual." />

                <div className="grid gap-4 md:grid-cols-2">
                  {projectItems.map((project) => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
                </div>
              </section>
            </section>
          </div>
        </div>
      )}
    </article>
  );
}
