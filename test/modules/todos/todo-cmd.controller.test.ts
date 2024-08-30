import { faker } from "@faker-js/faker";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { microserviceRequest } from "src/libs/common";

const patterns = {
  create: "todo.create",
  update: "todo.update",
  getDetail: "todo.get-detail",
  getList: "todo.get-list",
  delete: "todo.delete",
};

describe("TodoCmdController", () => {
  let client: ClientProxy;
  let todoId: string;

  beforeAll(async () => {
    client = global.testContext.client;
  });

  beforeEach(async () => {
    todoId = faker.string.uuid();
  });

  describe(`Pattern ${patterns.getList}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.getList, microserviceRequest({})),
      );

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.getDetail}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.getDetail, microserviceRequest({ id: todoId })),
      );

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.create}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.create, microserviceRequest({})),
      );

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.update}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.update, microserviceRequest({ id: todoId })),
      );

      expect(success).toBeTruthy();
    });
  });

  describe(`Pattern ${patterns.delete}`, () => {
    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.delete, microserviceRequest({ id: todoId })),
      );

      expect(success).toBeTruthy();
    });
  });
});
