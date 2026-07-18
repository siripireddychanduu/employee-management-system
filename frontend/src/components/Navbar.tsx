import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white border-b border-gray-100 h-16 px-8 flex justify-between items-center shrink-0 select-none">
      {/* Structural Page Frame Indicator */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase hidden sm:block">
          Enterprise Console
        </h2>
      </div>

      {/* Profile & Session Controls Container */}
      <div className="flex items-center gap-4 ml-auto">
        {/* User Card */}
        <div className="flex items-center gap-3 border-r border-gray-100 pr-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 tracking-tight">
              {user?.name ?? "User Account"}
            </p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider mt-0.5">
              {user?.role?.replace("_", " ") ?? "Employee"}
            </span>
          </div>

          {/* User Visual Avatar Indicator */}
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
            {getInitials(user?.name)}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
          title="Sign out of system"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
