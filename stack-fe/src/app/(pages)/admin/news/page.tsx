"use client";
import { DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import type { SelectProps } from "antd";
import { Button, GetProp, Input, Select, Space, Table, TableProps } from "antd";
import { FIND_NEWS_AUTHENTICATED } from "app/graphql-client/gql-news";
import { FIND_ALL_CATEGORY_NEWS_AUTHENTICATED } from "app/graphql-client/gql-category-news";
import { produce } from "immer";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "scss/admin-layout.module.scss";
type TablePaginationConfig = Exclude<GetProp<TableProps, "pagination">, boolean>;
interface INews {
  key: string;
  _id: string;
  newsTitle: string;
}
const columns: TableProps<INews>["columns"] = [
  {
    title: "Title",
    dataIndex: "newsTitle",
    key: "newsTitle",
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
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
const options: SelectProps["options"] = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i
  });
}
const NewsPage = () => {
  const { refetch } = useQuery(FIND_NEWS_AUTHENTICATED);
  /* const { refetch } = useQuery(FIND_ALL_CATEGORY_NEWS_AUTHENTICATED); */
  const [newsData, setNewsData] = React.useState<INews[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [keyword, setKeyword] = React.useState<string>("");
  const [categoryNewsId, setCategoryNewsId] = React.useState<string>();
  const [tableParams, setTableParams] = React.useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });
  const router = useRouter();
  const handleAddItem = () => {
    router.push("/admin/news/add");
  };
  const loadNewsTable = async (
    keyword: string,
    categoryNewsId: string,
    current: string | undefined,
    pageSize: string | undefined
  ) => {
    const res = await refetch({
      keyword,
      categoryNewsId,
      current: current ? current.toString() : "",
      pageSize: pageSize ? pageSize.toString() : ""
    });
    if (res && res.data && res.data.findNewsAuthenticated) {
      const { status, list, total } = res.data.findNewsAuthenticated;
      setLoading(false);
      if (status) {
        const newsItems: INews[] = list;
        const nextState: INews[] = produce(newsItems, (drafState) => {
          drafState.forEach((item) => {
            item.key = item._id;
          });
        });
        setNewsData(nextState);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total
          }
        });
      }
    }
  };
  const handleSearch = () => {
    setLoading(true);
    loadNewsTable(
      keyword,
      "",
      tableParams.pagination?.current?.toString(),
      tableParams.pagination?.pageSize?.toString()
    );
  };
  React.useEffect(() => {
    setLoading(true);
    loadNewsTable(
      "",
      "",
      tableParams.pagination?.current?.toString(),
      tableParams.pagination?.pageSize?.toString()
    );
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  React.useEffect(() => {
    const loadSelectedCategoryNews = async () => {
      const res = await refetch({});
    };
    loadSelectedCategoryNews();
  }, []);
  const handleTableChange: TableProps["onChange"] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setNewsData([]);
    }
  };
  const handleKeywordChange = (val: any) => {
    setKeyword(val.target.value);
  };

  return (
    <React.Fragment>
      <h2 className={styles.titleHeading}>News</h2>
      <div className={styles.controlBox}>
        <div className={styles.filterBox}>
          <Input
            placeholder="Keyword..."
            size="large"
            className={styles.searchText}
            onChange={handleKeywordChange}
            value={keyword}
          />
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
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={handleSearch}
          />
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
      <Table
        columns={columns}
        dataSource={newsData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </React.Fragment>
  );
};

export default NewsPage;
