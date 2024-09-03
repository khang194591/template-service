import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { microserviceRequest } from "src/libs/common";
import { v4 } from "uuid";
import { __T__Helper } from "./helpers";

const patterns = {
  create: "__t__.create",
  update: "__t__.update",
  getDetail: "__t__.get-detail",
  getList: "__t__.get-list",
  delete: "__t__.delete",
};

describe("__T__CmdController", () => {
  let client: ClientProxy;

  let __t__Helper: __T__Helper;

  let __t__Id: string;

  beforeAll(async () => {
    client = global.testContext.client;

    __t__Helper = new __T__Helper();
  });

  beforeEach(async () => {
    __t__Id = v4();
  });

  describe(`Pattern ${patterns.getList}`, () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { success, data } = await lastValueFrom(
        client.send(patterns.getList, microserviceRequest({})),
      );

      expect(success).toBeTruthy();
      expect(data.total).toBe(1);
      expect(data.data.length).toBe(1);
      expect(data.data[0].id).toBe(__t__Id);
    });
  });

  describe(`Pattern ${patterns.getDetail}`, () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { success, data } = await lastValueFrom(
        client.send(patterns.getDetail, microserviceRequest({ id: __t__Id })),
      );

      expect(success).toBeTruthy();
      expect(data.id).toBe(__t__Id);
    });

    it("Should fail when not found", async () => {
      const { success, message } = await lastValueFrom(
        client.send(patterns.getDetail, microserviceRequest({ id: v4() })),
      );

      expect(success).toBeFalsy();
      expect(message).toBe("__T__ not found");
    });
  });

  describe(`Pattern ${patterns.create}`, () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.create, microserviceRequest({})),
      );

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.update}`, () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.update, microserviceRequest({ id: __t__Id })),
      );

      expect(success).toBeTruthy();
    });

    it("Should fail when not found", async () => {
      const { success, message } = await lastValueFrom(
        client.send(patterns.update, microserviceRequest({ id: v4() })),
      );

      expect(success).toBeFalsy();
      expect(message).toBe("__T__ not found");
    });
  });

  describe(`Pattern ${patterns.delete}`, () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.delete, microserviceRequest({ id: __t__Id })),
      );

      expect(success).toBeTruthy();
    });

    it("Should fail when not found", async () => {
      const { success, message } = await lastValueFrom(
        client.send(patterns.delete, microserviceRequest({ id: v4() })),
      );

      expect(success).toBeFalsy();
      expect(message).toBe("__T__ not found");
    });
  });
});
