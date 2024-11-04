import { CurrentUser, Public } from "@/decorator/customize";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UsersService } from "./users.service";
import { UsersType } from "./users.type";
@Resolver(() => UsersType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UsersType)
  account(@CurrentUser() user) {
    return { user };
  }

  @Public()
  @Mutation(() => UsersType)
  createUser(@Args("usersItem") usersItem: CreateUsersDto) {
    return this.usersService.create(usersItem);
  }
}
