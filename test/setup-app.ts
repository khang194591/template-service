import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from "@nestjs/microservices";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";

export interface ITestContext {
  app: INestApplication;
  module: TestingModule;
  client: ClientProxy;
}

declare global {
  var testContext: ITestContext;
}

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: "microservices",
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.NATS,
            options: { servers: [config.getOrThrow("NATS_URL")] },
          });
        },
      },
    ],
  }).compile();

  const testApp: INestApplication = moduleFixture.createNestApplication();

  testApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const natsMicroserviceOptions = testApp
    .get(ConfigService)
    .get("microservices");

  testApp.connectMicroservice(natsMicroserviceOptions);

  testApp.startAllMicroservices();

  testApp.startAllMicroservices();
  await testApp.init();

  await testApp.listen(0);

  const testClient: ClientProxy = testApp.get("microservices");
  await testClient.connect();

  global.testContext = {
    app: testApp,
    module: moduleFixture,
    client: testClient,
  };
});

afterAll(async () => {
  if (global.testContext) {
    await global.testContext.app.close();
  }
});
