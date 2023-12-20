import ResponseError from '@errors/ResponseError';
import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export async function handleRequest<T>(handler: () => Promise<T>) {
  try {
    return await handler();
  } catch (err) {
    Logger.error('Error while removing comment from video', err);

    if (err instanceof ResponseError)
      throw new HttpException(err.message, err.statusCode);

    throw new InternalServerErrorException();
  }
}
