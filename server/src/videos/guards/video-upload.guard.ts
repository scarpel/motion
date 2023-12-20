import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TVideoDocument, Video } from '../schemas/video.schema';
import { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export default class VideoUploadGuard implements CanActivate {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<TVideoDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const { videoId } = req.params;

    const video = await this.videoModel.findById(videoId);

    return !video;
  }
}
