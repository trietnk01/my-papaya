import { gql } from "@apollo/client";
const FIND_NEWS_AUTHENTICATED = gql`
  query FindNewsAuthenticated(
    $keyword: String!
    $category_news_id: String!
    $current: String!
    $page_size: String!
  ) {
    findNewsAuthenticated(
      keyword: $keyword
      category_news_id: $category_news_id
      current: $current
      page_size: $page_size
    ) {
      status
      message
      list {
        _id
        news_title
        news_img
        categoryNews {
          _id
          category_name
        }
        publisher {
          _id
          username
          email
          display_name
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
        news_title
        news_intro
        news_content
        news_img
        category_news_id
        publisher_id
        categoryNews {
          _id
          category_name
        }
        publisher {
          _id
          username
          email
          display_name
        }
      }
    }
  }
`;
const ADD_NEWS = gql`
  mutation CreateNews(
    $news_title: String!
    $news_intro: String!
    $news_content: String!
    $category_news_id: String!
    $publisher_id: String!
  ) {
    createNews(
      createNewsInput: {
        news_title: $news_title
        news_intro: $news_intro
        news_content: $news_content
        category_news_id: $category_news_id
        publisher_id: $publisher_id
      }
    ) {
      status
      message
      item {
        _id
        news_title
        news_intro
        news_content
        categoryNews {
          _id
          category_name
        }
        publisher {
          _id
          username
          email
          display_name
        }
      }
    }
  }
`;
const UPDATE_NEWS = gql`
  mutation UpdateNews(
    $id: String!
    $news_title: String!
    $news_intro: String!
    $news_content: String!
    $category_news_id: String!
  ) {
    updateNews(
      updateNewsInput: {
        _id: $id
        news_title: $news_title
        news_intro: $news_intro
        news_content: $news_content
        category_news_id: $category_news_id
      }
    ) {
      status
      message
      item {
        _id
        news_title
        news_intro
        news_content
        categoryNews {
          _id
          category_name
        }
        publisher {
          _id
          username
          email
          display_name
        }
      }
    }
  }
`;
const UPLOAD_news_img = gql`
  mutation UploadNewsImage($news_img: Upload!) {
    uploadNewsImage(news_img: $news_img) {
      status
      message
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
        news_title
        categoryNews {
          _id
          category_name
        }
        publisher {
          _id
          username
          email
          display_name
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
  DELETE_NEWS_MULTI,
  UPLOAD_news_img
};
