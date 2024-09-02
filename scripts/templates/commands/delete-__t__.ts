import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { __T__Service } from "../__t__.service";
import { Delete__T__ResDto } from "../dtos";
import { __T__ } from "../entities";

export class Delete__T__Command {
  constructor(public readonly id: string) {}
}

@CommandHandler(Delete__T__Command)
export class Delete__T__CommandHandler
  implements ICommandHandler<Delete__T__Command>
{
  constructor(
    @InjectRepository(__T__)
    private readonly __t__Repository: Repository<__T__>,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute(command: Delete__T__Command): Promise<Delete__T__ResDto> {
    const { id } = command;

    const __t__ = await this.__t__Repository.findOne({ where: { id } });

    if (!__t__) {
      throw new NotFoundException("__T__ not found");
    }

    await this.__t__Repository.delete({ id });

    return plainToInstance(Delete__T__ResDto, { id });
  }
}
