import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Response, Request } from "express";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UsersService } from "./users.service";
import { UsersType } from "./users.type";
import { ResponseMessage } from "decorator/customize";

@Resolver(() => UsersType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UsersType)
  login(
    @Args("username", { type: () => String }) username: string,
    @Args("password", { type: () => String }) password: string,
    @Context("res") res: Response
  ) {
    return this.usersService.login(username, password, res);
  }

  @Query(() => UsersType)
  checkValidToken(@Args("token", { type: () => String }) token: string) {
    return this.usersService.checkValidToken(token);
  }

  @Query(() => UsersType)
  account(@Args("id", { type: () => String }) id: string, @Context("req") req: Request) {
    return this.usersService.getAccount(id, req);
  }

  @Mutation(() => UsersType)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
