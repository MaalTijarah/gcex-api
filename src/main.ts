import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVar } from './common';
import { LoggerService } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);
  const logger = app.get<LoggerService>(LoggerService);

  const PORT = config.get<number>(EnvVar.HTTP_PORT) ?? 3000;

  await app.listen(PORT, () => {
    logger.info(`GCEX API SERVER RUNNING ON PORT ${PORT}...`);
  });
}
bootstrap();
