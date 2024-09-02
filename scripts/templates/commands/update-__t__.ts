import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { __T__Service } from "../__t__.service";
import { Update__T__Dto, Update__T__ResDto } from "../dtos";
import { __T__ } from "../entities";

export class Update__T__Command {
  constructor(
    public readonly id: string,
    public readonly data: Update__T__Dto,
  ) {}
}

@CommandHandler(Update__T__Command)
export class Update__T__CommandHandler
  implements ICommandHandler<Update__T__Command>
{
  constructor(
    @InjectRepository(__T__)
    private readonly __t__Repository: Repository<__T__>,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute(command: Update__T__Command): Promise<Update__T__ResDto> {
    const { id, data } = command;

    const __t__ = await this.__t__Repository.findOne({ where: { id } });

    if (!__t__) {
      throw new NotFoundException("__T__ not found");
    }

    await this.__t__Repository.update(id, { ...__t__, ...data });

    return plainToInstance(Update__T__ResDto, { id });
  }
}
