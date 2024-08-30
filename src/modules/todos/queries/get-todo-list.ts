import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { plainToInstance } from "class-transformer";
import { GetTodoListQueryDto, GetTodoListResDto } from "../dto";
import { TodoRepository } from "../todo.repository";
import { TodoService } from "../todo.service";

export class GetTodoListQuery {
  constructor(public readonly query: GetTodoListQueryDto) {}
}

@QueryHandler(GetTodoListQuery)
export class GetTodoListQueryHandler
  implements IQueryHandler<GetTodoListQuery>
{
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoService: TodoService,
  ) {}

  async execute({ query }: GetTodoListQuery): Promise<GetTodoListResDto> {
    console.log(query);

    return plainToInstance(GetTodoListResDto, { data: [], total: 0 });
  }
}
