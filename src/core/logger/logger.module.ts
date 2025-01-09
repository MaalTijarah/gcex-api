// @nestjs
import { Module, DynamicModule, Global } from '@nestjs/common';
// local
import { LoggerService } from './logger.service';
import {
  LoggerConfigOptions,
  LoggerAsyncConfigOptions,
  LOGGER_CONFIG_OPTIONS,
} from './interfaces';

// ----------------------------------------------------------------------------------------------------
@Module({})
export class LoggerModule {
  static forRoot(loggerConfigOptions: LoggerConfigOptions): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [
        {
          provide: LOGGER_CONFIG_OPTIONS,
          useValue: loggerConfigOptions,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }

  static forRootAsync(loggerAsyncConfigOptions: LoggerAsyncConfigOptions): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      imports: loggerAsyncConfigOptions.imports,
      providers: [
        {
          provide: LOGGER_CONFIG_OPTIONS,
          useFactory: loggerAsyncConfigOptions.useFactory,
          inject: loggerAsyncConfigOptions.inject,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
