import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "users/users.module";
import { News } from "./entities/news.entity";
import { NewsResolver } from "./news.resolver";
import { NewsService } from "./news.service";
import { CategoryNewsModule } from "categoy-news/category-news.module";

@Module({
  imports: [TypeOrmModule.forFeature([News]), UsersModule, CategoryNewsModule],
  providers: [NewsResolver, NewsService]
})
export class NewsModule {}
