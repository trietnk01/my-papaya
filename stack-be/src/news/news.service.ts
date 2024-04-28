import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { In, Repository } from "typeorm";
import { UsersService } from "users/users.service";
import { v4 as uuid } from "uuid";
import { CreateNewsInput } from "./dto/create-news.input";
import { UpdateNewsInput } from "./dto/update-news.input";
import { News } from "./entities/news.entity";
import { join } from "path";

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
        const { news_img } = createNewsInput;
        const { createReadStream, filename } = await news_img;
        const pathName = join(process.cwd(), `./public/${filename}`);
        await createReadStream().pipe(fs.createWriteStream(pathName));
        const newsItem = this.newsRepository.create({
          _id: uuid(),
          news_title: createNewsInput.news_title,
          news_intro: createNewsInput.news_intro,
          news_content: createNewsInput.news_content,
          news_img: filename,
          category_news_id: createNewsInput.category_news_id,
          publisher_id: createNewsInput.publisher_id
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
        const { news_img } = updateNewsInput;
        const { createReadStream, filename } = await news_img;
        const pathName = join(process.cwd(), `./public/${filename}`);
        await createReadStream().pipe(fs.createWriteStream(pathName));
        await this.newsRepository.update(
          { _id: updateNewsInput._id },
          {
            news_title: updateNewsInput.news_title,
            news_intro: updateNewsInput.news_intro,
            news_content: updateNewsInput.news_content,
            news_img: filename,
            category_news_id: updateNewsInput.category_news_id
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
  findNewsUnauthenticated = async (keyword: string, category_news_id: string, page: string) => {
    let status: boolean = true;
    let message: string = "";
    let list = null;
    try {
      let totalItemPerpage: number = 5;
      let position: number = (parseInt(page) - 1) * totalItemPerpage;
      let where = {};
      if (keyword) {
        where["news_title"] = new RegExp(keyword, "i");
      }
      if (category_news_id) {
        where["category_news_id"] = category_news_id;
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
    category_news_id: string,
    current: string,
    page_size: string,
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
        let position: number = (parseInt(current) - 1) * parseInt(page_size);
        let where = {};
        if (keyword) {
          where["news_title"] = new RegExp(keyword, "i");
        }
        if (category_news_id) {
          where["category_news_id"] = category_news_id;
        }
        if (userItem && userItem._id) {
          where["publisher_id"] = userItem._id;
        }
        total = await this.newsRepository.count(where);
        list = await this.newsRepository.find({
          relations: { categoryNews: true, publisher: true },
          where,
          skip: position,
          take: parseInt(page_size)
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
