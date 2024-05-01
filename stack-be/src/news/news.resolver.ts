import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryNewsService } from "categoy-news/category-news.service";
import { Request } from "express";
import { UsersService } from "users/users.service";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { NewsService } from "./news.service";
import { NewsType } from "./news.type";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";

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
  @Mutation(() => NewsType)
  updateNews(
    @Args("updateNewsInput") updateNewsInput: UpdateNewsInput,
    @Context("req") req: Request
  ) {
    return this.newsService.update(updateNewsInput, req);
  }
  @Query(() => NewsType)
  findNewsUnauthenticated(
    @Args("keyword", { type: () => String }) keyword: string,
    @Args("category_news_id", { type: () => String }) category_news_id: string,
    @Args("page", { type: () => String }) page: string
  ) {
    return this.newsService.findNewsUnauthenticated(keyword, category_news_id, page);
  }

  @Query(() => NewsType)
  findNewsAuthenticated(
    @Args("keyword", { type: () => String }) keyword: string,
    @Args("category_news_id", { type: () => String }) category_news_id: string,
    @Args("current", { type: () => String }) current: string,
    @Args("page_size", { type: () => String }) page_size: string,
    @Context("req") req: Request
  ) {
    return this.newsService.findNewsAuthenticated(
      keyword,
      category_news_id,
      current,
      page_size,
      req
    );
  }

  @Mutation(() => NewsType)
  uploadNewsImage(@Args("news_img", { type: () => GraphQLUpload }) news_img: FileUpload) {
    return this.newsService.uploadNewsImage(news_img);
  }

  @Mutation(() => NewsType)
  deleteNews(@Args("id", { type: () => String }) id: string, @Context("req") req: Request) {
    return this.newsService.remove(id, req);
  }

  @Mutation(() => NewsType)
  deleteNewsMulti(
    @Args("selectedIds", { type: () => String }) selectedIs: string,
    @Context("req") req: Request
  ) {
    return this.newsService.removeMulti(selectedIs, req);
  }

  @Query(() => NewsType)
  findNewsDetailUnauthenticated(@Args("id", { type: () => String }) id: string) {
    return this.newsService.findNewsDetailUnauthenticated(id);
  }

  @Query(() => NewsType)
  findNewsDetailAuthenticated(
    @Args("id", { type: () => String }) id: string,
    @Context("req") req: Request
  ) {
    return this.newsService.findNewsDetailAuthenticated(id, req);
  }
}
