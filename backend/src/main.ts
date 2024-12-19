import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ensureDatabaseExists} from "./config/sequelize.config";

async function bootstrap() {
  await ensureDatabaseExists();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
