import { BadRequestException, Injectable } from "@nestjs/common";
import ldash from "lodash";
import { InjectModel } from "@nestjs/mongoose";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Model } from "mongoose";
import { IUser } from "@/types/users";
import { CreateUsersDto } from "./dto/create-users.dto";
import { Users } from "./users.schema";
@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}
  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };
  create = (usersItem: CreateUsersDto) => {
    try {
      const salt = genSaltSync(10);
      const hashPassword = hashSync(usersItem.password, salt);
      const usersCopiedItem = ldash.cloneDeep(usersItem);
      usersCopiedItem.password = hashPassword;
      const createdUser = new this.usersModel(usersCopiedItem);
      return createdUser.save();
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
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
  findUserByToken = async (token: string) => {
    return this.usersModel.findOne({ token });
  };
  findUserByIdUsernameEmail = (id: string, username: string, email: string) => {
    return this.usersModel.findOne({ _id: id, username, email });
  };
}
