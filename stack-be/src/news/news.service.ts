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

  findAll = async (page: number, req: Request) => {
    let data = null;
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    if (isValid) {
      let currentPage: number = 1;
      let totalItemPerpage: number = 5;
      if (page) {
        currentPage = page;
      }
      let position: number = (currentPage - 1) * totalItemPerpage;
      data = this.newsRepository.find({ skip: position, take: totalItemPerpage });
    }
    return data;
  };

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsInput: UpdateNewsInput) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
