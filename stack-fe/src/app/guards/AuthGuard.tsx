import { redirect } from "next/navigation";

// project imports
import useAuth from "app/hooks/useAuth";
import React, { useEffect } from "react";

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      redirect("/");
    }
  }, [isLoggedIn, user]);

  return children;
};

export default AuthGuard;
