import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { __T__Service } from "../__t__.service";
import { Get__T__ResDto } from "../dtos";
import { __T__ } from "../entities";

export class Get__T__Query {
  constructor(public readonly id: string) {}
}

@QueryHandler(Get__T__Query)
export class Get__T__QueryHandler implements IQueryHandler<Get__T__Query> {
  constructor(
    @InjectRepository(__T__)
    private readonly __t__Repository: Repository<__T__>,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute(query: Get__T__Query): Promise<Get__T__ResDto> {
    const { id } = query;
    const __t__ = await this.__t__Repository.findOne({ where: { id } });

    if (!__t__) {
      throw new NotFoundException("__T__ not found");
    }

    return plainToInstance(Get__T__ResDto, __t__);
  }
}
