import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class Update__T__Dto {}

export class Update__T__CmdDto {
  @IsUUID()
  id: string = "886bd7f2-8175-462c-8ca4-c488a991f41c";

  @Type(() => Update__T__Dto)
  data: Update__T__Dto;
}
