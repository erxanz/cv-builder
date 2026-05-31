export const PAPER_SIZES = {
  a4: {
    id: "a4",
    label: "A4",
    width: 210,
    height: 297,
    description: "Ukuran standar paling aman untuk lamaran kerja.",
  },
  f4: {
    id: "f4",
    label: "F4",
    width: 215,
    height: 330,
    description: "Sedikit lebih panjang untuk ruang isi yang lega.",
  },
};

export const CV_TEMPLATES = [
  {
    id: "executive",
    name: "Executive Slate",
    category: "Profesional",
    description:
      "Layout formal dengan penekanan pada hierarki informasi dan keterbacaan tinggi.",
    layout: "compact",
    accent: "slate",
    gradient: "from-slate-950 via-slate-800 to-slate-600",
    muted: "bg-slate-50 text-slate-700 border-slate-200",
    ring: "ring-slate-200",
    highlights: ["ATS friendly", "Cocok untuk korporat", "Tegas dan rapi"],
    idealFor: ["Teknik", "IT", "Bisnis"],
  },
  {
    id: "boardroom",
    name: "Boardroom Classic",
    category: "Premium",
    description:
      "Gaya eksekutif dengan header kuat, ruang putih lega, dan struktur isi yang terasa sangat rapi.",
    layout: "photo",
    accent: "emerald",
    gradient: "from-emerald-900 via-teal-700 to-slate-800",
    muted: "bg-emerald-50 text-emerald-800 border-emerald-100",
    ring: "ring-emerald-200",
    highlights: ["Profesional", "Elegan", "Siap interview"],
    idealFor: ["Manajemen", "Komunikasi", "Sales"],
  },
  {
    id: "modern",
    name: "Modern Line",
    category: "Minimalis",
    description:
      "Gaya modern dengan aksen biru bersih dan ruang putih yang lapang.",
    layout: "classic",
    accent: "blue",
    gradient: "from-blue-700 via-sky-500 to-cyan-400",
    muted: "bg-blue-50 text-blue-700 border-blue-100",
    ring: "ring-blue-200",
    highlights: ["Ringkas", "Elegan", "Mudah dipindai"],
    idealFor: ["Semua jurusan", "Fresh graduate", "ATS"],
  },
  {
    id: "editorial",
    name: "Editorial Warm",
    category: "Full Text",
    description:
      "Komposisi hangat dengan aksen emas yang terasa premium dan tenang.",
    layout: "fulltext",
    accent: "amber",
    gradient: "from-amber-700 via-orange-500 to-rose-400",
    muted: "bg-amber-50 text-amber-800 border-amber-100",
    ring: "ring-amber-200",
    highlights: ["Premium", "Rapi", "Cocok portofolio"],
    idealFor: ["Hukum", "Sastra", "Jurnalisme"],
  },
  {
    id: "academic",
    name: "Academic Atlas",
    category: "Akademik",
    description:
      "Fokus pada pendidikan, riset, dan pengalaman akademik untuk mahasiswa atau dosen.",
    layout: "academic",
    accent: "slate",
    gradient: "from-slate-800 via-slate-600 to-sky-500",
    muted: "bg-slate-50 text-slate-700 border-slate-200",
    ring: "ring-slate-200",
    highlights: ["Akademik", "Riset", "Terstruktur"],
    idealFor: ["Mahasiswa", "Dosen", "Peneliti"],
  },
  {
    id: "portrait",
    name: "Portrait Pro",
    category: "Foto",
    description:
      "Layout dengan area foto yang rapi agar CV terlihat lebih personal tanpa mengorbankan formalitas.",
    layout: "photo",
    accent: "emerald",
    gradient: "from-emerald-800 via-teal-600 to-cyan-500",
    muted: "bg-emerald-50 text-emerald-800 border-emerald-100",
    ring: "ring-emerald-200",
    highlights: ["Ada foto", "Profesional", "Rapi"],
    idealFor: ["Layanan publik", "HR", "Sales"],
  },
  {
    id: "portfolio",
    name: "Portfolio Grid",
    category: "Kreatif",
    description:
      "Lebih hidup untuk jurusan desain, media, dan produk, tetapi tetap rapi saat dicetak.",
    layout: "classic",
    accent: "blue",
    gradient: "from-indigo-700 via-sky-500 to-cyan-400",
    muted: "bg-indigo-50 text-indigo-700 border-indigo-100",
    ring: "ring-indigo-200",
    highlights: ["Kreatif", "Portofolio", "Visual bersih"],
    idealFor: ["Desain", "DKV", "Arsitektur"],
  },
];

export const DEFAULT_TEMPLATE_ID = CV_TEMPLATES[0].id;
export const DEFAULT_PAPER_SIZE = PAPER_SIZES.a4.id;

export const INITIAL_CV_DATA = {
  personal: {
    fullName: "Rahman Badio",
    title: "Backend Software Engineering Intern",
    photoUrl: "",
    email: "email@domain.com",
    phone: "+62 812 0000 0000",
    github: "github.com/rahmanbadio",
    linkedin: "linkedin.com/in/rahmanbadio",
    summary:
      "Mahasiswa semester 6 yang sedang menjalani program magang. Memiliki minat kuat pada pengembangan infrastruktur backend, manajemen database, dan teknologi cloud.",
  },
  education: [
    {
      school: "Nama Universitas",
      degree: "Nama Jurusan",
      year: "Mahasiswa Semester 6",
    },
  ],
  experience: [
    {
      company: "Periode Magang Saat Ini",
      role: "Internship",
      duration: "Sekarang",
      description: "",
      bullets: [
        "Tulis tugas utama magang di sini.",
        "Tulis kontribusi teknis atau kolaborasi tim di sini.",
        "Tulis hasil atau dampak yang terukur di sini.",
      ],
    },
  ],
  projects: [
    {
      name: "Konfigurasi Web Server Staging",
      summary:
        "Merancang server menggunakan HG680P STB dengan implementasi Nginx, MySQL, dan Cloudflare Tunnels.",
      tags: ["Infrastructure", "Nginx", "Cloudflare Tunnels"],
    },
    {
      name: "Membangun Bookshelf App",
      summary:
        "Pengembangan aplikasi manajemen buku dengan alur yang sederhana, terstruktur, dan mudah dipelihara.",
      tags: ["Web App", "Productivity", "CRUD"],
    },
  ],
  skills: "Nginx, MySQL, PostgreSQL, Docker, Supabase",
};

export function getTemplateById(templateId) {
  return CV_TEMPLATES.find((template) => template.id === templateId) ?? CV_TEMPLATES[0];
}

export function getPaperSizeById(paperSizeId) {
  return PAPER_SIZES[paperSizeId] ?? PAPER_SIZES.a4;
}
