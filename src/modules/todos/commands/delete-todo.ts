import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { DeleteTodoResDto } from "../dtos";
import { Todo } from "../entities";
import { TodoService } from "../todo.service";

export class DeleteTodoCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteTodoCommand)
export class DeleteTodoCommandHandler
  implements ICommandHandler<DeleteTodoCommand>
{
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly todoService: TodoService,
  ) {}

  async execute(command: DeleteTodoCommand): Promise<DeleteTodoResDto> {
    const { id } = command;

    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException("Todo not found");
    }

    await this.todoRepository.delete({ id });

    return plainToInstance(DeleteTodoResDto, { id });
  }
}
