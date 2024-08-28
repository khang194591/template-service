import { CreateTemplateCommandHandler } from "./create-template";
import { UpdateTemplateCommandHandler } from "./update-template";

export * from "./create-template";
export * from "./update-template";

export const commands = [
  CreateTemplateCommandHandler,
  UpdateTemplateCommandHandler,
];
