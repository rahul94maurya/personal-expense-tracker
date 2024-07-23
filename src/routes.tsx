import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import AnalysisPage from "./pages/Analysis";

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
    ],
  },
]);
