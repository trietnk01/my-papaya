import { Stream } from "stream";
import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { GraphQLUpload } from "graphql-upload-ts";
interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
@InputType()
export class CreateNewsInput {
  @MinLength(1)
  @Field((type) => String)
  newsTitle: string;

  @MinLength(1)
  @Field((type) => String)
  newsIntro: string;

  @Field((type) => String)
  newsContent: string;

  @Field((type) => GraphQLUpload)
  newsImg: Promise<FileUpload>;

  @MinLength(1)
  @Field((type) => String)
  categoryNewsId: string;

  @MinLength(1)
  @Field((type) => String)
  publisherId: string;
}
