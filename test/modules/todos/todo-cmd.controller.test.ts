import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { microserviceRequest } from "src/libs/common";
import { v4 } from "uuid";
import { TodoHelper } from "./helpers";

const patterns = {
  create: "todo.create",
  update: "todo.update",
  getDetail: "todo.get-detail",
  getList: "todo.get-list",
  delete: "todo.delete",
};

describe("TodoCmdController", () => {
  let client: ClientProxy;

  let todoHelper: TodoHelper;

  let todoId: string;

  beforeAll(async () => {
    client = global.testContext.client;

    todoHelper = new TodoHelper();
  });

  beforeEach(async () => {
    todoId = v4();
  });

  describe(`Pattern ${patterns.getList}`, () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { success, data } = await lastValueFrom(
        client.send(patterns.getList, microserviceRequest({})),
      );

      expect(success).toBeTruthy();
      expect(data.total).toBe(1);
      expect(data.data.length).toBe(1);
      expect(data.data[0].id).toBe(todoId);
    });
  });

  describe(`Pattern ${patterns.getDetail}`, () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { success, data } = await lastValueFrom(
        client.send(patterns.getDetail, microserviceRequest({ id: todoId })),
      );

      expect(success).toBeTruthy();
      expect(data.id).toBe(todoId);
    });

    it("Should fail when not found", async () => {
      const { success, message } = await lastValueFrom(
        client.send(patterns.getDetail, microserviceRequest({ id: v4() })),
      );

      expect(success).toBeFalsy();
      expect(message).toBe("Todo not found");
    });
  });

  describe(`Pattern ${patterns.create}`, () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
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
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.update, microserviceRequest({ id: todoId })),
      );

      expect(success).toBeTruthy();
    });

    it("Should fail when not found", async () => {
      const { success, message } = await lastValueFrom(
        client.send(patterns.update, microserviceRequest({ id: v4() })),
      );

      expect(success).toBeFalsy();
      expect(message).toBe("Todo not found");
    });
  });

  describe(`Pattern ${patterns.delete}`, () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { success } = await lastValueFrom(
        client.send(patterns.delete, microserviceRequest({ id: todoId })),
      );

      expect(success).toBeTruthy();
    });

    it("Should fail when not found", async () => {
      const { success, message } = await lastValueFrom(
        client.send(patterns.delete, microserviceRequest({ id: v4() })),
      );

      expect(success).toBeFalsy();
      expect(message).toBe("Todo not found");
    });
  });
});
