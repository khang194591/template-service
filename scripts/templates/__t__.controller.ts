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
import {
  Create__T__Dto,
  Create__T__ResDto,
  Delete__T__ResDto,
  Get__T__ListQueryDto,
  Get__T__ListResDto,
  Get__T__ResDto,
  Update__T__Dto,
  Update__T__ResDto,
} from "./dtos";
import { Get__T__ListQuery, Get__T__Query } from "./queries";

@Controller("__s__")
@ApiTags("__S__")
export class __T__Controller {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  get__T__List(
    @Query() query: Get__T__ListQueryDto,
  ): Promise<Get__T__ListResDto> {
    return this.queryBus.execute(new Get__T__ListQuery(query));
  }

  @Get(":id")
  get__T__(@Param() { id }: UuidParams): Promise<Get__T__ResDto> {
    return this.queryBus.execute(new Get__T__Query(id));
  }

  @Post()
  create__T__(@Body() body: Create__T__Dto): Promise<Create__T__ResDto> {
    return this.commandBus.execute(new Create__T__Command(body));
  }

  @Put(":id")
  update__T__(
    @Param() { id }: UuidParams,
    @Body() body: Update__T__Dto,
  ): Promise<Update__T__ResDto> {
    return this.commandBus.execute(new Update__T__Command(id, body));
  }

  @Delete(":id")
  delete__T__(@Param() { id }: UuidParams): Promise<Delete__T__ResDto> {
    return this.commandBus.execute(new Delete__T__Command(id));
  }
}
