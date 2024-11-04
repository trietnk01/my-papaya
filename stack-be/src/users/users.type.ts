import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class UsersType {
  @Field((type) => String)
  _id: string;

  @Field((type) => String, { nullable: true })
  username: string;

  @Field((type) => String, { nullable: true })
  email: string;

  @Field((type) => String, { nullable: true })
  fullname: string;

  @Field((type) => String, { nullable: true })
  token: string;
}
