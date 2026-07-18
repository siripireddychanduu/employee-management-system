import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import type { Employee } from "../types/employee";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  ArrowLeft,
  User,
  Briefcase,
  Calendar,
  Phone,
  Mail,
  Award,
  Landmark,
} from "lucide-react";

interface EmployeeResponse {
  success: boolean;
  employee: Employee;
}

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      const response = await api.get<EmployeeResponse>(`/employees/${id}`);
      setEmployee(response.data.employee);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner text="Retrieving employee profile record..." />
        </div>
      </DashboardLayout>
    );
  }

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="max-w-md mx-auto my-12 p-6 bg-amber-50 border border-amber-100 rounded-2xl text-center">
          <h3 className="text-sm font-bold text-gray-900 mb-1">
            Profile Not Found
          </h3>
          <p className="text-xs text-amber-700 mb-4">
            The target user account record doesn't exist or was removed.
          </p>
          <Link
            to="/employees"
            className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to directory
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Dynamic Back Navigation Header Block */}
      <div className="mb-6 select-none">
        <Link
          to="/employees"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Employee List</span>
        </Link>
      </div>

      {/* Hero Profile Status Identification Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-center gap-5 bg-gradient-to-r from-white to-gray-50/40">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-lg text-blue-700 shrink-0 shadow-inner">
          {getInitials(employee.name)}
        </div>

        <div className="text-center sm:text-left min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight truncate">
              {employee.name}
            </h1>
            <div className="flex items-center justify-center gap-1.5 mt-1 sm:mt-0">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  employee.status === "Active"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-amber-50 text-amber-700 border-amber-100"
                }`}
              >
                {employee.status}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">
                {employee.role}
              </span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500 mt-1">
            {employee.designation} —{" "}
            <span className="text-gray-400 font-normal">
              {employee.department}
            </span>
          </p>
        </div>

        <div className="shrink-0 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6 text-center sm:text-right">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Employee Reference
          </span>
          <span className="block font-mono text-sm font-bold text-gray-700 mt-1">
            {employee.employeeId}
          </span>
        </div>
      </div>

      {/* Main Metadata Display Split Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details Information Data Group block */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
            <User className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Contact & Personal Details
            </h3>
          </div>

          <div className="space-y-4">
            <DetailItem
              label="Primary Email"
              value={employee.email}
              icon={<Mail className="w-4 h-4 text-gray-400" />}
              isCopyable
            />
            <DetailItem
              label="Mobile Number"
              value={employee.phone}
              icon={<Phone className="w-4 h-4 text-gray-400" />}
            />
            <DetailItem
              label="System Registration ID"
              value={employee.employeeId}
              icon={<Award className="w-4 h-4 text-gray-400" />}
            />
          </div>
        </div>

        {/* Professional Placement Assignments Data Group block */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Corporate Position & Compensation
            </h3>
          </div>

          <div className="space-y-4">
            <DetailItem
              label="Assigned Department"
              value={employee.department}
              icon={<Landmark className="w-4 h-4 text-gray-400" />}
            />
            <DetailItem
              label="Operational Manager"
              value={employee.manager?.name ?? "Direct Executive Assignment"}
              icon={<User className="w-4 h-4 text-gray-400" />}
            />
            <DetailItem
              label="Annual Base Salary"
              value={`₹${Number(employee.salary).toLocaleString("en-IN")}`}
              icon={<Landmark className="w-4 h-4 text-gray-400" />}
            />
            <DetailItem
              label="Corporate Joining Date"
              value={new Date(employee.joiningDate).toLocaleDateString(
                "en-IN",
                { day: "numeric", month: "long", year: "numeric" },
              )}
              icon={<Calendar className="w-4 h-4 text-gray-400" />}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Inline Sub-Item Field Layout Component Helper
interface DetailItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  isCopyable?: boolean;
}

function DetailItem({
  label,
  value,
  icon,
  isCopyable = false,
}: DetailItemProps) {
  return (
    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50/50 transition-colors group">
      <div className="mt-0.5 shrink-0 p-1 bg-gray-50 rounded-lg group-hover:bg-white border border-gray-100 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        <span className="block text-sm font-medium text-gray-800 mt-0.5 break-all select-all">
          {value}
        </span>
      </div>
    </div>
  );
}
