import { IPaginationResDto } from "@shared/common";
import { Type } from "class-transformer";

class GetTodoListItemDto {
  id: string;
}

export class GetTodoListResDto implements IPaginationResDto {
  @Type(() => GetTodoListItemDto)
  data: GetTodoListItemDto[];

  @Type(() => Number)
  total: number;
}
