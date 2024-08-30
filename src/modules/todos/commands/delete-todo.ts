import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { DeleteTodoDto, DeleteTodoResDto } from "../dto";
import { TodoRepository } from "../todo.repository";
import { TodoService } from "../todo.service";

export class DeleteTodoCommand {
  constructor(public readonly data: DeleteTodoDto) {}
}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoCommandHandler
  implements ICommandHandler<DeleteTodoCommand>
{
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoService: TodoService,
  ) {}

  async execute({ data }: DeleteTodoCommand): Promise<DeleteTodoResDto> {
    console.log(data);

    return plainToInstance(DeleteTodoResDto, {});
  }
}
