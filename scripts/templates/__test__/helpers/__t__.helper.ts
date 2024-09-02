import { DataSource, Repository } from "typeorm";
import { __T__ } from "../../../../src/modules/__s__";
import { fake__T__ } from "../factory";

export class __T__Helper {
  private datasource: DataSource;
  private __t__Repository: Repository<__T__>;
  constructor() {
    this.datasource = global.testContext.app.get(DataSource);
    this.__t__Repository = this.datasource.getRepository(__T__);
  }

  async create__T__(override?: Partial<__T__>) {
    const __t__ = await this.__t__Repository.save(fake__T__(override));

    return __t__;
  }

  async create__S__(items: Partial<__T__>[]) {
    const __s__ = await this.__t__Repository.save(items.map(fake__T__));

    return __s__;
  }

  async get__T__ById(id: string) {
    return this.__t__Repository.findOneBy({ id });
  }

  async clear() {
    await this.__t__Repository.delete({});
  }
}
