import { plainToInstance } from 'class-transformer';
// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// @nestjs
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
// @app
import { ResponseStatus } from 'src/enums';
import { Constructable } from 'src/interfaces';

// ----------------------------------------------------------------------------------------------------

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: Constructable) {}

  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        const result = response instanceof Array ? response.length : undefined;
        const accessToken = response?.accessToken;
        const refreshToken = response?.refreshToken;
        const faceAccessToken = response?.faceAccessToken;
        const proAccessToken = response?.proAccessToken;

        const message = response?.message;

        const data =
          response &&
          (plainToInstance(this.dto, response, {
            excludeExtraneousValues: true,
          }) as any);

        if (data?.message) {
          delete data.message;
        }

        if (data?.refreshToken) {
          delete data.refreshToken;
        }

        if (data?.faceAccessToken) {
          delete data.faceAccessToken;
        }

        if (data?.proAccessToken) {
          delete data.proAccessToken;
        }

        return {
          status: ResponseStatus.SUCCESS,
          accessToken,
          refreshToken,
          faceAccessToken,
          proAccessToken,
          message,
          result,
          data,
        };
      }),
    );
  }
}
