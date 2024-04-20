import { gql } from "@apollo/client";
const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      username
      email
      displayName
      token
    }
  }
`;
const logoutMutation = gql`
  mutation Logout($id: String) {
    logout(id: $id) {
      _id
      username
      email
      displayName
    }
  }
`;
const checkValidTokenMutation = gql`
  mutation CheckValidToken($token: String) {
    checkValidToken(token: $token) {
      _id
      username
      email
      displayName
      token
    }
  }
`;
export { loginMutation, logoutMutation, checkValidTokenMutation };
