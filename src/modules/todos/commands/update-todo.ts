import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { UpdateTodoDto, UpdateTodoResDto } from "../dtos";
import { Todo } from "../entities";
import { TodoService } from "../todo.service";

export class UpdateTodoCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateTodoDto,
  ) {}
}

@CommandHandler(UpdateTodoCommand)
export class UpdateTodoCommandHandler
  implements ICommandHandler<UpdateTodoCommand>
{
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly todoService: TodoService,
  ) {}

  async execute(command: UpdateTodoCommand): Promise<UpdateTodoResDto> {
    const { id, data } = command;

    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException("Todo not found");
    }

    await this.todoRepository.update(id, { ...todo, ...data });

    return plainToInstance(UpdateTodoResDto, { id });
  }
}
