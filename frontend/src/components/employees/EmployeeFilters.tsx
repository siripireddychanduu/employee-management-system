import { Filter } from "lucide-react";

interface Props {
  department: string;
  role: string;
  status: string;
  onDepartmentChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function EmployeeFilters({
  department,
  role,
  status,
  onDepartmentChange,
  onRoleChange,
  onStatusChange,
}: Props) {
  const selectClasses =
    "w-full sm:w-40 px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-150 cursor-pointer appearance-none pr-8 relative";

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 select-none">
      {/* Decorative filter icon badge */}
      <div className="hidden lg:flex items-center gap-1.5 text-gray-400 text-xs font-semibold uppercase tracking-wider mr-1">
        <Filter className="w-3.5 h-3.5" />
        <span>Filters</span>
      </div>

      {/* Department Dropdown wrapper */}
      <div className="relative">
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className={`${selectClasses} ${department ? "font-medium text-blue-600 border-blue-200 bg-blue-50/20" : ""}`}
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Role Dropdown wrapper */}
      <div className="relative">
        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className={`${selectClasses} ${role ? "font-medium text-blue-600 border-blue-200 bg-blue-50/20" : ""}`}
        >
          <option value="">All Roles</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="HR_MANAGER">HR Manager</option>
          <option value="EMPLOYEE">Employee</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Status Dropdown wrapper */}
      <div className="relative">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={`${selectClasses} ${status ? "font-medium text-blue-600 border-blue-200 bg-blue-50/20" : ""}`}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Global reset trigger action */}
      {(department || role || status) && (
        <button
          type="button"
          onClick={() => {
            onDepartmentChange("");
            onRoleChange("");
            onStatusChange("");
          }}
          className="text-xs font-semibold text-gray-400 hover:text-rose-600 px-2 py-1.5 rounded-lg hover:bg-rose-50 transition-colors text-center mt-1 sm:mt-0"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
