import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { Types } from 'mongoose';
import VideoUploadGuard from './guards/video-upload.guard';
import UpdateVideoDto from './dtos/update-video.dto';
import { VideoInterceptor } from './interceptors/video.interceptor';
import { Video } from './decorators/video.decorator';
import { TVideoDocument } from './schemas/video.schema';
import { Response as TResponse } from 'express';
import { createReadStream } from 'node:fs';
import { getThumbnailPipeBuilder } from './videos.pipe';
import CreateCommentDto from './dtos/create-comment.dto';
import HttpRequestInterceptor from '@interceptors/http-request.interceptor';
import { TCommentVote } from './videos.types';
import GetCommentsDto from './dtos/get-comments.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getVideos() {
    return this.videosService.getPublishedVideos();
  }

  @Get('new')
  generateVideoId() {
    return new Types.ObjectId();
  }

  @Get('/:videoId')
  @UseInterceptors(VideoInterceptor)
  getVideo(@Video() video: TVideoDocument) {
    return video;
  }

  @Get('/:videoId/stream')
  @UseInterceptors(VideoInterceptor)
  streamVideo(
    @Video() video: TVideoDocument,
    @Headers('range') range: string,
    @Response() res: TResponse,
  ) {
    if (!range) throw new BadRequestException('Range is required!');

    const { start, end, contentLength, filePath, mimeType, size } =
      this.videosService.getVideoStreamInfo(video, range);

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': mimeType,
    };

    res.writeHead(206, headers);

    const videoStream = createReadStream(filePath, { start, end });
    videoStream.pipe(res);
  }

  @Post('/:videoId')
  @UseGuards(VideoUploadGuard)
  @UseInterceptors(FileInterceptor('video'))
  uploadVideo(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1000 * 1000 * 1000 * 10 })
        .addFileTypeValidator({ fileType: 'video/mp4' })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    video: Express.Multer.File,
    @Param('videoId') videoId: string,
  ) {
    return this.videosService.storeVideo(videoId, video);
  }

  @Patch('/:videoId')
  @UseInterceptors(VideoInterceptor)
  @UseInterceptors(FileInterceptor('thumbnail'))
  async updateVideo(
    @Video() video: TVideoDocument,
    @Body() body: UpdateVideoDto,
    @UploadedFile(getThumbnailPipeBuilder()) thumbnail: Express.Multer.File,
  ) {
    try {
      if (thumbnail)
        await this.videosService.uploadVideoThumbnail(video, thumbnail);

      return this.videosService.updateVideoMetadata(video, body);
    } catch (err) {
      if (!(err instanceof HttpException)) {
        Logger.error('Unable to update video', err);
      }

      throw err;
    }
  }

  @Post('/:videoId/thumbnail')
  @UseInterceptors(VideoInterceptor)
  @UseInterceptors(FileInterceptor('thumbnail'))
  changeVideoThumbnail(
    @Video() video: TVideoDocument,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 1000 * 1000 * 10 })
        .addFileTypeValidator({ fileType: /(png|jpg|jpeg)$/ })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    thumbnail: Express.Multer.File,
  ) {
    return this.videosService.uploadVideoThumbnail(video, thumbnail);
  }

  @Get('/:videoId/comments')
  @UseInterceptors(VideoInterceptor)
  @UseInterceptors(new HttpRequestInterceptor('Unable to add comment to video'))
  async getCommentsFromVideo(
    @Video() video: TVideoDocument,
    @Query() query: GetCommentsDto,
  ) {
    return this.videosService.getCommentsFromVideo(video, query);
  }

  @Post('/:videoId/comments')
  @UseInterceptors(new HttpRequestInterceptor('Unable to add comment to video'))
  async addCommentToVideo(
    @Param('videoId') videoId: string,
    @Body() { comment, parentCommentId }: CreateCommentDto,
  ) {
    return this.videosService.addCommentToVideo({
      videoId,
      comment,
      userId: 'mockUser',
      parentCommentId,
    });
  }

  @Get('/:videoId/comments/:commentId')
  @UseInterceptors(
    new HttpRequestInterceptor('Unable to get comment from video'),
  )
  async getCommentFromVideo(@Param('commentId') commentId: string) {
    return this.videosService.getCommentFromVideo(commentId);
  }

  @Delete('/:videoId/comments/:commentId')
  @UseInterceptors(HttpRequestInterceptor)
  async removeCommentFromVideo(@Param('commentId') commentId: string) {
    return this.videosService.removeCommentFromVideo({
      commentId,
      userId: 'mockUser',
    });
  }

  @Post('/:videoId/comments/:commentId/votes/:vote')
  @UseInterceptors(new HttpRequestInterceptor('Unable to add vote to comment'))
  async addVoteToComment(
    @Param('videoId') videoId: string,
    @Param('commentId') commentId: string,
    @Param('vote') vote: TCommentVote,
  ) {
    return this.videosService.addVoteToComment({
      videoId,
      commentId,
      voteType: vote,
      userId: 'mockUser',
    });
  }

  @Delete('/:videoId/comments/:commentId/votes')
  @UseInterceptors(new HttpRequestInterceptor('Unable to add vote to comment'))
  async removeVoteFromComment(
    @Param('videoId') videoId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.videosService.removeVoteFromComment({
      videoId,
      commentId,
      userId: 'mockUser',
    });
  }
}
