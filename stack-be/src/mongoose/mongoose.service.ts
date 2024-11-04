import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Mongoose } from "mongoose";

@Injectable()
export class MongooseService extends Mongoose implements OnModuleInit {
  async onModuleInit() {}
}
