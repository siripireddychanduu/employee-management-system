import type { Employee } from "../../types/employee";

interface Props {
  employees: Employee[];
}

export default function OrganizationTree({ employees }: Props) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderTree = (managerId?: string, isRoot = false) => {
    const children = employees.filter((emp) => {
      if (managerId == null) {
        return !emp.manager || !emp.manager._id;
      }
      return emp.manager?._id === managerId;
    });

    if (children.length === 0) return null;

    return (
      <ul
        className={`relative flex flex-col gap-2 ${!isRoot ? "pl-10 mt-2 border-l-2 border-slate-100" : ""}`}
      >
        {children.map((emp) => (
          <li key={emp._id} className="relative group/node">
            {!isRoot && (
              <div className="absolute -left-10 top-7 w-10 h-0.5 bg-slate-100 group-hover/node:bg-blue-200 transition-colors" />
            )}

            <div className="bg-white border border-gray-100 rounded-2xl p-4 w-72 shadow-sm flex items-start gap-3 hover:border-blue-200 hover:shadow-md transition-all duration-200 bg-gradient-to-br from-white to-gray-50/30">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-xs text-blue-700 shrink-0">
                {getInitials(emp.name)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-gray-400 tracking-wider uppercase truncate">
                    {emp.employeeId}
                  </span>
                  <span
                    className={`inline-flex w-2 h-2 rounded-full shrink-0 ${
                      emp.status === "Active"
                        ? "bg-emerald-500"
                        : "bg-amber-400"
                    }`}
                    title={emp.status}
                  />
                </div>

                <h4 className="text-sm font-bold text-gray-900 truncate mt-0.5">
                  {emp.name}
                </h4>

                <p className="text-xs font-medium text-gray-600 truncate mt-0.5">
                  {emp.designation}
                </p>

                <div className="inline-block mt-2 px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  {emp.department}
                </div>
              </div>
            </div>

            {/* Recursive child structural generation loop call */}
            {renderTree(emp._id, false)}
          </li>
        ))}
      </ul>
    );
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center max-w-sm mx-auto my-12">
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h4 className="text-sm font-bold text-gray-900 mb-0.5">Tree Empty</h4>
        <p className="text-xs text-gray-400">
          No organizational profiles have been loaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-x-auto min-h-[500px]">
      <div className="mb-6 border-b border-gray-50 pb-4">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Reporting Chart
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Visual structural rendering of management operational hierarchy.
        </p>
      </div>

      {/* Root node base wrapper execution wrapper trigger */}
      <div className="p-2 inline-block">{renderTree(undefined, true)}</div>
    </div>
  );
}
