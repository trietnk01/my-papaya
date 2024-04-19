import { redirect } from "next/navigation";

// project imports
import useAuth from "app/hooks/useAuth";
import { useEffect } from "react";

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      redirect("/dashboard");
    }
  }, [isLoggedIn]);

  return children;
};

export default GuestGuard;
