import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { TRequestWithVideo } from '../interceptors/video.interceptor';

export const Video = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest() as TRequestWithVideo;
    return req.video;
  },
);
