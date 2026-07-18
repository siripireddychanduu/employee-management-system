import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../api/axios";
import type { Employee, EmployeeResponse } from "../types/employee";
import OrganizationTree from "../components/employees/OrganizationTree";

export default function Organization() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await api.get<EmployeeResponse>("/employees", {
        params: {
          limit: 1000,
        },
      });

      setEmployees(response.data.employees);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Organization Hierarchy</h1>

      <OrganizationTree employees={employees} />
    </DashboardLayout>
  );
}
