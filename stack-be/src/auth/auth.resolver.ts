import { CurrentUser, Public } from "@/decorator/customize";
import { IUser } from "@/types/users";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthType } from "./auth.type";
import { LocalAuthGuard } from "./local-auth.guard";

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private auth: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthType)
  async login(
    @Args("username", { type: () => String }) username: string,
    @Args("password", { type: () => String }) password: string,
    @CurrentUser() user: IUser
  ) {
    return this.auth.login(user);
  }

  @Query(() => AuthType)
  getHello(@CurrentUser() user) {
    return user;
  }
}
