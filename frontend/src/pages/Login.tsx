import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import type { LoginResponse } from "../types/auth";
import { Eye, EyeOff, Lock, Mail, ShieldAlert } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      login(response.data.employee, response.data.token);

      if (response.data.employee.role === "EMPLOYEE") {
        navigate("/my-profile");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please verify credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  const labelClasses =
    "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";
  const inputClasses =
    "w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-150";

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center items-center p-4 selection:bg-blue-500/10">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-xl p-8 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/10 mx-auto mb-4">
            <span className="text-white text-base font-black tracking-tighter">
              E
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            EMS Workspace Portal
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in below to securely manage corporate records.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-medium mb-5 animate-shake">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="on">
          <div>
            <label className={labelClasses}>Corporate Email</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                autoComplete="email"
                className={inputClasses}
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className={labelClasses}>Password</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={`${inputClasses} pr-10`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center bg-blue-600 text-white h-11 rounded-xl font-medium text-sm hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-600/10 transition-all duration-150 cursor-pointer mt-2"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Verifying credentials...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
