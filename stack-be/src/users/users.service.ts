import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Model } from "mongoose";
import { CreateUserInput } from "./dto/create-user.input";
import { Users } from "./users.schema";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}
  create = (userCreateInput: CreateUserInput) => {
    const salt = genSaltSync(10);
    const hashPassword = hashSync(userCreateInput.password, salt);
    userCreateInput.password = hashPassword;
    const item = new this.usersModel(userCreateInput);
    item.save();
    return item;
  };
  findByUsername = (username: string) => {
    return this.usersModel.findOne({ username });
  };
  isValidPassword = (password: string, hash: string) => {
    return compareSync(password, hash);
  };
  updateUserToken = (id: string, token: string) => {
    return this.usersModel.updateOne({ _id: id }, { token });
  };
  findUserByToken = (token: string) => {
    return this.usersModel.findOne({ token });
  };
  /* login = async (username: string, password: string, res: Response) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      let userItem = await this.usersRepository.findOneBy({ username });
      if (!userItem) {
        status = false;
        message = "NO_USER_FOUNDED";
      } else {
        const checkIsvalidPassword = compareSync(password, userItem.password);
        if (!checkIsvalidPassword) {
          status = false;
          message = "INVALID_PASSWORD";
        } else {
          const payload = {
            sub: "token login",
            iss: "from server",
            _id: userItem._id,
            username: userItem.username,
            display_name: userItem.display_name,
            email: userItem.email
          };
          let token = this.jwt.sign(payload, {
            secret: this.confService.get<string>("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.confService.get<string>("JWT_ACCESS_EXPIRE").toString()
          });
          await this.usersRepository.update({ _id: userItem._id }, { token });
          item = {
            _id: userItem._id,
            username: userItem.username,
            email: userItem.email,
            display_name: userItem.display_name,
            token
          };
        }
      }
      return item;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  };
  checkValidToken = async (token: string) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      item = await this.usersRepository.findOneBy({ token });
      if (!item) {
        status = false;
        message = "INVALID_TOKEN";
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
  logout = async (id: string, req: Request) => {
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHENTICATED";
      } else {
        item = await this.usersRepository.update(
          { _id: id },
          {
            token: ""
          }
        );
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
    let status: boolean = true;
    let message: string = "";
    let item = null;
    try {
      const isValid: boolean = await this.checkAuthorized(req);
      if (!isValid) {
        status = false;
        message = "NOT_AUTHENTICATED";
      } else {
        item = await this.usersRepository.findOneBy({ _id: id });
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
  findOneByUsername = async (username: string) => {
    const data = await this.usersRepository.findOneBy({ username });
    return data;
  };
  findAllUsersUnauthenticated = async () => {
    let status: boolean = true;
    let message: string = "";
    let list = null;
    try {
      list = await this.usersRepository.find({});
    } catch (err) {
      status = false;
      message = err.message;
    }
    return {
      status,
      message,
      list
    };
  }; */
}
