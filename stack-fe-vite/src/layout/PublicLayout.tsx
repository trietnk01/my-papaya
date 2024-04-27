import { Outlet } from "react-router-dom";

import React from "react";

const PublicLayout = () => {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default PublicLayout;
