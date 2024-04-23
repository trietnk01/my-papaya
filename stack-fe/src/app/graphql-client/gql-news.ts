import { gql } from "@apollo/client";
const FIND_NEWS_AUTHENTICATED = gql`
  query FindNewsAuthenticated(
    $keyword: String!
    $categoryNewsId: String!
    $page: String!
  ) {
    findNewsAuthenticated(
      keyword: $keyword
      categoryNewsId: $categoryNewsId
      page: $page
    ) {
      status
      message
      list {
        _id
        newsTitle
        categoryNews {
          _id
          categoryName
        }
        user {
          _id
          username
          email
          displayName
        }
      }
    }
  }
`;
export { FIND_NEWS_AUTHENTICATED };
