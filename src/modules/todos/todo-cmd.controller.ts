import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from "@nestjs/microservices";
import {
  MicroserviceExceptionFilter,
  MicroserviceInterceptor,
  MicroserviceRequest,
} from "@shared/common";
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from "./commands";
import {
  CreateTodoDto,
  DeleteTodoDto,
  DeleteTodoResDto,
  GetTodoListQueryDto,
  GetTodoListResDto,
  GetTodoQueryDto,
  GetTodoResDto,
  UpdateTodoDto,
  UpdateTodoResDto,
} from "./dto";
import { GetTodoListQuery, GetTodoQuery } from "./queries";

const patterns = {
  create: "todo.create",
  update: "todo.update",
  getDetail: "todo.get-detail",
  getList: "todo.get-list",
  delete: "todo.delete",
};

@Controller()
@UseInterceptors(MicroserviceInterceptor)
@UseFilters(MicroserviceExceptionFilter)
export class TodoCmdController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern(patterns.getList)
  getTodoList(
    request: MicroserviceRequest<GetTodoListQueryDto>,
  ): Promise<GetTodoListResDto> {
    return this.queryBus.execute(new GetTodoListQuery(request.input));
  }

  @MessagePattern(patterns.getDetail)
  getTodo(
    request: MicroserviceRequest<GetTodoQueryDto>,
  ): Promise<GetTodoListResDto> {
    return this.queryBus.execute(new GetTodoQuery(request.input));
  }

  @MessagePattern(patterns.create)
  createTodo(
    request: MicroserviceRequest<CreateTodoDto>,
  ): Promise<GetTodoResDto> {
    return this.commandBus.execute(new CreateTodoCommand(request.input));
  }

  @MessagePattern(patterns.update)
  updateTodo(
    request: MicroserviceRequest<UpdateTodoDto>,
  ): Promise<UpdateTodoResDto> {
    return this.commandBus.execute(new UpdateTodoCommand(request.input));
  }

  @MessagePattern(patterns.delete)
  deleteTodo(
    request: MicroserviceRequest<DeleteTodoDto>,
  ): Promise<DeleteTodoResDto> {
    return this.commandBus.execute(new DeleteTodoCommand(request.input));
  }
}
