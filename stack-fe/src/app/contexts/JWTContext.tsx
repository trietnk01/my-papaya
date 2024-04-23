"use client";
import { useMutation } from "@apollo/client";
import { LOGIN, LOGOUT, CHECK_VALID_TOKEN } from "app/graphql-client/gql-user";
import { dispatch, useSelector } from "app/store";
import { loginAction, logoutAction } from "app/store/slices/accountSlice";
import IUser from "app/types/user-profile";
import auth_service from "app/utils/authService";
import React from "react";
interface JWTContextType {
  isLoggedIn: boolean;
  user: IUser | null;
  login: (username: string, password: string) => void;
  logout: (id: string) => void;
}
const JWTContext = React.createContext<JWTContextType | null>(null);
interface JWTProviderProps {}
const JWTProvider: React.FC<React.PropsWithChildren<JWTProviderProps>> = ({
  children
}) => {
  const { isLoggedIn, user } = useSelector((state) => state.account);
  const [loginUser] = useMutation(LOGIN);
  const [logoutUser] = useMutation(LOGOUT);
  const [checkValidTokenUser] = useMutation(CHECK_VALID_TOKEN);
  React.useEffect(() => {
    const init = async () => {
      let isValid: boolean = true;
      const accessToken: string = auth_service.getAccessToken();
      if (!accessToken) {
        isValid = false;
      } else {
        const res: any = await checkValidTokenUser({ variables: { token: accessToken } });
        if (res && res.data && res.data.checkValidToken) {
          const { status, item } = res.data.checkValidToken;
          if (!status) {
            isValid = false;
          } else {
            const user: IUser = item;
            auth_service.setAccessToken(accessToken);
            dispatch(loginAction(user));
          }
        }
      }
      if (!isValid) {
        auth_service.clearAccessToken();
        dispatch(logoutAction());
      }
    };
    init();
  }, []);
  const login = async (username: string, password: string) => {
    let isValid: boolean = true;
    const res = await loginUser({
      variables: {
        username,
        password
      }
    });
    if (res && res.data && res.data.login) {
      const { status, item } = res.data.login;
      if (!status) {
        isValid = false;
      } else {
        const { _id, email, displayName, token } = item;
        const user: IUser = { _id, username, email, displayName };
        auth_service.setAccessToken(token);
        dispatch(loginAction(user));
      }
    }
    if (!isValid) {
      auth_service.clearAccessToken();
      dispatch(logoutAction());
    }
  };
  const logout = async (id: string) => {
    const res = await logoutUser({
      variables: {
        id
      }
    });
    if (res && res.data && res.data.logout) {
      const { status } = res.data.logout;
      if (status) {
        auth_service.clearAccessToken();
        dispatch(logoutAction());
      }
    }
  };
  return (
    <JWTContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};
export { JWTProvider };
export default JWTContext;
