import { lazy } from "react";

// project imports

import Loadable from "@/components/Loadable";
import GuestGuard from "@/guards/GuestGuard";
import LoginLayout from "@/layout/LoginLayout";
const AuthLogin = Loadable(lazy(() => import("@/pages/admin/Login")));
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: (
    <GuestGuard>
      <LoginLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: "/admin/login",
      element: <AuthLogin />
    }
  ]
};
export default LoginRoutes;
