// @nestjs
import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

// ----------------------------------------------------------------------------------------------------

export const LOGGER_CONFIG_OPTIONS = 'LOGGER_CONFIG_OPTIONS';

// ----------------------------------------------------------------------------------------------------

export interface LoggerConfigOptions {
  logLevel: string;
  logDirname: string;
  logFilename: string;
  logDateFormat: string;
  logDatePattern: string;
}

export type LoggerAsyncConfigOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<LoggerConfigOptions>, 'useFactory' | 'inject'>;
