import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CategoryNewsType {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  categoryName: string;
}
