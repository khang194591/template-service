import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CommandHandlers } from "./commands";
import { QueryHandlers } from "./queries";
import { TodoCmdController } from "./todo-cmd.controller";
import { TodoController } from "./todo.controller";
import { TodoRepository } from "./todo.repository";
import { TodoService } from "./todo.service";

@Module({
  imports: [CqrsModule],
  controllers: [TodoController, TodoCmdController],
  providers: [
    TodoRepository,
    TodoService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class TodoModule {}
