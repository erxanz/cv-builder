import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit3, FiEye, FiFileText, FiGrid, FiHome, FiLayout } from "react-icons/fi";

const navItems = [
  { path: "/", label: "Home", icon: FiHome },
  { path: "/templates", label: "Templates", icon: FiGrid },
  { path: "/builder", label: "Builder", icon: FiLayout },
  { path: "/preview", label: "Preview", icon: FiEye },
];

const primaryActions = {
  "/": { label: "Mulai", icon: FiFileText, path: "/builder" },
  "/templates": { label: "Builder", icon: FiLayout, path: "/builder" },
  "/builder": { label: "Preview", icon: FiEye, path: "/preview" },
  "/preview": { label: "Edit", icon: FiEdit3, path: "/builder" },
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = navItems.find((item) => item.path === location.pathname)?.path ?? "/";
  const primaryAction = primaryActions[activePath] ?? primaryActions["/"];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-3 rounded-2xl px-1 py-1 text-left transition hover:bg-slate-50"
          aria-label="Ke beranda">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
            <FiFileText className="text-base" />
          </div>
          <div className="hidden sm:block">
            <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">
              CV
            </div>
            <div className="text-lg font-black tracking-tight text-slate-950">
              Builder
            </div>
          </div>
        </button>

        <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm shadow-slate-950/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                aria-label={item.label}
                title={item.label}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
                }`}>
                <Icon className="text-[1.05rem]" />
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => navigate(primaryAction.path)}
          aria-label={primaryAction.label}
          title={primaryAction.label}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800">
          <primaryAction.icon className="text-[1rem]" />
        </button>
      </div>
    </header>
  );
}