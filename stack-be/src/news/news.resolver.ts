import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryNewsService } from "categoy-news/category-news.service";
import { Request } from "express";
import { UsersService } from "users/users.service";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { NewsService } from "./news.service";
import { NewsType } from "./news.type";

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
  findNewsUnauthenticated(
    @Args("keyword", { type: () => String }) keyword: string,
    @Args("categoryNewsId", { type: () => String }) categoryNewsId: string,
    @Args("page", { type: () => String }) page: string
  ) {
    return this.newsService.findNewsUnauthenticated(keyword, categoryNewsId, page);
  }

  @Query(() => NewsType)
  findNewsAuthenticated(
    @Args("keyword", { type: () => String }) keyword: string,
    @Args("categoryNewsId", { type: () => String }) categoryNewsId: string,
    @Args("current", { type: () => String }) current: string,
    @Args("pageSize", { type: () => String }) pageSize: string,
    @Context("req") req: Request
  ) {
    return this.newsService.findNewsAuthenticated(
      keyword,
      categoryNewsId,
      current,
      pageSize,
      req
    );
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
  findNewsDetailUnauthenticated(
    @Args("id", { type: () => String }) id: string,
    @Context("req") req: Request
  ) {
    return this.newsService.findNewsDetailUnauthenticated(id, req);
  }
}
