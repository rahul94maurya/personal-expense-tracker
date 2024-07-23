import { Navigate } from "react-router-dom";
import { getAuthStatus } from "../utilities/utility";

import MainLayout from "./MainLayout";

const RootLayout = () => {
  const authStatus = getAuthStatus();

  return authStatus ? <MainLayout /> : <Navigate to="login" />;
};

export default RootLayout;
