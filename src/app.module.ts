import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, LoggerModule } from './core';
import { EnvVar } from './enums';
import { AppRepository } from './app.repository';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Logger
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        logLevel: config.get<string>(EnvVar.LOG_LEVEL),
        logDirname: 'logs/client', // TODO: need to update in production
        logFilename: config.get<string>(EnvVar.LOG_FILENAME),
        logDateFormat: config.get<string>(EnvVar.LOG_DATE_FORMAT),
        logDatePattern: config.get<string>(EnvVar.LOG_DATE_PATTERN),
      }),
      inject: [ConfigService],
    }),
    // Http
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const timeout = +config.get<number>(EnvVar.HTTP_DEFAULT_TIMEOUT);
        return {
          timeout,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
