import AuthGuard from "app/guards/AuthGuard";
import React from "react";

const LoginLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default LoginLayout;
