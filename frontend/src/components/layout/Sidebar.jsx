import { NavLink } from "react-router-dom";
import { LayoutGrid, Users, FlaskConical, ClipboardList, LogOut, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, code: "01" },
  { to: "/patients", label: "Patients", icon: Users, code: "02" },
  { to: "/tests", label: "Tests", icon: FlaskConical, code: "03" },
  { to: "/reports", label: "Reports", icon: ClipboardList, code: "04" },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Backdrop — mobile only, shown while drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-teal-950 text-teal-50 flex flex-col h-full
        transform transition-transform duration-200 ease-out
        lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-6 py-6 border-b border-teal-500/40 flex items-start justify-between">
          <div>
            <p className="font-display font-bold text-xl tracking-tight text-white">DoctorLog</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-teal-100/70 mt-0.5">
              Pathology Console
            </p>
          </div>
          <button
            onClick={close}
            className="lg:hidden text-teal-50/80 hover:text-white p-1 -mr-1 -mt-1"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, code }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                  isActive
                    ? "bg-teal-950 text-teal-200 font-medium"
                    : "text-teal-50/85 hover:bg-teal-500/50"
                }`
              }
            >
              <span className="accession text-[10px] opacity-60 w-4">{code}</span>
              <Icon size={17} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-teal-500/40">
          <div className="px-2 pb-3">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-teal-100/60 truncate">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-teal-50/85 hover:bg-teal-500/50 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
