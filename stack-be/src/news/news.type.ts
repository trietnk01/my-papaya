import { Field, ObjectType } from "@nestjs/graphql";
import { CategoryNewsType } from "categoy-news/category-news.type";
import { UsersType } from "users/users.type";

@ObjectType()
export class NewsType {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  newsTitle: string;

  @Field((type) => CategoryNewsType, { nullable: true })
  categoryNews: CategoryNewsType;

  @Field((type) => UsersType, { nullable: true })
  publisher: UsersType;
}