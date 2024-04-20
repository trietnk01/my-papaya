import { gql } from "@apollo/client";
const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      status
      message
      item {
        _id
        username
        displayName
        email
        token
      }
    }
  }
`;
const logoutMutation = gql`
  mutation Logout($id: String) {
    logout(id: $id) {
      status
      message
    }
  }
`;
const checkValidTokenMutation = gql`
  mutation CheckValidToken($token: String) {
    checkValidToken(token: $token) {
      status
      message
      item {
        _id
        username
        email
        displayName
        token
      }
    }
  }
`;
export { loginMutation, logoutMutation, checkValidTokenMutation };
