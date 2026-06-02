import { SectionHeading } from "./shared";

export function AtsLayout({ model, template, paper, palette }) {
  const { personal, contactItems, educationItems, experienceItems, projectItems, skillItems, summaryText } = model;

  return (
    <div className="space-y-8">
      <header className="space-y-5 border-b border-slate-200 pb-8">
        <span
          className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.34em]"
          style={{ backgroundColor: palette.soft, color: palette.text }}>
          {template.category} • {paper.label}
        </span>

        <div className="space-y-3">
          <h1 className="text-4xl font-black tracking-tight text-[#1E293B] sm:text-5xl">
            {personal.fullName || "Nama Lengkap"}
          </h1>
          <p className="max-w-3xl text-lg font-semibold sm:text-xl" style={{ color: palette.accent }}>
            {personal.title || "Posisi atau jurusan"}
          </p>
          <p className="max-w-4xl text-sm leading-7 text-[#475569] sm:text-base">
            {summaryText}
          </p>
        </div>

        <div className="grid gap-4 text-sm text-[#475569] sm:grid-cols-2 xl:grid-cols-4">
          {contactItems.map((item) => (
            <div key={item.label} className="space-y-1 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
              <p className="wrap-break-word text-sm font-medium text-[#1E293B]">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="space-y-8">
        <section className="space-y-4">
          <SectionHeading
            eyebrow="Pengalaman"
            title="Riwayat kerja"
            description="Versi ATS menaruh pengalaman paling dulu dan mempertahankan isi berbasis teks agar mudah dibaca sistem dan perekrut." />

          <div className="space-y-5">
            {experienceItems.map((item, index) => (
              <article key={`${item.role}-${index}`} className="border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-base font-bold text-[#1E293B]">{item.role}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{item.company}</p>
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {item.duration}
                  </p>
                </div>

                {item.description ? (
                  <p className="mt-3 text-sm leading-6 text-[#475569]">{item.description}</p>
                ) : null}

                {Array.isArray(item.bullets) && item.bullets.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-[#475569]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Keahlian Teknis"
            title="Skill utama"
            description="Keterampilan ditulis dalam format sederhana supaya tetap terbaca di parsing ATS." />

          <p className="text-sm leading-7 text-[#475569]">
            {skillItems.length > 0 ? skillItems.join(", ") : "Keahlian belum ditambahkan."}
          </p>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Pendidikan"
            title="Riwayat akademik"
            description="Disusun ringkas dengan nama institusi, jurusan, dan tahun agar informasi inti cepat dipindai." />

          <div className="space-y-4">
            {educationItems.map((edu) => (
              <article key={`${edu.school}-${edu.degree}`} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{edu.year}</p>
                <p className="mt-1 text-base font-bold text-[#1E293B]">{edu.school}</p>
                <p className="mt-1 text-sm leading-6 text-[#475569]">{edu.degree}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeading
            eyebrow="Proyek"
            title="Sorotan portofolio"
            description="Bagian proyek tetap dipertahankan, tetapi disajikan sebagai daftar teks yang jelas dan ringkas." />

          <div className="space-y-4">
            {projectItems.map((project) => (
              <article key={project.name} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
                <p className="text-base font-bold text-[#1E293B]">{project.name}</p>
                <p className="mt-1 text-sm leading-6 text-[#475569]">{project.summary}</p>
                {project.tags?.length ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {project.tags.join(" • ")}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}