import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { In, Repository } from "typeorm";
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
        const newsItem = this.newsRepository.create({
          _id: uuid(),
          newsTitle: createNewsInput.newsTitle,
          newsIntro: createNewsInput.newsIntro,
          newsContent: createNewsInput.newsContent,
          categoryNewsId: createNewsInput.categoryNewsId,
          publisherId: createNewsInput.publisherId
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
            newsIntro: updateNewsInput.newsIntro,
            categoryNewsId: updateNewsInput.categoryNewsId,
            newsContent: updateNewsInput.newsContent
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
        relations: { categoryNews: true, publisher: true },
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
    current: string,
    pageSize: string,
    req: Request
  ) => {
    let status: boolean = true;
    let message: string = "";
    let list = null;
    let total: number = 0;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHENTICATED";
      } else {
        const userItem = await this.usersService.findUserByToken(req);
        let position: number = (parseInt(current) - 1) * parseInt(pageSize);
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
        total = await this.newsRepository.count(where);
        list = await this.newsRepository.find({
          relations: { categoryNews: true, publisher: true },
          where,
          skip: position,
          take: parseInt(pageSize)
        });
      }
    } catch (err) {
      status = false;
      message = err.message;
    }
    return {
      status,
      message,
      list,
      total
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
  removeMulti = async (selectedIds: string, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHENTICATED";
      } else {
        if (!selectedIds) {
          status = false;
          message = "Please choose at least one id to delete";
        } else {
          const ids: string[] = JSON.parse(selectedIds);
          for (let i = 0; i < ids.length; i++) {
            await this.newsRepository.delete({ _id: ids[i].toString() });
          }
          message = "Delete news successfully";
        }
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
  findNewsDetailUnauthenticated = async (id: string) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      item = await this.newsRepository.findOne({
        relations: { categoryNews: true, publisher: true },
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
  findNewsDetailAuthenticated = async (id: string, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHENTICATED";
      } else {
        item = await this.newsRepository.findOne({
          relations: { categoryNews: true, publisher: true },
          where: { _id: id }
        });
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
