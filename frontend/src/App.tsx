import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeList from "./pages/EmployeeList";
import Organization from "./pages/Organization";
import EmployeeDetails from "./pages/EmployeeDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "HR_MANAGER"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "HR_MANAGER"]}>
              <EmployeeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "HR_MANAGER"]}>
              <Organization />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "HR_MANAGER"]}>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
              <MyProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
