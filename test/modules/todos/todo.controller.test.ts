import { stringify } from "querystring";
import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";

describe("TodoController", () => {
  let app: INestApplication;
  let server: App;
  let todoId: string;

  beforeAll(async () => {
    app = global.testContext.app;
    server = await app.getHttpServer();
  });

  beforeEach(async () => {
    todoId = faker.string.uuid();
  });

  describe("GET /todos", () => {
    it("Should be success", async () => {
      const { status } = await request(server)
        .get("/todos")
        .query(stringify({ page: 1, pageSize: 10 }));

      expect(status).toBe(HttpStatus.OK);
    });
  });

  describe("GET /todos/:id", () => {
    it("Should be success", async () => {
      const { status } = await request(server).get(`/todos/${todoId}`);

      expect(status).toBe(HttpStatus.OK);
    });
  });

  describe("POST /todos", () => {
    it("Should be success", async () => {
      const { status } = await request(server).post("/todos/").send({});

      expect(status).toBe(HttpStatus.CREATED);
    });
  });

  describe("PUT /todos/:id", () => {
    it("Should be success", async () => {
      const { status } = await request(server).put(`/todos/${todoId}`).send({});

      expect(status).toBe(HttpStatus.OK);
    });
  });

  describe("DELETE /todos/:id", () => {
    it("Should be success", async () => {
      const { status } = await request(server).delete(`/todos/${todoId}`);

      expect(status).toBe(HttpStatus.OK);
    });
  });
});
