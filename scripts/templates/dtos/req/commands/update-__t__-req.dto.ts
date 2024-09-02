import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class Update__T__Dto {}

export class Update__T__CmdDto {
  @IsUUID()
  id: string;

  @Type(() => Update__T__Dto)
  data: Update__T__Dto;
}
