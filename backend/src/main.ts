import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ensureDatabaseExists} from "./config/sequelize.config";

async function bootstrap() {
  await ensureDatabaseExists();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow credentials (cookies, etc.)
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
