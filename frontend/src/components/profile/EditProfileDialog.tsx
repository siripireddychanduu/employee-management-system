import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import type { Employee } from "../../types/employee";
import { Eye, EyeOff, Phone, Lock, X } from "lucide-react"; // Ensure lucide-react is installed

interface Props {
  employee: Employee;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditProfileDialog({
  employee,
  onClose,
  onSuccess,
}: Props) {
  const [phone, setPhone] = useState(employee.phone);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const payload: { phone: string; password?: string } = { phone };

      // Prevent sending an empty string to avoid clearing or breaking backend validation
      if (password.trim()) {
        payload.password = password;
      }

      await api.put(`/employees/${employee._id}`, payload);
      toast.success("Profile updated successfully");
      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to update profile statistics",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const labelClasses =
    "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider";
  const inputClasses =
    "w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-150 disabled:opacity-50";

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-200"
      onClick={onClose}
    >
      <form
        onSubmit={save}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col transform transition-all border border-gray-100"
        onClick={(e) => e.stopPropagation()}
        autoComplete="off"
      >
        {/* Header section */}
        <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4.5 bg-gray-50/50">
          <div>
            <h2 className="text-base font-bold text-gray-900 tracking-tight">
              Edit Profile
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Modify your own account contact details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-all"
            aria-label="Close dialog"
            disabled={loading}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input area fields section */}
        <div className="p-6 space-y-5">
          {/* Phone Field */}
          <div>
            <label className={labelClasses}>Phone Number</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className={inputClasses}
                autoComplete="new-phone"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={labelClasses}>New Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to preserve current"
                className={`${inputClasses} pr-10`}
                autoComplete="new-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Action buttons */}
        <div className="flex justify-end gap-3 border-t border-gray-100 p-4.5 bg-gray-50/30">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow transition-colors disabled:opacity-50 min-w-[120px]"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-1.5">
                <svg
                  className="animate-spin h-3.5 w-3.5 text-white"
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
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
