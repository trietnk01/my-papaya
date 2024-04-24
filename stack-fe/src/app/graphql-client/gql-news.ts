import { gql } from "@apollo/client";
const FIND_NEWS_AUTHENTICATED = gql`
  query (
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
const ADD_NEWS = gql`
  mutation ($newsTitle: String!, $categoryNewsId: String!) {
    createNews(
      createNewsInput: { newsTitle: $newsTitle, categoryNewsId: $categoryNewsId }
    ) {
      status
      message
      item {
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
const UPDATE_NEWS = gql`
  mutation ($id: String!, $newsTitle: String!, $categoryNewsId: String!) {
    updateNews(
      updateNewsInput: { id: $id, newsTitle: $newsTitle, categoryNewsId: $categoryNewsId }
    ) {
      status
      message
      item {
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
const DELETE_NEWS = gql`
  mutation ($id: String!) {
    deleteNews(id: $id) {
      status
      message
      item {
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
export { FIND_NEWS_AUTHENTICATED, ADD_NEWS, UPDATE_NEWS, DELETE_NEWS };
