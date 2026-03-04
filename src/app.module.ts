import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from './http';
import { LoggerModule } from './logger';
import { EnvVar } from './enums';
import { AppRepository } from './app.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailsModule } from './emails';
import { SrCardsModule } from './sr-cards/sr-cards.module';

@Module({
  imports: [
    // Schedule
    ScheduleModule.forRoot(),
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Logger
    LoggerModule,
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
    EmailsModule,
    SrCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
