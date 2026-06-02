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
    id: "ats-fulltext",
    name: "ATS Full Text",
    category: "ATS",
    description:
      "Tampilan full tulisan tanpa kartu visual, dengan struktur sederhana dan fokus pada teks agar lebih mudah dipindai sistem ATS.",
    layout: "ats",
    accent: "slate",
    gradient: "from-slate-900 via-slate-700 to-slate-500",
    muted: "bg-slate-50 text-slate-700 border-slate-200",
    ring: "ring-slate-200",
    highlights: ["ATS friendly", "Full tulisan", "Mudah dipindai"],
    idealFor: ["Semua posisi", "Fresh graduate", "Administrasi"],
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

export const STORAGE_KEYS = {
  cvData: "cv_data_autosave_v2",
  selectedTemplate: "cv_selected_template",
  paperSize: "cv_paper_size",
};

export const INITIAL_CV_DATA = {
  personal: {
    fullName: "Nama Lengkap",
    title: "Posisi atau jurusan",
    photoUrl: "",
    email: "nama@domain.com",
    phone: "+62 812 3456 7890",
    github: "github.com/username",
    linkedin: "linkedin.com/in/username",
    summary:
      "Ringkasan singkat tentang profil profesional, minat utama, dan arah karier yang ingin ditonjolkan.",
  },
  education: [
    {
      school: "Nama Institusi",
      degree: "Program Studi atau jurusan",
      year: "Tahun / Status",
    },
  ],
  experience: [
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
  ],
  projects: [
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
  ],
  skills: "React, JavaScript, Tailwind CSS, Node.js, Git",
};

export function getTemplateById(templateId) {
  return CV_TEMPLATES.find((template) => template.id === templateId) ?? CV_TEMPLATES[0];
}

export function getPaperSizeById(paperSizeId) {
  return PAPER_SIZES[paperSizeId] ?? PAPER_SIZES.a4;
}
