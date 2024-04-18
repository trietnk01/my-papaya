import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateCategoryNewsInput } from "./create-categoy-new.input";

@InputType()
export class UpdateCategoyNewInput extends PartialType(CreateCategoryNewsInput) {
  @Field(() => Int)
  id: number;
}
