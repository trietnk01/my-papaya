import { IUser } from "@/types/users";
import { UsersService } from "@/users/users.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private confService: ConfigService,
    private jwt: JwtService
  ) {}

  validateUser = async (username: string, pass: string) => {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return user;
      }
    }
    return null;
  };
  createToken = async (userId: string, email: string) => {
    const accessToken: string = await this.jwt.sign(
      { userId, email },
      {
        secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET")
      }
    );
    const refreshToken: string = await this.jwt.sign(
      { userId, email },
      { secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET") }
    );
    return { accessToken, refreshToken };
  };
  login = async (user: IUser) => {
    try {
      const { _id, username, email, fullname } = user;
      const payload: any = {
        sub: "token login",
        iss: "from server",
        _id,
        username,
        email,
        fullname
      };
      const token: string = await this.jwt.sign(payload, {
        secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET")
      });
      await this.usersService.updateUserToken(_id, token);
      return { _id, username, email, fullname, token };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  logout = async (user: IUser) => {
    try {
      const { _id } = user;
      await this.usersService.updateUserToken(_id, null);
      return {
        action: "logout"
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
}
