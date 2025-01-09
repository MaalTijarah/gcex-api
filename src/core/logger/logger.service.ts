// core
import * as winston from 'winston';
import 'winston-daily-rotate-file';
// @nestjs
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
// local
import { LoggerConfigOptions, LOGGER_CONFIG_OPTIONS } from './interfaces';
import { LogLevel } from './enums';

// ----------------------------------------------------------------------------------------------------

interface LoggerContext {
  ip: string;
  host: string;
  path: string;
  httpMethod: string;
  httpStatus: HttpStatus;
}

// ----------------------------------------------------------------------------------------------------

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(
    @Inject(LOGGER_CONFIG_OPTIONS)
    protected readonly loggerConfigOptions: LoggerConfigOptions,
  ) {
    this.init();
  }

  private init() {
    const { logLevel, logDirname, logDateFormat, logFilename, logDatePattern } =
      this.loggerConfigOptions;

    const { combine, timestamp, align, simple, printf, colorize, errors } =
      winston.format;

    this.logger = winston.createLogger({
      level: logLevel || LogLevel.INFO,
      format: combine(
        timestamp({ format: logDateFormat }),
        align(),
        simple(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
        errors({ stack: true }),
      ),

      transports: [
        new winston.transports.Console({
          format: combine(colorize({ all: true }), errors({ stack: true })),
        }),
        new winston.transports.DailyRotateFile({
          dirname: `${logDirname}/${LogLevel.INFO}`,
          filename: logFilename,
          datePattern: logDatePattern,
          level: LogLevel.INFO,
          zippedArchive: true,
          format: combine(
            winston.format((info, opts) => {
              return info.level === LogLevel.INFO ? info : false;
            })(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          dirname: `${logDirname}/${LogLevel.ERROR}`,
          filename: logFilename,
          datePattern: logDatePattern,
          level: LogLevel.ERROR,
          zippedArchive: true,
        }),
      ],
    });
  }

  private generateLoggerMessage(
    message: string,
    loggerContext?: LoggerContext,
  ): string {
    let loggerMessage = message;

    if (loggerContext) {
      const { ip, host, path, httpMethod, httpStatus } = loggerContext;
      loggerMessage = `${ip} ${host} ${httpMethod} ${path} ${httpStatus} ${message}`;
    }

    return loggerMessage;
  }

  info(message: string, loggerContext?: LoggerContext): void {
    const loggerMessage = this.generateLoggerMessage(message, loggerContext);

    this.logger.info(loggerMessage);
  }

  error(message: string, loggerContext?: LoggerContext): void {
    const loggerMessage = this.generateLoggerMessage(message, loggerContext);

    this.logger.error(message);
  }
}
