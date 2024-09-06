import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { CreateTodoDto, CreateTodoResDto } from "../dtos";
import { Todo } from "../entities";
import { TodoService } from "../todo.service";

export class CreateTodoCommand {
  constructor(public readonly data: CreateTodoDto) {}
}

@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand>
{
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly todoService: TodoService,
  ) {}

  async execute(command: CreateTodoCommand): Promise<CreateTodoResDto> {
    const { data } = command;

    const todo = await this.todoRepository.save(data);

    return plainToInstance(CreateTodoResDto, { id: todo.id });
  }
}
