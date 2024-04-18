import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ResolveField,
  Parent
} from "@nestjs/graphql";
import { NewsService } from "./news.service";
import { Request } from "express";
import { NewsType } from "./news.type";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { News } from "./entities/news.entity";
import { CategoryNewsService } from "categoy-news/category-news.service";

@Resolver(() => NewsType)
export class NewsResolver {
  constructor(
    private readonly newsService: NewsService,
    private readonly categoryNewsService: CategoryNewsService
  ) {}

  @Mutation(() => NewsType)
  createNews(
    @Args("createNewsInput") createNewsInput: CreateNewsInput,
    @Context("req") req: Request
  ) {
    return this.newsService.create(createNewsInput, req);
  }

  @Query(() => [NewsType])
  findNewsAll(
    @Args("page", { type: () => Number }) page: number,
    @Context("req") req: Request
  ) {
    return this.newsService.findAll(page, req);
  }

  @Query(() => NewsType, { name: "news" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.newsService.findOne(id);
  }

  @ResolveField()
  categoryNewsItem(@Parent() news: News, @Context("req") req: Request) {
    return this.categoryNewsService.findById(news.categoryNewsId, req);
  }

  @Mutation(() => NewsType)
  updateNews(@Args("updateNewsInput") updateNewsInput: UpdateNewsInput) {
    return this.newsService.update(updateNewsInput.id, updateNewsInput);
  }

  @Mutation(() => NewsType)
  removeNews(@Args("id", { type: () => Int }) id: number) {
    return this.newsService.remove(id);
  }
}
