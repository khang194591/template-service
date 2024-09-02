import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { __T__Service } from "../__t__.service";
import { Create__T__Dto, Create__T__ResDto } from "../dtos";
import { __T__ } from "../entities";

export class Create__T__Command {
  constructor(public readonly data: Create__T__Dto) {}
}

@CommandHandler(Create__T__Command)
export class Create__T__CommandHandler
  implements ICommandHandler<Create__T__Command>
{
  constructor(
    @InjectRepository(__T__)
    private readonly __t__Repository: Repository<__T__>,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute(command: Create__T__Command): Promise<Create__T__ResDto> {
    const { data } = command;

    const __t__ = await this.__t__Repository.save(data);

    return plainToInstance(Create__T__ResDto, { id: __t__.id });
  }
}
