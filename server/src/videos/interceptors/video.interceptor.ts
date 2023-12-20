import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { TVideoDocument, Video } from '../schemas/video.schema';
import { InjectModel } from '@nestjs/mongoose';

export type TRequestWithVideo = Request & { video: TVideoDocument };

export class VideoInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<TVideoDocument>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest() as TRequestWithVideo;

    const { videoId } = req.params;

    const video = await this.videoModel.findById(videoId).catch(() => null);

    if (!video) throw new NotFoundException('Video not found!');

    req.video = video;

    return next.handle();
  }
}
