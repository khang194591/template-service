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
  Create__T__Command,
  Delete__T__Command,
  Update__T__Command,
} from "./commands";
import {
  Create__T__Dto,
  Delete__T__CmdDto,
  Delete__T__ResDto,
  Get__T__ListQueryDto,
  Get__T__ListResDto,
  Get__T__QueryDto,
  Get__T__ResDto,
  Update__T__CmdDto,
  Update__T__ResDto,
} from "./dtos";
import { Get__T__ListQuery, Get__T__Query } from "./queries";

const patterns = {
  create: "__t__.create",
  update: "__t__.update",
  getDetail: "__t__.get-detail",
  getList: "__t__.get-list",
  delete: "__t__.delete",
};

@Controller()
@UseInterceptors(MicroserviceInterceptor)
@UseFilters(MicroserviceExceptionFilter)
export class __T__CmdController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern(patterns.getList)
  get__T__List(
    request: MicroserviceRequest<Get__T__ListQueryDto>,
  ): Promise<Get__T__ListResDto> {
    const payload = plainToInstance(Get__T__ListQueryDto, request.input);
    return this.queryBus.execute(new Get__T__ListQuery(payload));
  }

  @MessagePattern(patterns.getDetail)
  get__T__(
    request: MicroserviceRequest<Get__T__QueryDto>,
  ): Promise<Get__T__ResDto> {
    const { id } = plainToInstance(Get__T__QueryDto, request.input);
    return this.queryBus.execute(new Get__T__Query(id));
  }

  @MessagePattern(patterns.create)
  create__T__(
    request: MicroserviceRequest<Create__T__Dto>,
  ): Promise<Get__T__ResDto> {
    const payload = plainToInstance(Create__T__Dto, request.input);

    return this.commandBus.execute(new Create__T__Command(payload));
  }

  @MessagePattern(patterns.update)
  update__T__(
    request: MicroserviceRequest<Update__T__CmdDto>,
  ): Promise<Update__T__ResDto> {
    const { id, data } = plainToInstance(Update__T__CmdDto, request.input);
    return this.commandBus.execute(new Update__T__Command(id, data));
  }

  @MessagePattern(patterns.delete)
  delete__T__(
    request: MicroserviceRequest<Delete__T__CmdDto>,
  ): Promise<Delete__T__ResDto> {
    const { id } = plainToInstance(Delete__T__CmdDto, request.input);
    return this.commandBus.execute(new Delete__T__Command(id));
  }
}
