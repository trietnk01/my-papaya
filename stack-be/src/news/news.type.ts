import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class NewsType {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  newsTitle: string;

  @Field((type) => String, { nullable: true })
  categoryNewsId: string;

  @Field((type) => String, { nullable: true })
  categoryNewsName: string;
}
