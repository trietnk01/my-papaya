import GuestGuard from "guards/GuestGuard";
import React from "react";

const PublicLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default PublicLayout;
