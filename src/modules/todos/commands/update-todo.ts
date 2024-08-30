import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { UpdateTodoDto, UpdateTodoResDto } from "../dto";
import { TodoRepository } from "../todo.repository";
import { TodoService } from "../todo.service";

export class UpdateTodoCommand {
  constructor(public readonly data: UpdateTodoDto) {}
}

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoCommandHandler
  implements ICommandHandler<UpdateTodoCommand>
{
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoService: TodoService,
  ) {}

  async execute({ data }: UpdateTodoCommand): Promise<UpdateTodoResDto> {
    console.log(data);

    return plainToInstance(UpdateTodoResDto, {});
  }
}
