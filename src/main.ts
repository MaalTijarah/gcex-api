import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVar } from './enums';
import { LoggerService } from './core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<LoggerService>(LoggerService);

  const PORT = config.get<number>(EnvVar.HTTP_PORT) ?? 3000;

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
    logger.info(`GCEX API SERVER RUNNING ON PORT ${PORT}...`);
  });
}

bootstrap();
