import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export const defaultEducation = [
  {
    school: "Nama Institusi",
    degree: "Program Studi atau jurusan",
    year: "Tahun / Status",
  },
];

export const defaultExperience = [
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

export const defaultProjects = [
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

export const templatePalette = {
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

export function resolveContactHref(kind, value) {
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

export function buildProfessionalCVModel(data = {}) {
  const { personal = {}, education, experience, skills, projects } = data;

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

  return {
    personal,
    skillItems,
    contactItems,
    educationItems,
    experienceItems,
    projectItems,
    majorLabel,
    summaryText,
  };
}