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
        message = "NOT_AUTHENTICATED";
      } else {
        const userItem = await this.usersService.findUserByToken(req);
        const newsItem = this.newsRepository.create({
          _id: uuid(),
          newsTitle: createNewsInput.newsTitle,
          categoryNewsId: createNewsInput.categoryNewsId,
          publisherId: userItem._id
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

  findNewsUnauthenticated = async (
    keyword: string,
    categoryNewsId: string,
    page: string
  ) => {
    let status: boolean = true;
    let message: string = "";
    let list = null;
    try {
      let totalItemPerpage: number = 5;
      let position: number = (parseInt(page) - 1) * totalItemPerpage;
      let where = {};
      if (keyword) {
        where["newsTitle"] = new RegExp(keyword, "i");
      }
      if (categoryNewsId) {
        where["categoryNewsId"] = categoryNewsId;
      }
      list = await this.newsRepository.find({
        relations: { categoryNews: true, user: true },
        where,
        skip: position,
        take: totalItemPerpage
      });
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

  findNewsAuthenticated = async (
    keyword: string,
    categoryNewsId: string,
    page: string,
    req: Request
  ) => {
    let status: boolean = true;
    let message: string = "";
    let list = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHENTICATED";
      } else {
        const userItem = await this.usersService.findUserByToken(req);
        let totalItemPerpage: number = 5;
        let position: number = (parseInt(page) - 1) * totalItemPerpage;
        let where = {};
        if (keyword) {
          where["newsTitle"] = new RegExp(keyword, "i");
        }
        if (categoryNewsId) {
          where["categoryNewsId"] = categoryNewsId;
        }
        if (userItem && userItem._id) {
          where["publisherId"] = userItem._id;
        }
        list = await this.newsRepository.find({
          relations: { categoryNews: true, user: true },
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
        message = "NOT_AUTHENTICATED";
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
        message = "NOT_AUTHENTICATED";
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
  findNewsDetailUnauthenticated = async (id: string, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      item = await this.newsRepository.findOne({
        relations: { categoryNews: true, user: true },
        where: { _id: id }
      });
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
