import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTemplateRequest, UpdateTemplateResponse } from "../dto";

export class UpdateTemplateCommand {
  constructor(public readonly data: UpdateTemplateRequest) {}
}

@CommandHandler(UpdateTemplateCommand)
export class UpdateTemplateCommandHandler
  implements ICommandHandler<UpdateTemplateCommand>
{
  constructor() {}

  async execute({
    data,
  }: UpdateTemplateCommand): Promise<UpdateTemplateResponse> {
    return {};
  }
}
