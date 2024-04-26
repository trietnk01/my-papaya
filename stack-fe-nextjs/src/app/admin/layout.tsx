"use client";
import { MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Menu } from "antd";
import AuthGuard from "guards/AuthGuard";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "scss/admin-layout.module.scss";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Menu", "sub1", <MailOutlined />, [
    getItem(
      "News section",
      "g1",
      null,
      [getItem("News", "1"), getItem("Logout", "2")],
      "group"
    )
  ])
];
const AdminLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const { logout, user } = useAuth();
  const onClick: MenuProps["onClick"] = (e) => {
    const key: number = e.key ? parseInt(e.key) : 1;
    switch (key) {
      case 1:
        router.push("/admin/news");
        break;
      case 2:
        if (user) {
          logout(user._id);
        }
        break;
    }
  };

  return (
    <AuthGuard>
      <Flex justify="flex-start" align="flex-start" gap={20}>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
        <div className={styles.colMain}>
          <div className={styles.container}>{children}</div>
        </div>
      </Flex>
    </AuthGuard>
  );
};

export default AdminLayout;