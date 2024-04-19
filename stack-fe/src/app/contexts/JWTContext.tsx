import { useMutation } from "@apollo/client";
import { loginMutation } from "app/graphql-client/mutations";
import { dispatch, useSelector } from "app/store";
import auth_service from "app/utils/authService";
import React from "react";
import { loginAction } from "app/store/slices/accountSlice";
import IUser from "app/types/user-profile";
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
  const [loginUser] = useMutation(loginMutation);
  const login = async (username: string, password: string) => {
    const res: any = await loginUser({
      variables: {
        username,
        password
      }
    });
    const { login } = res.data;
    if (login) {
      const { _id, email, displayName, token } = login;
      const user: IUser = { _id, username, email, displayName };
      auth_service.setAccessToken(token);
      dispatch(loginAction(user));
    }
  };
  const logout = async (id: string) => {};
  return (
    <JWTContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};
export { JWTProvider };
export default JWTContext;
