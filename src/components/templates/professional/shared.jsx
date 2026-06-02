import { FiArrowUpRight, FiChevronRight, FiClock, FiCircle } from "react-icons/fi";

const sectionTitleClass =
  "text-[11px] font-bold uppercase tracking-[0.34em] text-slate-500";

export function SectionHeading({ eyebrow, title, description }) {
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

export function ContactItem({ icon: Icon, label, value, href }) {
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

export function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-100">
      {children}
    </span>
  );
}

export function TimelineItem({ item, isLast }) {
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

export function ProjectCard({ project }) {
  const tags = project.tags ?? [];

  return (
    <article className="group rounded-3xl border border-slate-200 bg-[#F8FAFCB3] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-[#F8FAFC]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
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
        {tags.map((tag) => (
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

export function PhotoFrame({ fullName, photoUrl, majorLabel, palette }) {
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