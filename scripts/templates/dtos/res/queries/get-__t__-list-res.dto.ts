import { IPaginationResDto } from "@shared/common";
import { Type } from "class-transformer";

export class Get__T__ListItemDto {
  id: string = "886bd7f2-8175-462c-8ca4-c488a991f41c";
}

export class Get__T__ListResDto implements IPaginationResDto {
  @Type(() => Get__T__ListItemDto)
  data: Get__T__ListItemDto[];

  @Type(() => Number)
  total: number;
}
