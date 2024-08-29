import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";

describe("__T__Controller", () => {
  let app: INestApplication;
  let server: App;
  let __t__Id: string;

  beforeAll(async () => {
    app = global.testContext.app;
    server = await app.getHttpServer();
  });

  beforeEach(async () => {
    __t__Id = faker.string.uuid();
  });

  describe("GET /__s__", () => {
    it("Should be success", async () => {
      const { status } = await request(server).get("/__s__");

      expect(status).toBe(HttpStatus.OK);
    });
  });

  describe("GET /__s__/:id", () => {
    it("Should be success", async () => {
      const { status } = await request(server).get(`/__s__/${__t__Id}`);

      expect(status).toBe(HttpStatus.OK);
    });
  });

  describe("POST /__s__", () => {
    it("Should be success", async () => {
      const { status } = await request(server).post("/__s__/").send({});

      expect(status).toBe(HttpStatus.CREATED);
    });
  });

  describe("PUT /__s__/:id", () => {
    it("Should be success", async () => {
      const { status } = await request(server)
        .put(`/__s__/${__t__Id}`)
        .send({});

      expect(status).toBe(HttpStatus.OK);
    });
  });

  describe("DELETE /__s__/:id", () => {
    it("Should be success", async () => {
      const { status } = await request(server).delete(`/__s__/${__t__Id}`);

      expect(status).toBe(HttpStatus.OK);
    });
  });
});
