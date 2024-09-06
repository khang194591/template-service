import { GetTodoQueryHandler } from "./get-todo";
import { GetTodoListQueryHandler } from "./get-todo-list";

export * from "./get-todo";
export * from "./get-todo-list";

export const QueryHandlers = [GetTodoQueryHandler, GetTodoListQueryHandler];
