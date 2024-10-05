import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class LoginType {
  @Field((type) => String, { nullable: true })
  username: string;

  @Field((type) => String, { nullable: true })
  email: string;

  @Field((type) => String, { nullable: true })
  fullname: string;
}
