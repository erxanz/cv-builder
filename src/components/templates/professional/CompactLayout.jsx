import { ContactItem, Pill, ProjectCard, SectionHeading, TimelineItem } from "./shared";

export function CompactLayout({ model, template, paper, palette }) {
  const {
    personal,
    skillItems,
    contactItems,
    educationItems,
    experienceItems,
    projectItems,
    summaryText,
  } = model;

  return (
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
  );
}