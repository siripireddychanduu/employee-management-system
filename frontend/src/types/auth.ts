export interface User {
  _id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "HR_MANAGER" | "EMPLOYEE";
}

export interface LoginResponse {
  success: boolean;
  token: string;
  employee: User;
}
