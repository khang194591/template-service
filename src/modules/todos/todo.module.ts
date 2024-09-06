import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandHandlers } from "./commands";
import { Todo } from "./entities";
import { QueryHandlers } from "./queries";
import { TodoCmdController } from "./todo-cmd.controller";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController, TodoCmdController],
  providers: [TodoService, ...CommandHandlers, ...QueryHandlers],
  exports: [],
})
export class TodoModule {}
