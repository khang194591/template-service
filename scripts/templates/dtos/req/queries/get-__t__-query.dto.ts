import { IsUUID } from "class-validator";

export class Get__T__QueryDto {
  @IsUUID()
  id: string;
}
