import { stringify } from "querystring";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { v4 } from "uuid";
import { __T__Helper } from "./helpers";

describe("__T__Controller", () => {
  let app: INestApplication;
  let server: App;

  let __t__Helper: __T__Helper;

  let __t__Id: string;

  beforeAll(async () => {
    app = global.testContext.app;
    server = await app.getHttpServer();

    __t__Helper = new __T__Helper();
  });

  beforeEach(async () => {
    __t__Id = v4();
  });

  describe("GET /__s__", () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { status, body } = await request(server)
        .get("/__s__")
        .query(stringify({ page: 1, pageSize: 10 }));

      expect(status).toBe(HttpStatus.OK);
      expect(body.total).toBe(1);
      expect(body.data.length).toBe(1);
      expect(body.data[0].id).toBe(__t__Id);
    });
  });

  describe("GET /__s__/:id", () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { status, body } = await request(server).get(`/__s__/${__t__Id}`);

      expect(status).toBe(HttpStatus.OK);
      expect(body.id).toBe(__t__Id);
    });

    it("Should fail when not found", async () => {
      const { status, body } = await request(server).get(`/__s__/${v4()}`);

      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body.message).toBe("__T__ not found");
    });
  });

  describe("POST /__s__", () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { status, body } = await request(server).post("/__s__/").send({});

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.id).toBeDefined();

      const __t__ = await __t__Helper.get__T__ById(body.id);
      expect(__t__).toBeDefined();
    });
  });

  describe("PUT /__s__/:id", () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { status } = await request(server)
        .put(`/__s__/${__t__Id}`)
        .send({});

      expect(status).toBe(HttpStatus.OK);
    });

    it("Should fail when not found", async () => {
      const { status, body } = await request(server)
        .put(`/__s__/${v4()}`)
        .send({});

      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body.message).toBe("__T__ not found");
    });
  });

  describe("DELETE /__s__/:id", () => {
    beforeEach(async () => {
      await __t__Helper.create__T__({ id: __t__Id });
    });

    afterEach(async () => {
      await __t__Helper.clear();
    });

    it("Should be success", async () => {
      const { status } = await request(server).delete(`/__s__/${__t__Id}`);

      expect(status).toBe(HttpStatus.OK);
    });

    it("Should fail when not found", async () => {
      const { status, body } = await request(server).get(`/__s__/${v4()}`);

      expect(status).toBe(HttpStatus.NOT_FOUND);
      expect(body.message).toBe("__T__ not found");
    });
  });
});
