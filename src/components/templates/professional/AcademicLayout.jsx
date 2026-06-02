import { ContactItem, Pill, ProjectCard, SectionHeading, TimelineItem } from "./shared";

export function AcademicLayout({ model, template, paper, palette }) {
  const { personal, contactItems, educationItems, experienceItems, projectItems, skillItems, majorLabel, summaryText } = model;

  return (
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
  );
}