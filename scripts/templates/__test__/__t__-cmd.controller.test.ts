import { faker } from "@faker-js/faker";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

const patterns = {
  create: "__t__.create",
  update: "__t__.update",
  getDetail: "__t__.get-detail",
  getList: "__t__.get-list",
  delete: "__t__.delete",
};

describe("__T__CmdController", () => {
  let client: ClientProxy;
  let __t__Id: string;

  beforeAll(async () => {
    client = global.testContext.client;
  });

  beforeEach(async () => {
    __t__Id = faker.string.uuid();
  });

  describe(`Pattern ${patterns.getList}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.getList, {}),
      );

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.getDetail}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.getDetail, {}),
      );

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.create}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(client.send(patterns.create, {}));

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.update}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(client.send(patterns.update, {}));

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.delete}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(client.send(patterns.delete, {}));

      expect(success).toBeTruthy();
    });
  });
});
