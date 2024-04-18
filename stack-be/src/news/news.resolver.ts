import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { NewsService } from "./news.service";
import { Request } from "express";
import { NewsType } from "./news.type";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";

@Resolver(() => NewsType)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

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

  @Mutation(() => NewsType)
  updateNews(@Args("updateNewsInput") updateNewsInput: UpdateNewsInput) {
    return this.newsService.update(updateNewsInput.id, updateNewsInput);
  }

  @Mutation(() => NewsType)
  removeNews(@Args("id", { type: () => Int }) id: number) {
    return this.newsService.remove(id);
  }
}
