import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import type { Employee, EmployeeResponse } from "../../types/employee";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

interface EmployeeFormProps {
  mode: "add" | "edit";
  employee?: Employee | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface EmployeeFormData {
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: string;
  joiningDate: string;
  role: string;
  status: string;
  manager: string;
  password: string;
}

export default function EmployeeForm({
  mode,
  employee,
  onSuccess,
  onCancel,
}: EmployeeFormProps) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState<EmployeeFormData>({
    employeeId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    role: "EMPLOYEE",
    status: "Active",
    manager: "",
    password: "",
  });
  const [managerList, setManagerList] = useState<Employee[]>([]);

  useEffect(() => {
    if (mode === "edit" && employee) {
      setFormData({
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        salary: String(employee.salary),
        joiningDate: employee.joiningDate
          ? employee.joiningDate.substring(0, 10)
          : "",
        role: employee.role,
        status: employee.status,
        manager: employee.manager?._id ?? "",
        password: "",
      });
    } else {
      setFormData({
        employeeId: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
        role: "EMPLOYEE",
        status: "Active",
        manager: "",
        password: "",
      });
    }

    const loadManagers = async () => {
      try {
        const response = await api.get<EmployeeResponse>("/employees", {
          params: { limit: 1000 },
        });
        setManagerList(response.data.employees);
      } catch (error) {
        console.error(error);
      }
    };

    loadManagers();
  }, [mode, employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (mode === "add") {
        await api.post("/employees", formData);
      } else if (employee?._id) {
        const payload = { ...formData };
        if (!payload.password) {
          delete (payload as Partial<EmployeeFormData>).password;
        }
        await api.put(`/employees/${employee._id}`, payload);
      }

      toast.success(
        mode === "add"
          ? "Employee added successfully"
          : "Employee updated successfully",
      );
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Operation failed");
      console.error(error);
    }
  };

  const inputClasses =
    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400 text-gray-800";
  const labelClasses =
    "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Identity & Personal Info Section */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Employee ID</label>
            <input
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="e.g., EMP-0042"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane.doe@company.com"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className={inputClasses}
              required
            />
          </div>
        </div>
      </div>

      {/* Corporate Placement Section */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">
          Employment & Role Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Department</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Engineering"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Designation</label>
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Senior Software Engineer"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Annual Salary</label>
            <input
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Base Salary"
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Joining Date</label>
            <input
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div>
            <label className={labelClasses}>Direct Manager</label>
            <select
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">No Manager Assigned</option>
              {managerList
                .filter((emp) => emp._id !== employee?._id)
                .map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} ({emp.employeeId})
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>System Access Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputClasses}
            >
              {user?.role === "SUPER_ADMIN" && (
                <option value="SUPER_ADMIN">Super Admin</option>
              )}
              <option value="HR_MANAGER">HR Manager</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Security Section */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">
          Security
        </h3>
        <div className="w-full">
          <label className={labelClasses}>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={
              mode === "edit" ? "••••••••" : "Assign temporary system password"
            }
            className={inputClasses}
            required={mode === "add"}
          />
          {mode === "edit" && (
            <p className="text-xs text-gray-400 mt-1.5">
              Leave this input empty if you don't intend to alter the employee's
              current password credential.
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
        >
          {mode === "add" ? "Save Employee" : "Update Profile"}
        </button>
      </div>
    </form>
  );
}
