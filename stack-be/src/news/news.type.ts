import { Field, ObjectType } from "@nestjs/graphql";
import { ICategoryNews } from "categoy-news/category-news.type";
import { IUser } from "users/users.type";
@ObjectType()
class INews {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  newsTitle: string;

  @Field((type) => String, { nullable: true })
  newsIntro: string;

  @Field((type) => String, { nullable: true })
  newsContent: string;

  @Field((type) => String, { nullable: true })
  categoryNewsId: string;

  @Field((type) => String, { nullable: true })
  publisherId: string;

  @Field((type) => ICategoryNews, { nullable: true })
  categoryNews: ICategoryNews;

  @Field((type) => IUser, { nullable: true })
  publisher: IUser;
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

  @Field((type) => Number, { nullable: true })
  total: Number;
}
