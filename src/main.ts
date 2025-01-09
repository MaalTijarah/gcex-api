import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVar } from './enums';
import { LoggerService } from './core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<LoggerService>(LoggerService);

  const PORT = config.get<number>(EnvVar.HTTP_PORT) ?? 3000;

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
