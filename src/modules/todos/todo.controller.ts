import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { UuidParams } from "@shared/common";
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from "./commands";
import { CreateTodoDto, GetTodoListQueryDto, UpdateTodoDto } from "./dtos";
import { GetTodoListQuery, GetTodoQuery } from "./queries";

@Controller("todos")
@ApiTags("Todos")
export class TodoController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  getTodoList(@Query() query: GetTodoListQueryDto) {
    return this.queryBus.execute(new GetTodoListQuery(query));
  }

  @Get(":id")
  getTodo(@Param() { id }: UuidParams) {
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.commandBus.execute(new CreateTodoCommand(body));
  }

  @Put(":id")
  updateTodo(@Param() { id }: UuidParams, @Body() body: UpdateTodoDto) {
    return this.commandBus.execute(new UpdateTodoCommand(id, body));
  }

  @Delete(":id")
  deleteTodo(@Param() { id }: UuidParams) {
    return this.commandBus.execute(new DeleteTodoCommand(id));
  }
}
