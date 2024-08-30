import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { __T__Repository } from "../__t__.repository";
import { __T__Service } from "../__t__.service";
import { Get__T__QueryDto, Get__T__ResDto } from "../dto";

export class Get__T__Query {
  constructor(public readonly query: Get__T__QueryDto) {}
}

@QueryHandler(Get__T__Query)
export class Get__T__QueryHandler implements IQueryHandler<Get__T__Query> {
  constructor(
    private readonly __t__Repository: __T__Repository,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute({ query }: Get__T__Query): Promise<Get__T__ResDto> {
    console.log(query);

    return plainToInstance(Get__T__ResDto, {});
  }
}
