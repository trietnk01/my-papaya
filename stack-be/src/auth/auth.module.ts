import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (confService: ConfigService) => ({
        secret: confService.get<string>("JWT_ACCESS_TOKEN_SECRET")
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthResolver, AuthService, ConfigService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
