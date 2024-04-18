import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AppService } from "app.service";
import { UsersModule } from "./users/users.module";
import { CategoyNewsModule } from "./categoy-news/categoy-news.module";
import { NewsModule } from "./news/news.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "news/entities/news.entity";
import { Users } from "users/entities/users.entity";
import { CategoryNews } from "categoy-news/entities/categoy-new.entity";

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
    UsersModule,
    CategoyNewsModule,
    NewsModule
  ],
  providers: [AppService]
})
export class AppModule {}
