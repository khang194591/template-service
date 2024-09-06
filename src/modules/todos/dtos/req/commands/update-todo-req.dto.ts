import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class UpdateTodoDto {}

export class UpdateTodoCmdDto {
  @IsUUID()
  id: string = "886bd7f2-8175-462c-8ca4-c488a991f41c";

  @Type(() => UpdateTodoDto)
  data: UpdateTodoDto;
}
