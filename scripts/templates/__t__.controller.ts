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
  Create__T__Command,
  Delete__T__Command,
  Update__T__Command,
} from "./commands";
import { Create__T__Dto, Get__T__ListQueryDto, Update__T__Dto } from "./dtos";
import { Get__T__ListQuery, Get__T__Query } from "./queries";

@Controller("__s__")
@ApiTags("__S__")
export class __T__Controller {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  get__T__List(@Query() query: Get__T__ListQueryDto) {
    return this.queryBus.execute(new Get__T__ListQuery(query));
  }

  @Get(":id")
  get__T__(@Param() { id }: UuidParams) {
    return this.queryBus.execute(new Get__T__Query(id));
  }

  @Post()
  create__T__(@Body() body: Create__T__Dto) {
    return this.commandBus.execute(new Create__T__Command(body));
  }

  @Put(":id")
  update__T__(@Param() { id }: UuidParams, @Body() body: Update__T__Dto) {
    return this.commandBus.execute(new Update__T__Command(id, body));
  }

  @Delete(":id")
  delete__T__(@Param() { id }: UuidParams) {
    return this.commandBus.execute(new Delete__T__Command(id));
  }
}
