import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "express";
import { CreateUserInput } from "./dto/create-user.input";
import { UsersService } from "./users.service";
import { UsersType } from "./users.type";

@Resolver(() => UsersType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UsersType)
  account(@Args("_id", { type: () => String }) _id: string, @Context("req") req: Request) {
    return {};
  }

  @Mutation(() => UsersType)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
