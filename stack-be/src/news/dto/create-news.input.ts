import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateNewsInput {
  @MinLength(1)
  @Field((type) => String)
  newsTitle: string;

  @MinLength(1)
  @Field((type) => String)
  categoryNewsId: string;
}
