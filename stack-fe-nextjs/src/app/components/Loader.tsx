import { Skeleton } from "antd";
import React from "react";
import styles from "scss/admin-layout.module.scss";
const Loader = () => {
  return (
    <div className={styles.loaderBox}>
      <Skeleton active />
    </div>
  );
};

export default Loader;
