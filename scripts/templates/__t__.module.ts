import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { __T__CmdController } from "./__t__-cmd.controller";
import { __T__Controller } from "./__t__.controller";
import { __T__Service } from "./__t__.service";
import { CommandHandlers } from "./commands";
import { __T__ } from "./entities";
import { QueryHandlers } from "./queries";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([__T__])],
  controllers: [
    __T__Controller,
    __T__CmdController,
    /** comment */
  ],
  providers: [__T__Service, ...CommandHandlers, ...QueryHandlers],
  exports: [],
})
export class __T__Module {}
