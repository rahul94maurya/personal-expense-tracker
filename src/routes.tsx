import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import AnalysisPage from "./pages/Analysis";
import CategoriesPage from "./pages/Categories";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/analysis",
        element: <AnalysisPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
    ],
  },
]);
