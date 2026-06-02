import { ContactItem, Pill, PhotoFrame, ProjectCard, SectionHeading, TimelineItem } from "./shared";

export function PhotoLayout({ model, template, paper, palette }) {
  const { personal, contactItems, educationItems, experienceItems, projectItems, skillItems, majorLabel, summaryText } = model;

  return (
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
  );
}