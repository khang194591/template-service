import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { GetTodoQueryDto, GetTodoResDto } from "../dto";
import { TodoRepository } from "../todo.repository";
import { TodoService } from "../todo.service";

export class GetTodoQuery {
  constructor(public readonly query: GetTodoQueryDto) {}
}

@QueryHandler(GetTodoQuery)
export class GetTodoQueryHandler implements IQueryHandler<GetTodoQuery> {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoService: TodoService,
  ) {}

  async execute({ query }: GetTodoQuery): Promise<GetTodoResDto> {
    console.log(query);

    return plainToInstance(GetTodoResDto, {});
  }
}
