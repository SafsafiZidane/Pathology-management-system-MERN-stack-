import { Menu } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

const Topbar = ({ title, subtitle, actions }) => {
  const { toggle } = useSidebar();

  return (
    <header className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4 sm:py-6 border-b border-line bg-surface">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggle}
          className="lg:hidden text-ink p-1.5 -ml-1.5 rounded hover:bg-canvas transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-ink truncate">
            {title}
          </h1>
          {subtitle && <p className="text-sm text-muted mt-0.5 sm:mt-1 truncate">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </header>
  );
};

export default Topbar;
