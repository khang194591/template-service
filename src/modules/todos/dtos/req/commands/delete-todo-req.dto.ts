import { IsUUID } from "class-validator";

export class DeleteTodoCmdDto {
  @IsUUID()
  id: string;
}
