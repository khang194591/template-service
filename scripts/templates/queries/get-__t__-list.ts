import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { __T__Service } from "../__t__.service";
import { Get__T__ListQueryDto, Get__T__ListResDto } from "../dtos";
import { __T__ } from "../entities";

export class Get__T__ListQuery {
  constructor(public readonly query: Get__T__ListQueryDto) {}
}

@QueryHandler(Get__T__ListQuery)
export class Get__T__ListQueryHandler
  implements IQueryHandler<Get__T__ListQuery>
{
  constructor(
    @InjectRepository(__T__)
    private readonly __t__Repository: Repository<__T__>,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute({ query }: Get__T__ListQuery): Promise<Get__T__ListResDto> {
    const { limit, offset } = query;

    const [items, total] = await this.__t__Repository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return plainToInstance(Get__T__ListResDto, { data: items, total });
  }
}
