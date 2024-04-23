"use client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import useAuth from "app/hooks/useAuth";
import styles from "scss/login.module.scss";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const LoginPage = () => {
  const { login } = useAuth();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { username, password } = values;
    if (username && password) {
      login(username, password);
    }
  };
  return (
    <Form
      className={styles.sectionLogin}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <div className={styles.container}>
        <h1 className={styles.title}>LOGIN</h1>
        <div className={styles.inputBox}>
          <Form.Item<FieldType>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className={styles.inputTxt} placeholder="Username" />
          </Form.Item>
          <div className={styles.iconBox}>
            <FontAwesomeIcon icon={faUser} className={styles.faBarsIcon} />
          </div>
        </div>
        <div className={styles.inputBox}>
          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password className={styles.inputTxt} placeholder="Password" />
          </Form.Item>
        </div>
        {/* <div className={styles.rembemberForgot}>
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>
              <span className={styles.rememberTxt}>Remember me</span>
            </Checkbox>
          </Form.Item>
          <a href="#" className={styles.forgotPasswordLink}>
            Forgot password?
          </a>
        </div> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.btnLogin}>
            Submit
          </Button>
        </Form.Item>
        <div className={styles.donHaveAccountRegisterLink}>
          <span className={styles.dontHaveAccount}>Don't have account?</span>&nbsp;
          <a href="#" className={styles.registerLink}>
            Register
          </a>
        </div>
      </div>
    </Form>
  );
};

export default LoginPage;
