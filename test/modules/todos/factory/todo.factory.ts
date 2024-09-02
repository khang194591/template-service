import { v4 } from "uuid";
import { Todo } from "../../../../src/modules/todos";

export const fakeTodo = (override?: Partial<Todo>): Todo => ({
  id: v4(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...override,
});
