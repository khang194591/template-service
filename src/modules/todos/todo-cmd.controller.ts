import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from "@nestjs/microservices";
import {
  MicroserviceExceptionFilter,
  MicroserviceInterceptor,
  MicroserviceRequest,
} from "@shared/common";
import { plainToInstance } from "class-transformer";
import {
  CreateTodoCommand,
  DeleteTodoCommand,
  UpdateTodoCommand,
} from "./commands";
import {
  CreateTodoDto,
  DeleteTodoCmdDto,
  DeleteTodoResDto,
  GetTodoListQueryDto,
  GetTodoListResDto,
  GetTodoQueryDto,
  GetTodoResDto,
  UpdateTodoCmdDto,
  UpdateTodoResDto,
} from "./dtos";
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
    const payload = plainToInstance(GetTodoListQueryDto, request.input);
    return this.queryBus.execute(new GetTodoListQuery(payload));
  }

  @MessagePattern(patterns.getDetail)
  getTodo(
    request: MicroserviceRequest<GetTodoQueryDto>,
  ): Promise<GetTodoResDto> {
    const { id } = plainToInstance(GetTodoQueryDto, request.input);
    return this.queryBus.execute(new GetTodoQuery(id));
  }

  @MessagePattern(patterns.create)
  createTodo(
    request: MicroserviceRequest<CreateTodoDto>,
  ): Promise<GetTodoResDto> {
    const payload = plainToInstance(CreateTodoDto, request.input);

    return this.commandBus.execute(new CreateTodoCommand(payload));
  }

  @MessagePattern(patterns.update)
  updateTodo(
    request: MicroserviceRequest<UpdateTodoCmdDto>,
  ): Promise<UpdateTodoResDto> {
    const { id, data } = plainToInstance(UpdateTodoCmdDto, request.input);
    return this.commandBus.execute(new UpdateTodoCommand(id, data));
  }

  @MessagePattern(patterns.delete)
  deleteTodo(
    request: MicroserviceRequest<DeleteTodoCmdDto>,
  ): Promise<DeleteTodoResDto> {
    const { id } = plainToInstance(DeleteTodoCmdDto, request.input);
    return this.commandBus.execute(new DeleteTodoCommand(id));
  }
}
