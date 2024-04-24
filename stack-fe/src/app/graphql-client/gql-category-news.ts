import { gql } from "@apollo/client";
const FIND_ALL_CATEGORY_NEWS_AUTHENTICATED = gql`
  query {
    findAllCategoryNewsUnauthenticated {
      status
      message
      list {
        _id
        categoryName
      }
    }
  }
`;
export { FIND_ALL_CATEGORY_NEWS_AUTHENTICATED };
