import AdminDashboardPage from "@/shared/pages/AdminDashboardPage";
import AdminLayout from "@/shared/layouts/AdminLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import EmployeesPage from "@/features/users/pages/EmployeesPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "employees",
        element: <EmployeesPage />,
      },
    ],
  },
]);
