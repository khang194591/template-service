import { stringify } from "querystring";
import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { v4 } from "uuid";
import { TodoHelper } from "./helpers";

describe("TodoController", () => {
  let app: INestApplication;
  let server: App;

  let todoHelper: TodoHelper;

  let todoId: string;

  beforeAll(async () => {
    app = global.testContext.app;
    server = await app.getHttpServer();

    todoHelper = new TodoHelper();
  });

  beforeEach(async () => {
    todoId = faker.string.uuid();
  });

  describe("GET /todos", () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { status, body } = await request(server)
        .get("/todos")
        .query(stringify({ page: 1, pageSize: 10 }));

      expect(status).toBe(HttpStatus.OK);
      expect(body.total).toBe(1);
      expect(body.data.length).toBe(1);
      expect(body.data[0].id).toBe(todoId);
    });
  });

  describe("GET /todos/:id", () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { status, body } = await request(server).get(`/todos/${todoId}`);

      expect(status).toBe(HttpStatus.OK);
      expect(body.id).toBe(todoId);
    });

    it("Should fail when not found", async () => {
      const { status, body } = await request(server).get(`/todos/${v4()}`);

      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body.message).toBe("Todo not found");
    });
  });

  describe("POST /todos", () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { status, body } = await request(server).post("/todos/").send({});

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.id).toBeDefined();

      const todo = await todoHelper.getTodoById(body.id);
      expect(todo).toBeDefined();
    });
  });

  describe("PUT /todos/:id", () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { status } = await request(server).put(`/todos/${todoId}`).send({});

      expect(status).toBe(HttpStatus.OK);
    });

    it("Should fail when not found", async () => {
      const { status, body } = await request(server)
        .put(`/todos/${v4()}`)
        .send({});

      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body.message).toBe("Todo not found");
    });
  });

  describe("DELETE /todos/:id", () => {
    beforeEach(async () => {
      await todoHelper.createTodo({ id: todoId });
    });

    afterEach(async () => {
      await todoHelper.clear();
    });

    it("Should be success", async () => {
      const { status } = await request(server).delete(`/todos/${todoId}`);

      expect(status).toBe(HttpStatus.OK);
    });

    it("Should fail when not found", async () => {
      const { status, body } = await request(server).get(`/todos/${v4()}`);

      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body.message).toBe("Todo not found");
    });
  });
});
