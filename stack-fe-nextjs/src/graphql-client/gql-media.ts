import { gql } from "@apollo/client";
const UPLOAD_IMAGE = gql`
  mutation UploadImage(
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
export {};
