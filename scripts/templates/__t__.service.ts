import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { __T__ } from "./entities";

@Injectable()
export class __T__Service {
  constructor(
    @InjectRepository(__T__)
    private readonly __t__Repository: Repository<__T__>,
  ) {}
}
