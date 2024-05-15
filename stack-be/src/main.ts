import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import * as fs from "fs";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { AppModule } from "./app.module";
async function bootstrap() {
  const httpsOptions = {
    cert: fs.readFileSync(join(process.cwd() + "/src/secrets/certificate.pem")),
    key: fs.readFileSync(join(process.cwd() + "/src/secrets/private.pem"))
  };
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions
  });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  const confService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: "https://testing.papaya.dien.name.vn", credentials: true });
  const port: string = confService.get<string>("PORT");
  await app.listen(port);
}
bootstrap();
