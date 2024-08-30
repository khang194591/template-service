import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { __T__Repository } from "../__t__.repository";
import { __T__Service } from "../__t__.service";
import { Delete__T__Dto, Delete__T__ResDto } from "../dto";

export class Delete__T__Command {
  constructor(public readonly data: Delete__T__Dto) {}
}

@CommandHandler(Delete__T__Command)
export class Delete__T__CommandHandler
  implements ICommandHandler<Delete__T__Command>
{
  constructor(
    private readonly __t__Repository: __T__Repository,
    private readonly __t__Service: __T__Service,
  ) {}

  async execute({ data }: Delete__T__Command): Promise<Delete__T__ResDto> {
    console.log(data);

    return plainToInstance(Delete__T__ResDto, {});
  }
}
