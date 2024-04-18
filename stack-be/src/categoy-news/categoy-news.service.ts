import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CategoryNews } from "./entities/categoy-new.entity";
import { UsersService } from "users/users.service";
import { CreateCategoryNewsInput } from "./dto/create-categoy-new.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
@Injectable()
export class CategoyNewsService {
  constructor(
    @InjectRepository(CategoryNews)
    private categoryNewsRepository: Repository<CategoryNews>,
    private usersService: UsersService
  ) {}
  create = async (createCategoyNewInput: CreateCategoryNewsInput, req: Request) => {
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    let data = null;
    if (isValid) {
      const item = this.categoryNewsRepository.create({
        _id: uuid(),
        categoryName: createCategoyNewInput.categoryName
      });
      data = await this.categoryNewsRepository.save(item);
    }
    return data;
  };
  findAll = async (req: Request) => {
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    let data = null;
    if (isValid) {
      data = await this.categoryNewsRepository.find();
    }
    return data;
  };
}
