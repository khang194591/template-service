import { IPaginationResDto } from "@shared/common";
import { Type } from "class-transformer";

class Get__T__ListItemDto {
  id: string;
}

export class Get__T__ListResDto implements IPaginationResDto {
  @Type(() => Get__T__ListItemDto)
  data: Get__T__ListItemDto[];

  @Type(() => Number)
  total: number;
}
