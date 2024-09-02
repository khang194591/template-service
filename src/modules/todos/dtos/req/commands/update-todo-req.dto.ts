import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class UpdateTodoDto {}

export class UpdateTodoCmdDto {
  @IsUUID()
  id: string;

  @Type(() => UpdateTodoDto)
  data: UpdateTodoDto;
}
