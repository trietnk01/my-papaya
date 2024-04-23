"use client";
import { Button, Flex, Input, Space, Table, TableProps, Tag } from "antd";
import { FIND_NEWS_AUTHENTICATED } from "app/graphql-client/gql-news";
import { PlusOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import React from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import styles from "scss/admin-layout.module.scss";
import { useRouter } from "next/navigation";
import { useLazyQuery, useQuery } from "@apollo/client";
interface DataType {
  key: string;
  newTitle: string;
}

const NewsPage = () => {
  const options: SelectProps["options"] = [];
  const { refetch } = useQuery(FIND_NEWS_AUTHENTICATED);
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i
    });
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const router = useRouter();
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "newTitle",
      key: "newTitle",
      render: (text) => <a>{text}</a>
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      )
    }
  ];
  const newsData: DataType[] = [
    {
      key: "1",
      newTitle: "John Brown"
    },
    {
      key: "2",
      newTitle: "Jim Green"
    },
    {
      key: "3",
      newTitle: "Joe Black"
    }
  ];
  const handleAddItem = () => {
    router.push("/admin/news/add");
  };

  React.useEffect(() => {
    const init = async () => {
      const res = await refetch({
        keyword: "",
        categoryNewsId: "",
        page: "1"
      });
      console.log("res = ", res);
    };
    init();
  }, []);
  return (
    <React.Fragment>
      <h2 className={styles.titleHeading}>News</h2>
      <div className={styles.controlBox}>
        <div className={styles.filterBox}>
          <Input placeholder="Basic usage" size="large" className={styles.searchText} />
          <Select
            size="large"
            defaultValue="lucy"
            className={styles.selectedText}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true }
            ]}
          />
          <Button type="primary" icon={<SearchOutlined />} size="large" />
        </div>
        <div className={styles.actionBox}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddItem}
          />
          <Button type="primary" icon={<DeleteOutlined />} size="large" danger />
        </div>
      </div>
      <Table columns={columns} dataSource={newsData} />
    </React.Fragment>
  );
};

export default NewsPage;
