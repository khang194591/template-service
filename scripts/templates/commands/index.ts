import { Create__T__CommandHandler } from "./create-__t__";
import { Delete__T__CommandHandler } from "./delete-__t__";
import { Update__T__CommandHandler } from "./update-__t__";

export * from "./create-__t__";
export * from "./delete-__t__";
export * from "./update-__t__";

export const CommandHandlers = [
  Create__T__CommandHandler,
  Delete__T__CommandHandler,
  Update__T__CommandHandler,
];
