import { DataSource, Repository } from "typeorm";
import { Todo } from "../../../../src/modules/todos";
import { fakeTodo } from "../factory";

export class TodoHelper {
  private datasource: DataSource;
  private todoRepository: Repository<Todo>;
  constructor() {
    this.datasource = global.testContext.app.get(DataSource);
    this.todoRepository = this.datasource.getRepository(Todo);
  }

  async createTodo(override?: Partial<Todo>) {
    const todo = await this.todoRepository.save(fakeTodo(override));

    return todo;
  }

  async createTodos(items: Partial<Todo>[]) {
    const todos = await this.todoRepository.save(items.map(fakeTodo));

    return todos;
  }

  async getTodoById(id: string) {
    return this.todoRepository.findOneBy({ id });
  }

  async clear() {
    await this.todoRepository.delete({});
  }
}
