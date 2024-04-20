import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class IUser {
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
@ObjectType()
export class UsersType {
  @Field((type) => Boolean)
  status: boolean;

  @Field((type) => String)
  message: string;

  @Field((type) => [IUser], { nullable: true })
  list: [IUser];

  @Field((type) => IUser, { nullable: true })
  item: IUser;
}
