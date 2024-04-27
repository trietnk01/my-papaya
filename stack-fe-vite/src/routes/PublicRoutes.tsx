import { lazy } from "react";

// project imports

import Loadable from "@/components/Loadable";
const HomePage = Loadable(lazy(() => import("@/pages/public/HomePage")));
import PublicLayout from "@/layout/PublicLayout";
// ==============================|| AUTH ROUTING ||============================== //

const PublicRoutes = {
  path: "/",
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />
    }
  ]
};
export default PublicRoutes;
