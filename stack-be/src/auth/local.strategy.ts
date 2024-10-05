import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "@/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate = async (logIn: any) => {
    const user = await this.authService.validateUser(logIn.username, logIn.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  };
}
