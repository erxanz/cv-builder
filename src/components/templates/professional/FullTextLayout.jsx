import { ContactItem, Pill, ProjectCard, SectionHeading, TimelineItem } from "./shared";

export function FullTextLayout({ model, template, paper, palette }) {
  const { personal, contactItems, educationItems, experienceItems, projectItems, skillItems, summaryText } = model;

  return (
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
  );
}