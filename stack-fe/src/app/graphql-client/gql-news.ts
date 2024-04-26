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
        newsIntro
        newsContent
        newsImg
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
  mutation CreateNews(
    $newsTitle: String!
    $newsIntro: String!
    $newsContent: String
    $newsImg: Upload
    $categoryNewsId: String!
    $publisherId: String!
  ) {
    createNews(
      createNewsInput: {
        newsTitle: $newsTitle
        newsIntro: $newsIntro
        newsContent: $newsContent
        newsImg: $newsImg
        categoryNewsId: $categoryNewsId
        publisherId: $publisherId
      }
    ) {
      status
      message
      item {
        _id
        newsTitle
        newsIntro
        newsContent
        newsImg
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
const UPDATE_NEWS = gql`
  mutation UpdateNews(
    $id: String!
    $newsTitle: String!
    $newsIntro: String!
    $newsContent: String!
    $newsImg: Upload
    $categoryNewsId: String!
    $removedNewsImg: Boolean!
  ) {
    updateNews(
      updateNewsInput: {
        _id: $id
        newsTitle: $newsTitle
        newsIntro: $newsIntro
        newsContent: $newsContent
        newsImg: $newsImg
        categoryNewsId: $categoryNewsId
        removedNewsImg: $removedNewsImg
      }
    ) {
      status
      message
      item {
        _id
        newsTitle
        newsIntro
        newsContent
        newsImg
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
