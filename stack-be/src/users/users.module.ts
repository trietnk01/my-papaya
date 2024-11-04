import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersResolver } from "./users.resolver";
import { Users, UsersSchema } from "./users.schema";
import { UsersService } from "./users.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
