export interface DepartmentStat {
  department: string;
  count: number;
}

export interface DashboardData {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  departmentCount: number;
  departmentStats: DepartmentStat[];
}

export interface DashboardResponse {
  success: boolean;
  dashboard: DashboardData;
}
