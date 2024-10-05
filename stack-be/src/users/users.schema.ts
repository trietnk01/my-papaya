import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UsersDocument = HydratedDocument<Users>;

@Schema({ collection: "users" })
export class Users {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  fullname: string;

  @Prop()
  token: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);