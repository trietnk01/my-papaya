"use client";
import { BackwardFilled, SaveOutlined, PlusOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Flex, Form, FormProps, Input, Select, Upload } from "antd";
import { FIND_ALL_CATEGORY_NEWS_AUTHENTICATED } from "app/graphql-client/gql-category-news";
import { ADD_NEWS, UPDATE_NEWS, GET_NEWS_DETAIL } from "app/graphql-client/gql-news";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import styles from "scss/admin-layout.module.scss";
import Swal from "sweetalert2";
type FieldType = {
  newsTitle?: string;
  categoryNewsId?: string;
};
interface ICategoryNews {
  value: string;
  label: string;
}
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 8000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const NewsForm = () => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [addNews] = useMutation(ADD_NEWS);
  const [updateNews] = useMutation(UPDATE_NEWS);
  const [getCategoryNews] = useLazyQuery(FIND_ALL_CATEGORY_NEWS_AUTHENTICATED, {
    fetchPolicy: "network-only"
  });
  const [getNewsDetail] = useLazyQuery(GET_NEWS_DETAIL, { fetchPolicy: "network-only" });
  const [categoryNewsData, setCategoryNewsData] = React.useState<ICategoryNews[]>([]);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { newsTitle, categoryNewsId } = values;
    if (searchParams.get("action")) {
      switch (searchParams.get("action")) {
        case "add":
          addNews({ variables: { newsTitle: newsTitle?.trim(), categoryNewsId } }).then(
            (res) => {
              if (res && res.data && res.data.createNews) {
                const { status, item } = res.data.createNews;
                if (status) {
                  const { _id } = item;
                  Toast.fire({
                    icon: "success",
                    title: "Create news successfully"
                  });
                  router.push(`/admin/news/form?action=edit&id=${_id}`);
                }
              }
            }
          );
          break;
        case "edit":
          const id = searchParams.get("id");
          if (id) {
            updateNews({
              variables: { id, newsTitle: newsTitle?.trim(), categoryNewsId }
            }).then((res) => {
              if (res && res.data && res.data.updateNews) {
                const { status, item } = res.data.updateNews;
                if (status) {
                  const { _id } = item;
                  Toast.fire({
                    icon: "success",
                    title: "Update news successfully"
                  });
                }
              }
            });
          }
          break;
      }
    }
  };
  const handleBack = () => {
    router.push("/admin/news");
  };
  React.useEffect(() => {
    const loadSelectedCategoryNews = () => {
      getCategoryNews().then((res) => {
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
      });
    };
    loadSelectedCategoryNews();
  }, []);
  React.useEffect(() => {
    const loadNewsDetail = () => {
      getNewsDetail({ variables: { id: searchParams.get("id")?.toString() } }).then(
        (res) => {
          if (res && res.data && res.data.findNewsDetailAuthenticated) {
            const { status, item } = res.data.findNewsDetailAuthenticated;
            if (status) {
              const { newsTitle, categoryNewsId } = item;
              form.setFieldValue("newsTitle", newsTitle);
              form.setFieldValue("categoryNewsId", categoryNewsId);
            }
          }
        }
      );
    };
    loadNewsDetail();
  }, [searchParams.get("id")]);
  return (
    <Form
      form={form}
      layout="vertical"
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      name="newsFrm"
    >
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
      <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload action="/upload.do" listType="picture-card">
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
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
