import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { __T__Repository } from "../__t__.repository";
import { __T__Service } from "../__t__.service";
import { Create__T__Dto, Create__T__ResDto } from "../dto";

export class Create__T__Command {
  constructor(public readonly data: Create__T__Dto) {}
}

@CommandHandler(Create__T__Command)
export class Create__T__CommandHandler
  implements ICommandHandler<Create__T__Command>
{
  constructor(
    private readonly __t__Repository: __T__Repository,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute({ data }: Create__T__Command): Promise<Create__T__ResDto> {
    console.log(data);

    return plainToInstance(Create__T__ResDto, {});
  }
}
