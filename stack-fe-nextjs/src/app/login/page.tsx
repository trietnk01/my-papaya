"use client";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "scss/login.module.scss";
import * as yup from "yup";
interface IFormInput {
  username: string;
  password: string;
  remember_me: boolean;
}
const LoginPage = () => {
  const { login } = useAuth();
  const schema = yup
    .object({
      username: yup.string().required("Username required".toString()),
      password: yup.string().required("Password required".toString())
    })
    .required();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const onSubmit: SubmitHandler<IFormInput> = async (dataForm) => {
    login(dataForm.username.toString().trim(), dataForm.password.toString());
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.sectionLogin}
      name="loginFrm"
    >
      <div className={styles.container}>
        <h1 className={styles.title}>LOGIN</h1>
        <div className={styles.inputBox}>
          <Controller
            name="username"
            defaultValue=""
            control={control}
            render={({ field }) => {
              return (
                <React.Fragment>
                  <input
                    {...field}
                    type="text"
                    placeholder="Email"
                    className={styles.inputTxt}
                  />
                  {errors.username && (
                    <div className={styles.inputError}>{errors.username.message}</div>
                  )}
                  <div className={styles.iconBox}>
                    <UserOutlined className={styles.faBarsIcon} />
                  </div>
                </React.Fragment>
              );
            }}
          />
        </div>
        <div className={styles.inputBox}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => {
              return (
                <React.Fragment>
                  <input
                    {...field}
                    type="text"
                    placeholder="Password"
                    className={styles.inputTxt}
                  />
                  {errors.password && (
                    <div className={styles.inputError}>{errors.password.message}</div>
                  )}
                  <div className={styles.iconBox}>
                    <KeyOutlined className={styles.faBarsIcon} />
                  </div>
                </React.Fragment>
              );
            }}
          />
        </div>
        <div className={styles.rembemberForgot}>
          <div className={styles.checkRememberMe}>
            <input type="checkbox" name="remember_me" />
            <span className={styles.rememberTxt}>Remember me</span>
          </div>
          <Link href="/login" className={styles.forgotPasswordLink}>
            Forgot password?
          </Link>
        </div>
        <button type="submit" className={styles.btnLogin}>
          Login
        </button>
        <div className={styles.donHaveAccountRegisterLink}>
          <span className={styles.dontHaveAccount}>Don't have account?</span>&nbsp;
          <Link href="/login" className={styles.registerLink}>
            Register
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
