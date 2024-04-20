import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryNewsService } from "./category-news.service";
import { CreateCategoryNewsInput } from "./dto/create-category-new.input";
import { CategoryNewsType } from "./category-news.type";
import { Request } from "express";

@Resolver(() => CategoryNewsType)
export class CategoryNewsResolver {
  constructor(private readonly categoyNewsService: CategoryNewsService) {}

  @Mutation(() => CategoryNewsType)
  createCategoyNews(
    @Args("createCategoyNewInput") createCategoyNewInput: CreateCategoryNewsInput,
    @Context("req") req: Request
  ) {
    return this.categoyNewsService.create(createCategoyNewInput, req);
  }

  @Query((returns) => CategoryNewsType)
  findAllCategoryNews(@Context("req") req: Request) {
    return this.categoyNewsService.findAll(req);
  }
}
