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
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        const newsItem = this.newsRepository.create({
          _id: uuid(),
          newsTitle: createNewsInput.newsTitle,
          categoryNewsId: createNewsInput.categoryNewsId
        });
        item = await this.newsRepository.save(newsItem);
      }
    } catch (err) {
      status = false;
      message = err.message;
    }
    return {
      status,
      message,
      item
    };
  };

  findAll = async (
    keyword: string,
    categoryNewsId: string,
    page: number,
    req: Request
  ) => {
    let status: boolean = true;
    let message: string = "";
    let list = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        let totalItemPerpage: number = 5;
        let position: number = (page - 1) * totalItemPerpage;
        let where = {};
        if (keyword) {
          where["newsTitle"] = new RegExp(keyword, "i");
        }
        if (categoryNewsId) {
          where["categoryNewsId"] = categoryNewsId;
        }
        list = await this.newsRepository.find({
          where,
          skip: position,
          take: totalItemPerpage
        });
      }
    } catch (err) {
      status = false;
      message = err.message;
    }
    return {
      status,
      message,
      list
    };
  };

  update = async (updateNewsInput: UpdateNewsInput, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        await this.newsRepository.update(
          { _id: updateNewsInput._id },
          {
            newsTitle: updateNewsInput.newsTitle,
            categoryNewsId: updateNewsInput.categoryNewsId
          }
        );
        item = this.newsRepository.findOneBy({ _id: updateNewsInput._id });
      }
    } catch (err) {
      status = false;
      message = err.message;
    }
    return {
      status,
      message,
      item
    };
  };

  remove = async (id: string, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        item = await this.newsRepository.findOneBy({ _id: id });
        await this.newsRepository.delete({ _id: id });
      }
    } catch (err) {
      status = false;
      message = err.message;
    }
    return {
      status,
      message,
      item
    };
  };
  findDetail = async (id: string, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        item = await this.newsRepository.findOneBy({ _id: id });
      }
    } catch (err) {
      status = false;
      message = err.message;
    }
    return {
      status,
      message,
      item
    };
  };
}
