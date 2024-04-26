import GuestGuard from "guards/GuestGuard";
import React from "react";

const LoginLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default LoginLayout;
