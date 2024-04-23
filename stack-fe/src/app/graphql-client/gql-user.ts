import { gql } from "@apollo/client";
const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
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
const LOGOUT = gql`
  mutation Logout($_id: String!) {
    logout(_id: $_id) {
      status
      message
    }
  }
`;
const CHECK_VALID_TOKEN = gql`
  mutation CheckValidToken($token: String!) {
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
export { LOGIN, LOGOUT, CHECK_VALID_TOKEN };
