// core
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// @nestjs
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// local
import { LoggerService } from '../logger.service';

// ----------------------------------------------------------------------------------------------------

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const start = Date.now();

    return next.handle().pipe(
      map((data) => {
        const end = Date.now();
        const net = end - start;
        const { statusCode: status } = response;
        const message = `${net} ms`;

        this.logger.info(message, {
          ip: request.ip,
          host: request.headers.host,
          path: request.path,
          httpMethod: request.method,
          httpStatus: status,
        });

        return data;
      }),
    );
  }
}
