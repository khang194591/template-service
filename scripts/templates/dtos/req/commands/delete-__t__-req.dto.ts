import { IsUUID } from "class-validator";

export class Delete__T__CmdDto {
  @IsUUID()
  id: string;
}
