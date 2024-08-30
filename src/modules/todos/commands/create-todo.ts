import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { CreateTodoDto, CreateTodoResDto } from "../dto";
import { TodoRepository } from "../todo.repository";
import { TodoService } from "../todo.service";

export class CreateTodoCommand {
  constructor(public readonly data: CreateTodoDto) {}
}

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand>
{
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoService: TodoService,
  ) {}

  async execute({ data }: CreateTodoCommand): Promise<CreateTodoResDto> {
    console.log(data);

    return plainToInstance(CreateTodoResDto, {});
  }
}
