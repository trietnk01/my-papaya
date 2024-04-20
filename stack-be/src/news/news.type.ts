import { Field, ObjectType } from "@nestjs/graphql";
import { ICategoryNews } from "categoy-news/category-news.type";
@ObjectType()
class INews {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  newsTitle: string;

  @Field((type) => ICategoryNews, { nullable: true })
  categoryNews: ICategoryNews;
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
