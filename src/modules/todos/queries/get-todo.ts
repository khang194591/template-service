import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { GetTodoResDto } from "../dtos";
import { Todo } from "../entities";
import { TodoService } from "../todo.service";

export class GetTodoQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetTodoQuery)
export class GetTodoQueryHandler implements IQueryHandler<GetTodoQuery> {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly todoService: TodoService,
  ) {}

  async execute(query: GetTodoQuery): Promise<GetTodoResDto> {
    const { id } = query;
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException("Todo not found");
    }

    return plainToInstance(GetTodoResDto, todo);
  }
}
