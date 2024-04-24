"use client";
import { BackwardFilled, SaveOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Flex, Form, FormProps, Input, Select } from "antd";
import { FIND_ALL_CATEGORY_NEWS_AUTHENTICATED } from "app/graphql-client/gql-category-news";
import { ADD_NEWS, UPDATE_NEWS } from "app/graphql-client/gql-news";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from "scss/admin-layout.module.scss";
type FieldType = {
  newsTitle?: string;
  categoryNewsId?: string;
};
interface ICategoryNews {
  value: string;
  label: string;
}
const NewsForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [addNews] = useMutation(ADD_NEWS);
  const [updateNews] = useMutation(UPDATE_NEWS);
  let [getCategoryNews] = useLazyQuery(FIND_ALL_CATEGORY_NEWS_AUTHENTICATED);
  const [categoryNewsData, setCategoryNewsData] = React.useState<ICategoryNews[]>([]);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { newsTitle, categoryNewsId } = values;
    if (searchParams.get("action")) {
      switch (searchParams.get("action")) {
        case "add":
          addNews({ variables: { newsTitle, categoryNewsId } }).then((res) => {
            if (res && res.data && res.data.createNews) {
              const { status, item } = res.data.createNews;
              if (status) {
                const { _id } = item;
                router.push(`/admin/news/form?action=edit&id=${_id}`);
              }
            }
          });
          break;
        case "edit":
          const id = searchParams.get("id");
          if (id) {
            updateNews({ variables: { id, newsTitle, categoryNewsId } });
          }
          break;
      }
    }
  };
  const handleBack = () => {
    router.push("/admin/news");
  };
  React.useEffect(() => {
    const loadSelectedCategoryNews = async () => {
      const res = await getCategoryNews();
      if (res && res.data && res.data.findAllCategoryNewsUnauthenticated) {
        const { status, list } = res.data.findAllCategoryNewsUnauthenticated;
        if (status) {
          let categoryNewsList: ICategoryNews[] = list.map((item: any) => {
            return { value: item._id, label: item.categoryName };
          });
          categoryNewsList.unshift({
            value: "",
            label: "-- Please choose on category --"
          });
          setCategoryNewsData(categoryNewsList);
        }
      }
    };
    loadSelectedCategoryNews();
  }, []);
  return (
    <Form layout="vertical" wrapperCol={{ span: 8 }} onFinish={onFinish} name="newsFrm">
      <h2 className={styles.titleHeading}>Create news</h2>
      <Flex justify="flex-end" gap={10}>
        <Button htmlType="submit" type="primary" icon={<SaveOutlined />} size="large" />
        <Button
          type="primary"
          icon={<BackwardFilled />}
          size="large"
          danger
          onClick={handleBack}
        />
      </Flex>
      <Form.Item<FieldType>
        label="Title"
        name="newsTitle"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="categoryNewsId"
        label="Category"
        rules={[{ required: true, message: "Please select category!" }]}
        initialValue=""
      >
        <Select
          size="large"
          placeholder="Select a option and change input text above"
          options={categoryNewsData}
        />
      </Form.Item>
    </Form>
  );
};

export default NewsForm;
