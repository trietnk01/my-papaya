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
        publisher {
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
const GET_NEWS_DETAIL = gql`
  query FindNewsDetailAuthenticated($id: String!) {
    findNewsDetailAuthenticated(id: $id) {
      status
      message
      item {
        _id
        newsTitle
        categoryNewsId
        publisherId
        categoryNews {
          _id
          categoryName
        }
        publisher {
          _id
          username
          email
          displayName
        }
      }
    }
  }
`;
const ADD_NEWS = gql`
  mutation CreateNews($newsTitle: String!, $categoryNewsId: String!) {
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
        publisher {
          _id
          username
          email
          displayName
        }
      }
    }
  }
`;
const DELETE_NEWS_MULTI = gql`
  mutation DeleteNewsMulti($selectedIds: String!) {
    deleteNewsMulti(selectedIds: $selectedIds) {
      status
      message
    }
  }
`;
const UPDATE_NEWS = gql`
  mutation UpdateNews($id: String!, $newsTitle: String!, $categoryNewsId: String!) {
    updateNews(
      updateNewsInput: {
        _id: $id
        newsTitle: $newsTitle
        categoryNewsId: $categoryNewsId
      }
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
        publisher {
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
  mutation DeleteNews($id: String!) {
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
        publisher {
          _id
          username
          email
          displayName
        }
      }
    }
  }
`;
export {
  ADD_NEWS,
  DELETE_NEWS,
  FIND_NEWS_AUTHENTICATED,
  GET_NEWS_DETAIL,
  UPDATE_NEWS,
  DELETE_NEWS_MULTI
};
