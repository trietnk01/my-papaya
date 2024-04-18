import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Repository } from "typeorm";
import { UsersService } from "users/users.service";
import { v4 as uuid } from "uuid";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { News } from "./entities/news.entity";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
    private usersService: UsersService
  ) {}
  create = async (createNewsInput: CreateNewsInput, req: Request) => {
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    let data = null;
    if (isValid) {
      const item = this.newsRepository.create({
        _id: uuid(),
        newsTitle: createNewsInput.newsTitle,
        categoryNewsId: createNewsInput.categoryNewsId
      });
      data = await this.newsRepository.save(item);
    }
    return data;
  };

  findAll = async (
    keyword: string,
    categoryNewsId: string,
    page: number,
    req: Request
  ): Promise<News[]> => {
    let data = null;
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    if (isValid) {
      let totalItemPerpage: number = 5;
      let position: number = (page - 1) * totalItemPerpage;
      let where = {};
      if (keyword) {
        where["newsTitle"] = new RegExp(keyword, "i");
      }
      if (categoryNewsId) {
        where["categoryNewsId"] = categoryNewsId;
      }
      data = await this.newsRepository.find({
        where,
        skip: position,
        take: totalItemPerpage
      });
    }
    return data;
  };

  update = async (updateNewsInput: UpdateNewsInput, req: Request) => {
    let data = null;
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    if (isValid) {
      await this.newsRepository.update(
        { _id: updateNewsInput._id },
        {
          newsTitle: updateNewsInput.newsTitle,
          categoryNewsId: updateNewsInput.categoryNewsId
        }
      );
      data = this.newsRepository.findOneBy({ _id: updateNewsInput._id });
    }
    return data;
  };

  remove = async (id: string, req: Request) => {
    let data = null;
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    if (isValid) {
      data = await this.newsRepository.findOneBy({ _id: id });
      await this.newsRepository.delete({ _id: id });
    }
    return data;
  };
}
