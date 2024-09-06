import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import { GetTodoListQueryDto, GetTodoListResDto } from "../dtos";
import { Todo } from "../entities";
import { TodoService } from "../todo.service";

export class GetTodoListQuery {
  constructor(public readonly query: GetTodoListQueryDto) {}
}

@QueryHandler(GetTodoListQuery)
export class GetTodoListQueryHandler
  implements IQueryHandler<GetTodoListQuery>
{
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private readonly todoService: TodoService,
  ) {}

  async execute({ query }: GetTodoListQuery): Promise<GetTodoListResDto> {
    const { limit, offset } = query;

    const [items, total] = await this.todoRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: "DESC" },
    });

    return plainToInstance(GetTodoListResDto, { data: items, total });
  }
}
