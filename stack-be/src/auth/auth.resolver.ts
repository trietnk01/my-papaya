import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Response, Request } from "express";
import { UsersService } from "@/users/users.service";
import { AuthType } from "./object-type/auth.type";
import { AuthService } from "./auth.service";
import { Req, UseGuards } from "@nestjs/common";
import { CurrentUser, Public } from "@/decorator/public.decorator";
import { LoginType } from "./object-type/login.type";
import { LocalAuthGuard } from "./local-auth.guard";
import { LoginInput } from "./input-type/login-input.type";
import { IUser } from "@/types/user";

export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => LoginType)
  @UseGuards(LocalAuthGuard)
  signIn(@Args("logIn") logIn: LoginInput, @CurrentUser() user: IUser) {
    console.log("user = ", user);
    return { username: "diennk", email: "nguyenkimdien02@gmail.com", fullname: "Nguyen Kim Dien" };
  }

  @Public()
  @Query(() => String)
  hello() {
    return "Hello world";
  }
}
