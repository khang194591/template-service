import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoModule } from "./modules/todos/todo.module";

const modules = [TodoModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : ".env",
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config) => ({
        type: "mysql",
        host: config.getOrThrow("DATABASE_HOST"),
        port: +config.getOrThrow("DATABASE_PORT"),
        username: config.getOrThrow("DATABASE_USER"),
        password: config.getOrThrow("DATABASE_PASS"),
        database: config.getOrThrow("DATABASE_NAME"),
        entities: [join(__dirname, "/modules/**/**.entity{.ts,.js}")],
        synchronize: true,
      }),
    }),
    ...modules,
  ],
})
export class AppModule {}
