import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Response, Request } from "express";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UsersService } from "./users.service";
import { UserType } from "./users.type";

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  login(
    @Args("username", { type: () => String }) username: string,
    @Args("password", { type: () => String }) password: string,
    @Context("res") res: Response
  ) {
    return this.usersService.login(username, password, res);
  }

  @Query(() => UserType)
  checkValidToken(@Args("token", { type: () => String }) token: string) {
    return this.usersService.checkValidToken(token);
  }

  @Query(() => UserType)
  account(@Args("id", { type: () => String }) id: string, @Context("req") req: Request) {
    return this.usersService.getAccount(id, req);
  }

  @Mutation(() => UserType)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserType], { name: "users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { name: "user" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserType)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserType)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
