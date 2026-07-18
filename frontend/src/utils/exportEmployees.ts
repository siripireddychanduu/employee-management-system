import Papa from "papaparse";
import { saveAs } from "file-saver";
import type { Employee } from "../types/employee";

export const exportEmployees = (employees: Employee[]) => {
  const data = employees.map((emp) => ({
    "Employee ID": emp.employeeId,
    Name: emp.name,
    Email: emp.email,
    Phone: emp.phone,
    Department: emp.department,
    Designation: emp.designation,
    Salary: emp.salary,
    "Joining Date": emp.joiningDate?.substring(0, 10),
    Role: emp.role,
    Status: emp.status,
    Manager: emp.manager?.name ?? "-",
  }));

  const csv = Papa.unparse(data);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "employees.csv");
};