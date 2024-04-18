import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import ms from "ms";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { Users } from "./entities/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private jwt: JwtService,
    private confService: ConfigService
  ) {}
  create = async (userCreateInput: CreateUserInput) => {
    let data = null;
    const salt = genSaltSync(10);
    const hashPassword = hashSync(userCreateInput.password, salt);
    const item = this.usersRepository.create({
      _id: uuid(),
      username: userCreateInput.username,
      password: hashPassword,
      email: userCreateInput.email,
      displayName: userCreateInput.displayName
    });
    data = await this.usersRepository.save(item);

    return data;
  };
  login = async (username: string, password: string, res: Response) => {
    try {
      let userItem = await this.usersRepository.findOneBy({ username });
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
          await this.usersRepository.update({ _id: userItem._id }, { token });
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
  checkValidToken = async (token: string) => {
    const item = await this.usersRepository.findOneBy({ token });
    return item;
  };
  checkAuthorized = async (req: Request) => {
    let isValid: boolean = true;
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      isValid = false;
    } else {
      const bearerData = bearerHeader.split(" ");
      const bearerTxt = bearerData[0];
      let token = bearerData[1];
      if (bearerTxt !== "Bearer") {
        isValid = false;
      } else {
        const item = await this.usersRepository.findOneBy({ token });
        if (!item) {
          isValid = false;
        }
      }
    }
    return isValid;
  };
  getAccount = async (id: string, req: Request) => {
    let item = null;
    const isValid: boolean = await this.checkAuthorized(req);
    if (isValid) {
      item = await this.usersRepository.findOneBy({ _id: id });
    }
    return item;
  };
  findOneByUsername = async (username: string) => {
    try {
      const data = await this.usersRepository.findOneBy({ username });
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
