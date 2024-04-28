import { Stream } from "stream";
import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { GraphQLUpload } from "graphql-upload-ts";
interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
@InputType()
export class CreateNewsInput {
  @MinLength(1)
  @Field((type) => String)
  news_title: string;

  @MinLength(1)
  @Field((type) => String)
  news_intro: string;

  @Field((type) => String)
  news_content: string;

  @Field((type) => GraphQLUpload)
  news_img: Promise<FileUpload>;

  @MinLength(1)
  @Field((type) => String)
  category_news_id: string;

  @MinLength(1)
  @Field((type) => String)
  publisher_id: string;
}
