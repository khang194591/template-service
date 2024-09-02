import { IsUUID } from "class-validator";

export class GetTodoQueryDto {
  @IsUUID()
  id: string;
}
