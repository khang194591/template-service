import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from "@nestjs/microservices";
import {
  Create__T__Command,
  Delete__T__Command,
  Update__T__Command,
} from "./commands";
import {
  Create__T__Dto,
  Delete__T__Dto,
  Delete__T__ResDto,
  Get__T__ListQueryDto,
  Get__T__ListResDto,
  Get__T__QueryDto,
  Get__T__ResDto,
  Update__T__Dto,
  Update__T__ResDto,
} from "./dto";
import { Get__T__ListQuery, Get__T__Query } from "./queries";

const patterns = {
  create: "__t__.create",
  update: "__t__.update",
  getDetail: "__t__.get-detail",
  getList: "__t__.get-list",
  delete: "__t__.delete",
};

@Controller()
export class __T__CmdController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern(patterns.getList)
  get__T__List(request: Get__T__ListQueryDto): Promise<Get__T__ListResDto> {
    return this.queryBus.execute(new Get__T__ListQuery(request));
  }

  @MessagePattern(patterns.getDetail)
  get__T__(request: Get__T__QueryDto): Promise<Get__T__ListResDto> {
    return this.queryBus.execute(new Get__T__Query(request));
  }

  @MessagePattern(patterns.create)
  create__T__(request: Create__T__Dto): Promise<Get__T__ResDto> {
    return this.commandBus.execute(new Create__T__Command(request));
  }

  @MessagePattern(patterns.update)
  update__T__(request: Update__T__Dto): Promise<Update__T__ResDto> {
    return this.commandBus.execute(new Update__T__Command(request));
  }

  @MessagePattern(patterns.delete)
  delete__T__(request: Delete__T__Dto): Promise<Delete__T__ResDto> {
    return this.commandBus.execute(new Delete__T__Command(request));
  }
}
