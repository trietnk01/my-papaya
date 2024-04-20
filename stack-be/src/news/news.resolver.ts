import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from "@nestjs/graphql";
import { CategoryNewsService } from "categoy-news/category-news.service";
import { Request } from "express";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { News } from "./entities/news.entity";
import { NewsService } from "./news.service";
import { NewsType } from "./news.type";
import { UsersService } from "users/users.service";

@Resolver(() => NewsType)
export class NewsResolver {
  constructor(
    private readonly newsService: NewsService,
    private readonly categoryNewsService: CategoryNewsService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => NewsType)
  createNews(
    @Args("createNewsInput") createNewsInput: CreateNewsInput,
    @Context("req") req: Request
  ) {
    return this.newsService.create(createNewsInput, req);
  }

  @Query(() => NewsType)
  findNewsAll(
    @Args("keyword", { type: () => String }) keyword: string,
    @Args("categoryNewsId", { type: () => String }) categoryNewsId: string,
    @Args("page", { type: () => Number }) page: number,
    @Context("req") req: Request
  ) {
    return this.newsService.findAll(keyword, categoryNewsId, page, req);
  }

  @ResolveField()
  categoryNews(@Parent() news: News, @Context("req") req: Request) {
    return this.categoryNewsService.findById(news.categoryNewsId, req);
  }

  @ResolveField()
  publisher(@Parent() news: News, @Context("req") req: Request) {
    return this.usersService.getAccount(news.publisherId, req);
  }

  @Mutation(() => NewsType)
  updateNews(
    @Args("updateNewsInput") updateNewsInput: UpdateNewsInput,
    @Context("req") req: Request
  ) {
    return this.newsService.update(updateNewsInput, req);
  }

  @Mutation(() => NewsType)
  removeNews(
    @Args("id", { type: () => String }) id: string,
    @Context("req") req: Request
  ) {
    return this.newsService.remove(id, req);
  }

  @Query(() => NewsType)
  findNewsDetail(
    @Args("id", { type: () => String }) id: string,
    @Context("req") req: Request
  ) {
    return this.newsService.findDetail(id, req);
  }
}
