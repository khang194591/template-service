import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as compression from "compression";
import * as pkgInfo from "../package.json";
import { AppModule } from "./app.module";

import metadata from "./metadata"; // <-- file auto-generated by the "PluginMetadataGenerator"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(compression());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: { servers: [configService.getOrThrow("NATS_URL")] },
  });

  const config = new DocumentBuilder()
    .setTitle(pkgInfo.name)
    .setDescription(pkgInfo.description)
    .setVersion(pkgInfo.version)
    .build();
  await SwaggerModule.loadPluginMetadata(metadata); // <-- here
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.startAllMicroservices();
  await app.listen(configService.getOrThrow("PORT"));
}

bootstrap();
