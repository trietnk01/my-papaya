import { Field, ObjectType } from "@nestjs/graphql";
import { CategoryNewsType } from "categoy-news/category-news.type";
import { UsersType } from "users/users.type";
@ObjectType()
class INews {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  newsTitle: string;

  @Field((type) => CategoryNewsType, { nullable: true })
  categoryNews: CategoryNewsType;

  @Field((type) => UsersType, { nullable: true })
  publisher: UsersType;
}
@ObjectType()
export class NewsType {
  @Field((type) => Boolean)
  status: boolean;

  @Field((type) => String)
  message: string;

  @Field((type) => [INews], { nullable: true })
  list: [INews];

  @Field((type) => INews, { nullable: true })
  item: INews;
}
