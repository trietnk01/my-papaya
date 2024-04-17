import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String, { nullable: true })
  username: string;

  @Field((type) => String, { nullable: true })
  email: string;

  @Field((type) => String, { nullable: true })
  displayName: string;

  @Field((type) => String, { nullable: true })
  token: string;
}
