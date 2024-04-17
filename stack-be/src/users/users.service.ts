import { BadRequestException, Injectable } from "@nestjs/common";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { v4 as uuid } from "uuid";
import ms from "ms";
import { Request, Response } from "express";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "./entities/users.entity";
import { GraphQLExecutionContext } from "@nestjs/graphql";
import { IUser } from "./users.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
    private jwt: JwtService,
    private confService: ConfigService
  ) {}
  create = async (userCreateInput: CreateUserInput) => {
    let status = true;
    let message = "Create user successfully";
    let data = null;
    const item = new this.usersModel(userCreateInput);
    const salt = genSaltSync(10);
    const hashPassword = hashSync(userCreateInput.password, salt);
    item._id = uuid();
    item.password = hashPassword;
    data = await item.save();
    return {
      status,
      message,
      data
    };
  };
  login = async (username: string, password: string, res: Response) => {
    try {
      let userItem = await this.usersModel.findOne({ username });
      if (userItem) {
        const checkIsvalidPassword = compareSync(password, userItem.password);
        if (checkIsvalidPassword) {
          const payload = {
            sub: "token login",
            iss: "from server",
            _id: userItem._id,
            username: userItem.username,
            displayName: userItem.displayName,
            email: userItem.email
          };
          let token = this.jwt.sign(payload, {
            secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.confService.get<string>("JWT_ACCESS_EXPIRE").toString()
          });
          await this.usersModel.updateOne({ _id: userItem._id }, { token });
          res.cookie("refreshToken", token, {
            httpOnly: false,
            maxAge: ms(this.confService.get<string>("JWT_ACCESS_EXPIRE").toString())
          });
          let item = {
            _id: userItem._id,
            username: userItem.username,
            email: userItem.email,
            displayName: userItem.displayName,
            token
          };
          return item;
        } else {
          throw new BadRequestException("invalid_password");
        }
      } else {
        throw new BadRequestException("no_data_returned");
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  findOneByUsername = async (username: string) => {
    try {
      const data = await this.usersModel.findOne({ username });
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  isValidPassword = async (password: string, hash: string) => {
    return compareSync(password, hash);
  };
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
