"use client";
import React from "react";
import { redirect } from "next/navigation";
import useAuth from "app/hooks/useAuth";

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  React.useEffect(() => {
    if (isLoggedIn) {
      redirect("/admin/news");
    }
  }, [isLoggedIn]);

  return children;
};

export default GuestGuard;
