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
  findById = async (id: string, req: Request) => {
    const isValid: boolean = await this.usersService.checkAuthorized(req);
    let data = null;
    if (isValid) {
      data = await this.categoryNewsRepository.findOneBy({ _id: id });
    }
    return data;
  };
}
