import { gql } from "@apollo/client";
const FIND_NEWS_AUTHENTICATED = gql`
  query FindNewsAuthenticated(
    $keyword: String!
    $categoryNewsId: String!
    $current: String!
    $pageSize: String!
  ) {
    findNewsAuthenticated(
      keyword: $keyword
      categoryNewsId: $categoryNewsId
      current: $current
      pageSize: $pageSize
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
      total
    }
  }
`;
export { FIND_NEWS_AUTHENTICATED };
