import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, GitBranch } from "lucide-react";

export default function Sidebar() {
  const linkBaseClasses =
    "flex items-center gap-3.5 px-4 py-3 mx-3 my-1 rounded-xl font-medium text-sm transition-all duration-200 group relative";

  const activeClasses =
    "bg-blue-600 text-white shadow-md shadow-blue-600/10 font-semibold";
  const inactiveClasses =
    "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60";

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen border-r border-slate-800 flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/60 gap-2.5">
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white text-xs font-black tracking-tighter">
            E
          </span>
        </div>
        <span className="text-base font-bold tracking-wider text-white uppercase">
          EMS Platform
        </span>
      </div>

      {/* Main Navigation Panel */}
      <nav className="flex-1 mt-6 px-1">
        <span className="block px-6 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
          General
        </span>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard
                size={18}
                className={
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-200 transition-colors"
                }
              />
              <span>Dashboard</span>
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          {({ isActive }) => (
            <>
              <Users
                size={18}
                className={
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-200 transition-colors"
                }
              />
              <span>Employees</span>
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </>
          )}
        </NavLink>

        <NavLink
          to="/organization"
          className={({ isActive }) =>
            `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          {({ isActive }) => (
            <>
              <GitBranch
                size={18}
                className={
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-200 transition-colors"
                }
              />
              <span>Organization</span>
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </>
          )}
        </NavLink>
      </nav>

      {/* Footer Meta Details */}
      <div className="p-4 border-t border-slate-800/60 flex items-center gap-3 bg-slate-950/20">
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-300">
          v1.2
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-slate-300 truncate">
            Workspace Admin
          </span>
          <span className="text-[10px] text-slate-500 truncate">
            Enterprise Client
          </span>
        </div>
      </div>
    </aside>
  );
}
