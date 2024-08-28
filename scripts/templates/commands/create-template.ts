import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTemplateRequest, CreateTemplateResponse } from "../dto";

export class CreateTemplateCommand {
  constructor(public readonly data: CreateTemplateRequest) {}
}

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateCommandHandler
  implements ICommandHandler<CreateTemplateCommand>
{
  constructor() {}

  async execute({
    data,
  }: CreateTemplateCommand): Promise<CreateTemplateResponse> {
    return {};
  }
}
