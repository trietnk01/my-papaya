import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Repository } from "typeorm";
import { UsersService } from "users/users.service";
import { v4 as uuid } from "uuid";
import { CreateCategoryNewsInput } from "./dto/create-category-new.input";
import { CategoryNews } from "./entities/category-new.entity";
@Injectable()
export class CategoryNewsService {
  constructor(
    @InjectRepository(CategoryNews)
    private categoryNewsRepository: Repository<CategoryNews>,
    private usersService: UsersService
  ) {}
  create = async (createCategoyNewInput: CreateCategoryNewsInput, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        const categoryNewsItem = this.categoryNewsRepository.create({
          _id: uuid(),
          categoryName: createCategoyNewInput.categoryName
        });
        item = await this.categoryNewsRepository.save(categoryNewsItem);
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
  findAll = async (req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let list = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        list = await this.categoryNewsRepository.find();
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
  findById = async (id: string, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.usersService.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHORIZATION";
      } else {
        item = await this.categoryNewsRepository.findOneBy({ _id: id });
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
