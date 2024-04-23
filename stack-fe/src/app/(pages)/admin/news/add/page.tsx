"use client";
import { BackwardFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import styles from "scss/admin-layout.module.scss";

type LayoutType = Parameters<typeof Form>[0]["layout"];
type FieldType = {
  newsTitle?: string;
};
const AddNewsPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleBack = () => {
    router.push("/admin/news");
  };
  return (
    <Form layout="vertical" wrapperCol={{ span: 8 }}>
      <h2 className={styles.titleHeading}>Create news</h2>
      <Flex justify="flex-end" gap={10}>
        <Button type="primary" icon={<SaveOutlined />} size="large" />
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
      </div>
    </Form>
  );
};

export default AddNewsPage;
