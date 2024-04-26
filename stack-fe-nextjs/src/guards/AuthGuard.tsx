"use client";
import React from "react";
import { redirect } from "next/navigation";
import useAuth from "hooks/useAuth";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  React.useEffect(() => {
    if (!isLoggedIn) {
      redirect("/login");
    }
  }, [isLoggedIn, user]);

  return children;
};

export default AuthGuard;
