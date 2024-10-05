import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field((type) => String, { nullable: false })
  username: string;

  @Field((type) => String, { nullable: false })
  password: string;
}
