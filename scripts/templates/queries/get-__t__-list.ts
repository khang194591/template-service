import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { __T__Repository } from "../__t__.repository";
import { __T__Service } from "../__t__.service";
import { Get__T__ListQueryDto, Get__T__ListResDto } from "../dto";

export class Get__T__ListQuery {
  constructor(public readonly query: Get__T__ListQueryDto) {}
}

@QueryHandler(Get__T__ListQuery)
export class Get__T__ListQueryHandler
  implements IQueryHandler<Get__T__ListQuery>
{
  constructor(
    private readonly __t__Repository: __T__Repository,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute({ query }: Get__T__ListQuery): Promise<Get__T__ListResDto> {
    console.log(query);

    return plainToInstance(Get__T__ListResDto, { data: [], total: 0 });
  }
}
