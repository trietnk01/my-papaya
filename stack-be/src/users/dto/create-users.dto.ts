import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";
@InputType()
export class CreateUsersDto {
  @IsNotEmpty()
  @Field((type) => String)
  username: string;

  @IsNotEmpty()
  @Field((type) => String)
  password: string;

  @IsNotEmpty()
  @Field((type) => String)
  fullname: string;

  @IsEmail()
  @Field((type) => String)
  email: string;

  @Field((type) => String, { nullable: true })
  token: string;
}
