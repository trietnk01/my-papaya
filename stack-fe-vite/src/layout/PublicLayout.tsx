import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Outlet } from "react-router-dom";
import styles from "@/assets/scss/public-layout.module.scss";
const PublicLayout = () => {
  const handleCategoryNewsChange = () => {};
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Papaya News</h1>
        <div className={styles.searchArea}>
          <div className={styles.searchBox}>
            <SearchOutlined className={styles.seachIcon} />
            <input
              type="text"
              name="keyword"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
          <Select
            size="large"
            defaultValue=""
            className={styles.categoryNewsId}
            options={[]}
            onChange={handleCategoryNewsChange}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
