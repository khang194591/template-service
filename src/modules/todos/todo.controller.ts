import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from "./commands";
import {
  CreateTodoDto,
  DeleteTodoDto,
  GetTodoListQueryDto,
  GetTodoQueryDto,
  UpdateTodoDto,
} from "./dto";
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
  getTodo(@Param() param: GetTodoQueryDto) {
    return this.queryBus.execute(new GetTodoQuery(param));
  }

  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.commandBus.execute(new CreateTodoCommand(body));
  }

  @Put(":id")
  updateTodo(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return this.commandBus.execute(new UpdateTodoCommand({ ...body, id }));
  }

  @Delete(":id")
  deleteTodo(@Param() param: DeleteTodoDto) {
    return this.commandBus.execute(new DeleteTodoCommand(param));
  }
}
