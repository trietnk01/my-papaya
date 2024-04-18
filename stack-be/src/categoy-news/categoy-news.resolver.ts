import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoyNewsService } from "./categoy-news.service";
import { CreateCategoryNewsInput } from "./dto/create-categoy-new.input";
import { CategoryNewsType } from "./category-news.type";
import { Request } from "express";

@Resolver(() => CategoryNewsType)
export class CategoyNewsResolver {
  constructor(private readonly categoyNewsService: CategoyNewsService) {}

  @Mutation(() => CategoryNewsType)
  createCategoyNews(
    @Args("createCategoyNewInput") createCategoyNewInput: CreateCategoryNewsInput,
    @Context("req") req: Request
  ) {
    return this.categoyNewsService.create(createCategoyNewInput, req);
  }

  @Query((returns) => [CategoryNewsType])
  findAllCategoryNews(@Context("req") req: Request) {
    return this.categoyNewsService.findAll(req);
  }
}
