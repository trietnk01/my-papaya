import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "users/users.module";
import { News } from "./entities/news.entity";
import { NewsResolver } from "./news.resolver";
import { NewsService } from "./news.service";

@Module({
  imports: [TypeOrmModule.forFeature([News]), UsersModule],
  providers: [NewsResolver, NewsService]
})
export class NewsModule {}
