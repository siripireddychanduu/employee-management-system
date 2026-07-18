import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import Swal from "sweetalert2";
import type { Employee, EmployeeResponse } from "../types/employee";
import { AuthContext } from "../context/AuthContext";
import { exportEmployees } from "../utils/exportEmployees";
import EmployeeModal from "../components/employees/EmployeeModal";
import EmployeeForm from "../components/employees/EmployeeForm";
import SearchBar from "../components/employees/SearchBar";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import Pagination from "../components/employees/Pagination";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Search state split: One for fast typing updates, one for delayed network triggers
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);

  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const isHRManager = user?.role === "HR_MANAGER";
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce Effect: Delays the network query until the user stops typing for 400ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when search changes
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // Network Effect: Listens to the debounced state instead of the raw input keystroke
  useEffect(() => {
    loadEmployees();
  }, [debouncedSearch, department, role, status, page, sortBy, order]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get<EmployeeResponse>("/employees", {
        params: {
          search: debouncedSearch,
          department,
          role,
          status,
          page,
          limit: 10,
          sortBy,
          order,
        },
      });
      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
    setPage(1);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await api.get<EmployeeResponse>("/employees", {
        params: {
          search: debouncedSearch,
          department,
          role,
          status,
          page: 1,
          limit: 100000,
          sortBy,
          order,
        },
      });
      exportEmployees(response.data.employees);
    } catch (error) {
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Employee?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/employees/${id}`);
      await Swal.fire({
        title: "Deleted!",
        text: "Employee deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      loadEmployees();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Unable to delete employee.",
        icon: "error",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const RenderSortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field)
      return <span className="text-gray-300 ml-1 text-xs">↕</span>;
    return order === "asc" ? (
      <span className="text-blue-600 ml-1 text-xs">▲</span>
    ) : (
      <span className="text-blue-600 ml-1 text-xs">▼</span>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner text="Loading Employees..." />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Top Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Employees
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage corporate directory, roles, and status levels.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50 w-full md:w-auto"
          >
            {exporting ? (
              "Exporting..."
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Export CSV
              </>
            )}
          </button>

          {(isSuperAdmin || isHRManager) && (
            <button
              onClick={() => {
                setMode("add");
                setSelectedEmployee(null);
                setOpen(true);
              }}
              className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-all shadow-sm hover:shadow w-full md:w-auto"
            >
              <svg
                className="w-4 h-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Employee
            </button>
          )}
        </div>
      </div>

      {/* Modern Search Filter Controls Card */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 mb-6">
        <div className="flex-1 min-w-[280px]">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="shrink-0">
          <EmployeeFilters
            department={department}
            role={role}
            status={status}
            onDepartmentChange={setDepartment}
            onRoleChange={setRole}
            onStatusChange={setStatus}
          />
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-600 font-semibold text-xs tracking-wider uppercase">
                <th
                  onClick={() => handleSort("employeeId")}
                  className="p-4 pl-6 cursor-pointer hover:bg-gray-100/80 transition-colors select-none"
                >
                  ID <RenderSortIcon field="employeeId" />
                </th>
                <th
                  onClick={() => handleSort("name")}
                  className="p-4 cursor-pointer hover:bg-gray-100/80 transition-colors select-none"
                >
                  Name & Details <RenderSortIcon field="name" />
                </th>
                <th
                  onClick={() => handleSort("department")}
                  className="p-4 cursor-pointer hover:bg-gray-100/80 transition-colors select-none"
                >
                  Department <RenderSortIcon field="department" />
                </th>
                <th className="p-4">Manager</th>
                <th
                  onClick={() => handleSort("role")}
                  className="p-4 cursor-pointer hover:bg-gray-100/80 transition-colors select-none"
                >
                  Role <RenderSortIcon field="role" />
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="p-4 cursor-pointer hover:bg-gray-100/80 transition-colors select-none"
                >
                  Status <RenderSortIcon field="status" />
                </th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-0">
                    <div className="py-12">
                      <EmptyState
                        title="No Employees Found"
                        description="There are no employees matching your search or filters parameters."
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    <td className="p-4 pl-6 font-mono text-xs text-gray-500">
                      {employee.employeeId}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-semibold text-xs text-blue-700 shrink-0">
                          {getInitials(employee.name)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <Link
                            to={`/employees/${employee._id}`}
                            className="text-gray-900 font-medium hover:text-blue-600 hover:underline transition-colors truncate"
                          >
                            {employee.name}
                          </Link>
                          <span className="text-xs text-gray-400 truncate mt-0.5">
                            {employee.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-medium text-gray-800">
                      {employee.department}
                    </td>
                    <td className="p-4 text-gray-500">
                      {employee.manager?.name ?? (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600 font-medium">
                        {employee.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          employee.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${employee.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`}
                        />
                        {employee.status}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        {(isSuperAdmin || isHRManager) && (
                          <button
                            onClick={() => {
                              setMode("edit");
                              setSelectedEmployee(employee);
                              setOpen(true);
                            }}
                            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit Record"
                          >
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
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        )}

                        {isSuperAdmin && (
                          <button
                            onClick={() => deleteEmployee(employee._id)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Record"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination & Footer controls block */}
      <div className="flex items-center justify-between mt-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Sheet / Form Modal */}
      <EmployeeModal
        open={open}
        title={
          mode === "add" ? "Create Employee Record" : "Modify Employee Record"
        }
        onClose={() => setOpen(false)}
      >
        <EmployeeForm
          mode={mode}
          employee={selectedEmployee}
          onCancel={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            loadEmployees();
          }}
        />
      </EmployeeModal>
    </DashboardLayout>
  );
}