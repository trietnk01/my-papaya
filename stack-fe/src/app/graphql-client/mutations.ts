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
export { loginMutation };
