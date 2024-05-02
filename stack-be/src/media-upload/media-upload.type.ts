import { Field, ObjectType } from "@nestjs/graphql";
import { ICategoryNews } from "categoy-news/category-news.type";
import { IUser } from "users/users.type";

@ObjectType()
export class MediaUploadType {
  @Field((type) => Boolean)
  status: boolean;

  @Field((type) => String)
  message: string;

  @Field((type) => String)
  media_file_name: string;
}
