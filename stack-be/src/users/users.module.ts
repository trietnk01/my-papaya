import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersResolver } from "./users.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/users.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersResolver, UsersService, ConfigService, JwtService],
  exports: [UsersService]
})
export class UsersModule {}
