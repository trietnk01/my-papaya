import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "users/users.module";
import { CategoyNewsResolver } from "./categoy-news.resolver";
import { CategoyNewsService } from "./categoy-news.service";
import { CategoryNews } from "./entities/categoy-new.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryNews]), UsersModule],
  providers: [CategoyNewsResolver, CategoyNewsService]
})
export class CategoyNewsModule {}
