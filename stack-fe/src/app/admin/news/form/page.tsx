"use client";
import React from "react";
import ReactQuill from "react-quill";
import { BackwardFilled, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Flex, Form, FormProps, Image, Input, Select } from "antd";
import { FIND_ALL_CATEGORY_NEWS_AUTHENTICATED } from "graphql-client/gql-category-news";
import { ADD_NEWS, GET_NEWS_DETAIL, UPDATE_NEWS } from "graphql-client/gql-news";
import IMediaSource from "types/media-source";
import { useRouter, useSearchParams } from "next/navigation";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import styles from "scss/admin-layout.module.scss";
import useAuth from "hooks/useAuth";
import "react-quill/dist/quill.snow.css";
type FieldType = {
  newsTitle?: string;
  newsIntro?: string;
  newsContent?: string;
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
const NewsFormPage = () => {
  const { user } = useAuth();
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
  const [base64Url, setBase64Url] = React.useState<string>("");
  const [featuredImg, setFeaturedImg] = React.useState<IMediaSource | null>(null);
  const [removedFeaturedImg, setRemovedFeaturedImg] = React.useState<boolean>(false);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { newsTitle, categoryNewsId, newsContent, newsIntro } = values;
    if (searchParams.get("action")) {
      switch (searchParams.get("action")) {
        case "add":
          addNews({
            variables: {
              newsTitle: newsTitle ? newsTitle.toString().trim() : "",
              newsIntro: newsIntro ? newsIntro.toString().trim() : "",
              newsContent: newsContent ? newsContent.toString().trim() : "",
              newsImg: featuredImg,
              categoryNewsId: categoryNewsId ? categoryNewsId.toString().trim() : "",
              publisherId: user && user._id ? user._id : ""
            }
          }).then((res) => {
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
          });

          break;
        case "edit":
          const id = searchParams.get("id");
          if (id) {
            updateNews({
              variables: {
                id,
                newsTitle: newsTitle ? newsTitle.toString().trim() : "",
                newsIntro: newsIntro ? newsIntro.toString().trim() : "",
                newsContent: newsContent ? newsContent.toString().trim() : "",
                newsImg: featuredImg,
                categoryNewsId: categoryNewsId ? categoryNewsId.toString().trim() : "",
                removedNewsImg: removedFeaturedImg
              }
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
              const { newsTitle, newsIntro, newsContent, newsImg, categoryNewsId } = item;
              form.setFieldValue("newsTitle", newsTitle ? newsTitle : "");
              form.setFieldValue("newsIntro", newsIntro ? newsIntro : "");
              form.setFieldValue("newsContent", newsContent ? newsContent : "");
              form.setFieldValue("categoryNewsId", categoryNewsId ? categoryNewsId : "");
              setBase64Url(
                newsImg ? `${process.env.NEXT_PUBLIC_BACKEND_URI}/${newsImg}` : ""
              );
            }
          }
        }
      );
    };
    loadNewsDetail();
  }, [searchParams.get("id")]);
  const handleUpload = (imageFile: any) => {
    setBase64Url(URL.createObjectURL(imageFile));
    setFeaturedImg(imageFile);
  };
  const handleRemovedFeaturedImg = () => {
    setBase64Url("");
    setFeaturedImg(null);
    setRemovedFeaturedImg(true);
  };
  const handleTypeError = (err: any) => {
    Toast.fire({
      icon: "warning",
      title: "File type must be .png | .jpg"
    });
  };
  const handleSizeError = (err: any) => {
    Toast.fire({
      icon: "warning",
      title: "Image file size must be less then 500KB"
    });
  };
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
      <div>
        <Form.Item<FieldType>
          label="Title"
          name="newsTitle"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <div>Featured image</div>
        <div className={styles.boxUploader}>
          {base64Url ? (
            <React.Fragment>
              <div className={styles.boxImage}>
                <img
                  src={base64Url}
                  style={{ width: "100%", height: "100%", borderRadius: 6 }}
                />
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size="large"
                  danger
                  className={styles.removeFeaturedImg}
                  onClick={handleRemovedFeaturedImg}
                >
                  Remove
                </Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FileUploader
                name="avatar_file_upload"
                multiple={false}
                types={["JPG", "PNG", "GIF", "JPEG"]}
                hoverTitle="Drop here"
                handleChange={handleUpload}
                onTypeError={handleTypeError}
                onSizeError={handleSizeError}
                maxSize={0.5}
              >
                <div className={styles.boxDragDropFile}>
                  <Image
                    src="/sprite.png"
                    alt="spriteMultipleUpload"
                    width={300}
                    height={200}
                  />
                  <div>Upload image right here</div>
                  <div>Maxium 5MB</div>
                </div>
              </FileUploader>
            </React.Fragment>
          )}
        </div>
        <Form.Item<FieldType>
          label="Intro"
          name="newsIntro"
          rules={[{ required: true, message: "Please input news intro!" }]}
          className={styles.categoryNewsBox}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Content"
          name="newsContent"
          className={styles.categoryNewsBox}
        >
          <ReactQuill />
        </Form.Item>
        <Form.Item<FieldType>
          name="categoryNewsId"
          label="Category"
          rules={[{ required: true, message: "Please select category!" }]}
          initialValue=""
          className={styles.categoryNewsBox}
        >
          <Select
            size="large"
            placeholder="Select a option and change input text above"
            options={categoryNewsData}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default NewsFormPage;
