import { IPaginationResDto } from "@shared/common";
import { Type } from "class-transformer";

export class GetTodoListItemDto {
  id: string = "886bd7f2-8175-462c-8ca4-c488a991f41c";
}

export class GetTodoListResDto implements IPaginationResDto {
  @Type(() => GetTodoListItemDto)
  data: GetTodoListItemDto[];

  @Type(() => Number)
  total: number;
}
