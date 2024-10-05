import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Users, UsersSchema } from "./users.schema";

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
