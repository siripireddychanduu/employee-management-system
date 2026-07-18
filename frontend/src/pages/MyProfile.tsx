import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import type { Employee } from "../types/employee";
import LoadingSpinner from "../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import EditProfileDialog from "../components/profile/EditProfileDialog";


interface EmployeeResponse {
  success: boolean;
  employee: Employee;
}

export default function MyProfile() {
  const { user } = useContext(AuthContext);
  

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
  if (user?._id) {
    loadProfile();
  }
}, [user]);

  const loadProfile = async () => {
    try {
      const response = await api.get<EmployeeResponse>(
        `/employees/${user?._id}`,
      );
      setEmployee(response.data.employee);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoadingSpinner text="Securing profile details..." />
        </div>
      </DashboardLayout>
    );
  }

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
          <p className="text-sm font-medium text-slate-500">
            Profile data could not be retrieved.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const isStatusActive = employee.status?.toLowerCase() === "active";

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          {/* Elegant Minimalist Header Banner */}
          <div className="relative h-44 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_45%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
          </div>

          {/* Profile Identity Layout */}
          <div className="relative px-6 pb-8 sm:px-10">
            <div className="flex flex-col items-center border-b border-slate-100 pb-8 pt-4 sm:flex-row sm:items-end sm:justify-between sm:space-x-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-end sm:space-x-6">
                {/* Profile Image with subtle ring */}
                <div className="-mt-20 relative z-10 h-32 w-32 shrink-0 rounded-full bg-white p-1 shadow-md ring-1 ring-slate-100">
                  <img
                    src={
                      employee.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=f8fafc&color=6366f1&bold=true`
                    }
                    alt={employee.name}
                    className="h-full w-full rounded-full object-cover bg-slate-50"
                  />
                </div>

                {/* Identity Text */}
                <div className="mt-4 text-center sm:mt-0 sm:text-left">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {employee.name}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <span className="text-sm font-medium text-slate-500">
                      {employee.designation}
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                    <span className="inline-flex items-center rounded-md bg-indigo-50/60 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                      {employee.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 sm:mt-0">
                <button
                  onClick={() => setOpenEdit(true)}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Core Metrics Summary Row */}
            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-slate-50 bg-slate-50/50 p-4 sm:grid-cols-4">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </p>
                <div className="mt-1 flex items-center space-x-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${isStatusActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
                  />
                  <p className="text-sm font-semibold text-slate-800">
                    {employee.status}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Employee ID
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {employee.employeeId}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Department
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {employee.department}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Joined
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {new Date(employee.joiningDate).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "short", day: "numeric" },
                  )}
                </p>
              </div>
            </div>

            {/* Main Information Grid */}
            <div className="mt-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Contact & Organizational Details
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-white p-5 transition-colors duration-200 hover:border-slate-200">
                  <span className="text-xs font-medium text-slate-400">
                    Email Address
                  </span>
                  <p className="mt-1 font-medium text-slate-900 break-all">
                    {employee.email}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-5 transition-colors duration-200 hover:border-slate-200">
                  <span className="text-xs font-medium text-slate-400">
                    Phone Number
                  </span>
                  <p className="mt-1 font-medium text-slate-900">
                    {employee.phone || "—"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-5 transition-colors duration-200 hover:border-slate-200">
                  <span className="text-xs font-medium text-slate-400">
                    Reporting Manager
                  </span>
                  <p className="mt-1 font-medium text-slate-900">
                    {employee.manager?.name || "—"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-5 transition-colors duration-200 hover:border-slate-200">
                  <span className="text-xs font-medium text-slate-400">
                    Work Designation
                  </span>
                  <p className="mt-1 font-medium text-slate-900">
                    {employee.designation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openEdit && (
        <EditProfileDialog
          employee={employee}
          onClose={() => setOpenEdit(false)}
          onSuccess={loadProfile}
        />
      )}
    </DashboardLayout>
  );
}
