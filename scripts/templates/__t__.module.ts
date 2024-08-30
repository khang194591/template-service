import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { __T__CmdController } from "./__t__-cmd.controller";
import { __T__Controller } from "./__t__.controller";
import { __T__Repository } from "./__t__.repository";
import { __T__Service } from "./__t__.service";
import { CommandHandlers } from "./commands";
import { QueryHandlers } from "./queries";

@Module({
  imports: [CqrsModule],
  controllers: [
    __T__Controller,
    __T__CmdController,
    /** comment */
  ],
  providers: [
    __T__Repository,
    __T__Service,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class __T__Module {}
