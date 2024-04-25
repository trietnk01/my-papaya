import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppService } from "app.service";
import { CategoryNews } from "categoy-news/entities/category-new.entity";
import { News } from "news/entities/news.entity";
import { Users } from "users/entities/users.entity";
import { CategoryNewsModule } from "./categoy-news/category-news.module";
import { NewsModule } from "./news/news.module";
import { UsersModule } from "./users/users.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.production"]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (confService: ConfigService) => ({
        type: "mongodb",
        url: confService.get<string>("MONGODB_URI"),
        autoLoadEntities: true,
        synchronize: true,
        useUnifiedTopology: true,
        entities: [Users, CategoryNews, News]
      }),
      inject: [ConfigService]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    UsersModule,
    CategoryNewsModule,
    NewsModule
  ],
  providers: [AppService]
})
export class AppModule {}
