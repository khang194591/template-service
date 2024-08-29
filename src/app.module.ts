import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TodoModule } from "./modules/todos/todo.module";

const modules = [TodoModule];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    ...modules,
  ],
})
export class AppModule {}
