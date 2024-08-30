import { CreateTodoCommandHandler } from "./create-todo";
import { DeleteTodoCommandHandler } from "./delete-todo";
import { UpdateTodoCommandHandler } from "./update-todo";

export * from "./create-todo";
export * from "./delete-todo";
export * from "./update-todo";

export const CommandHandlers = [
  CreateTodoCommandHandler,
  DeleteTodoCommandHandler,
  UpdateTodoCommandHandler,
];
