export interface Manager {
  _id: string;
  employeeId: string;
  name: string;
}

export interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
  profileImage?: string;
  role: string;
  status: string;

  manager?: Manager | null;
}

export interface EmployeeResponse {
  employees: Employee[];
  totalEmployees: number;
  currentPage: number;
  totalPages: number;
}
