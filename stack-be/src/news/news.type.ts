import { Field, ObjectType } from "@nestjs/graphql";
import { CategoryNewsType } from "categoy-news/category-news.type";

@ObjectType()
export class NewsType {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  newsTitle: string;

  @Field((type) => CategoryNewsType, { nullable: true })
  categoryNewsItem: CategoryNewsType;
}
