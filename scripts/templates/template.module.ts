import { Module } from "@nestjs/common";
import { commands } from "./commands";

@Module({
  imports: [...commands],
  controllers: [],
  providers: [],
  exports: [],
})
export class TemplateModule {}
