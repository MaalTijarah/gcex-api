import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVar } from './enums';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from "nestjs-pino";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<Logger>(Logger);

  const PORT = config.get<number>(EnvVar.HTTP_PORT) ?? 3000;

  app.enableCors();

  // Prefix
  app.setGlobalPrefix('api', { exclude: ['/'] });

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  await app.listen(PORT, () => {
    logger.log(`GCEX API SERVER RUNNING ON PORT ${PORT}...`);
  });
}

bootstrap();
