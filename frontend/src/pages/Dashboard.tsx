import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../layouts/DashboardLayout";
import type { DashboardData, DashboardResponse } from "../types/dashboard";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import StatusChart from "../components/dashboard/StatusChart";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get<DashboardResponse>("/dashboard/stats");
      setDashboard(response.data.dashboard);
    } catch {
      setError("Unable to load dashboard performance statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner text="Assembling workspace metrics..." />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-md mx-auto my-12 p-6 bg-rose-50 border border-rose-100 rounded-2xl text-center">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 text-rose-600">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">
            Data Fetch Failed
          </h3>
          <p className="text-xs text-rose-700 mb-4">{error}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 bg-white border border-rose-200 text-xs font-semibold rounded-lg text-rose-700 hover:bg-rose-100/50 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          High-level insights into your company workforce distribution.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
        <Card
          title="Total Employees"
          value={dashboard?.totalEmployees ?? 0}
          type="blue"
          icon={
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />

        <Card
          title="Active Personnel"
          value={dashboard?.activeEmployees ?? 0}
          type="emerald"
          icon={
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <Card
          title="Inactive Record Accounts"
          value={dashboard?.inactiveEmployees ?? 0}
          type="rose"
          icon={
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <Card
          title="Total Departments"
          value={dashboard?.departmentCount ?? 0}
          type="purple"
          icon={
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
        />
      </div>

      {/* Main Grid Graphic Section */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6 items-stretch">
        <div className="lg:col-span-2">
          <DepartmentChart data={dashboard?.departmentStats ?? []} />
        </div>

        <div className="lg:col-span-1">
          <StatusChart
            data={[
              {
                name: "Active",
                value: dashboard?.activeEmployees ?? 0,
              },
              {
                name: "Inactive",
                value: dashboard?.inactiveEmployees ?? 0,
              },
            ]}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

interface CardProps {
  title: string;
  value: number;
  type: "blue" | "emerald" | "rose" | "purple";
  icon: React.ReactNode;
}

// Map styles safely using functional CSS lookup maps
const cardThemeMap = {
  blue: {
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    text: "text-blue-600",
  },
  emerald: {
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    text: "text-emerald-600",
  },
  rose: {
    bg: "bg-rose-50/50",
    border: "border-rose-100",
    text: "text-rose-600",
  },
  purple: {
    bg: "bg-purple-50/50",
    border: "border-purple-100",
    text: "text-purple-600",
  },
};

function Card({ title, value, type, icon }: CardProps) {
  const theme = cardThemeMap[type];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between group hover:border-gray-200 transition-all">
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider truncate">
          {title}
        </span>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2.5">
          {value.toLocaleString()}
        </h2>
      </div>

      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${theme.bg} ${theme.border} ${theme.text}`}
      >
        {icon}
      </div>
    </div>
  );
}
