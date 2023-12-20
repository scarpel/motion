import ResponseError from '@errors/ResponseError';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

export default class HttpRequestInterceptor implements NestInterceptor {
  constructor(private readonly logMessage: string = 'Error on request') {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        Logger.error(this.logMessage, err);

        if (err.name === 'BadRequestException') return throwError(() => err);

        return throwError(() =>
          err instanceof ResponseError
            ? new HttpException(err.message, err.statusCode)
            : new InternalServerErrorException(err.message),
        );
      }),
    );
  }
}
