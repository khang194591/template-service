import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { __T__Repository } from "../__t__.repository";
import { __T__Service } from "../__t__.service";
import { Update__T__Dto, Update__T__ResDto } from "../dto";

export class Update__T__Command {
  constructor(public readonly data: Update__T__Dto) {}
}

@CommandHandler(Update__T__Command)
export class Update__T__CommandHandler
  implements ICommandHandler<Update__T__Command>
{
  constructor(
    private readonly __t__Repository: __T__Repository,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute({ data }: Update__T__Command): Promise<Update__T__ResDto> {
    console.log(data);

    return plainToInstance(Update__T__ResDto, {});
  }
}
