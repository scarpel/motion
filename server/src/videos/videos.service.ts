import paths from '@consts/paths';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { TVideoDocument, Video } from './schemas/video.schema';
import {
  ECommentSort,
  ECommentVotes,
  TCommentVote,
  VideoStatus,
} from './videos.types';
import moment from 'moment';
import {
  formatVideoDuration,
  formatVideoTags,
  getCommentSortObj,
  getStartEndFromRange,
  getVideoDuration,
} from '@utils/videos';
import UpdateVideoDto from './dtos/update-video.dto';
import {
  deleteCascade,
  getDocumentById,
  updateDocumentFields,
} from '@utils/documents';
import { extension } from 'mime-types';
import { Comment, TCommentDocument } from './schemas/comment.schema';
import ResponseError from '@errors/ResponseError';
import {
  CommentVote,
  TCommentVoteDocument,
} from './schemas/comment-vote.schema';
import GetCommentsDto from './dtos/get-comments.dto';

import Videos from '../assets/videos.json';

@Injectable()
export class VideosService implements OnModuleInit {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<TVideoDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<TCommentDocument>,
    @InjectModel(CommentVote.name)
    private readonly voteModel: Model<TCommentVoteDocument>,
  ) {}

  async onModuleInit() {
    await Promise.all(
      Videos.map(async (video) =>
        new this.videoModel(video).save().catch(() => null),
      ),
    );
  }

  async storeFileInAssetsFolder(path: string, file: any) {
    if (!existsSync(dirname(path))) {
      mkdirSync(dirname(path));
    }

    return writeFileSync(path, file);
  }

  async storeVideoMetadata(
    videoId: string,
    { mimetype, size, buffer, originalname, filename }: Express.Multer.File,
  ) {
    const rawDuration = getVideoDuration(buffer);

    const videoDocument = new this.videoModel({
      name: originalname || filename || 'Nameless',
      size,
      mimeType: mimetype,
      uploadedAt: moment().unix(),
      status: VideoStatus.UPLOADED,
      rawDuration,
      duration: formatVideoDuration(rawDuration),
      _id: videoId,
    } as Partial<Video>);

    return videoDocument.save();
  }

  storeVideoFile(id: string, video: Express.Multer.File) {
    return this.storeFileInAssetsFolder(
      join(paths.ASSETS.VIDEOS, `${id}.mp4`),
      video.buffer,
    );
  }

  async storeVideo(videoId: string, video: Express.Multer.File) {
    const videoMetadata = await this.storeVideoMetadata(videoId, video);

    this.storeVideoFile(videoMetadata.id, video);

    return videoMetadata;
  }

  async getVideoById(id: string) {
    const video = await this.videoModel.findById(id);

    if (!video) throw new Error('Video not found!');
  }

  async updateVideoMetadata(
    video: TVideoDocument,
    { tags = [], ...fields }: UpdateVideoDto,
  ) {
    try {
      if (!video) throw new Error('Must inform video!');

      return updateDocumentFields(video, {
        ...fields,
        tags: formatVideoTags(tags),
        status: VideoStatus.UPLOADED,
      }).save();
    } catch (err) {
      Logger.error('Unable to update video metadata', err);
      return null;
    }
  }

  async uploadVideoThumbnail(
    video: TVideoDocument,
    { buffer, mimetype }: Express.Multer.File,
  ) {
    if (!video) throw new Error('Video is required!');

    const fileName = `${video.id}.${extension(mimetype)}`;

    await this.storeFileInAssetsFolder(
      join(paths.ASSETS.THUMBNAILS, fileName),
      buffer,
    );

    video.thumbnail = fileName;
    return video.save();
  }

  getVideoStreamInfo(
    { id, mimeType, size }: TVideoDocument,
    range: string,
    chunkSize: number = 10 ** 6,
  ) {
    const parsedRange = getStartEndFromRange(range);

    if (!parsedRange) return null;

    const filePath = join(paths.ASSETS.VIDEOS, `${id}.${extension(mimeType)}`);

    const [start, end = Math.min(parsedRange[0] + chunkSize, size - 1)] =
      parsedRange;

    const contentLength = end - start + 1;

    return {
      start,
      end,
      mimeType,
      filePath,
      contentLength,
      size,
    };
  }

  getPublishedVideos() {
    return this.videoModel
      .find({
        status: VideoStatus.UPLOADED,
      })
      .sort({ uploadedAt: -1 });
  }

  async addCommentToVideo({
    videoId,
    comment,
    userId,
    parentCommentId = null,
  }: {
    videoId: string;
    comment: string;
    userId: string;
    parentCommentId?: string;
  }) {
    const video = await getDocumentById(this.videoModel, videoId);

    if (video?.status !== VideoStatus.UPLOADED)
      throw new ResponseError(400, 'Must inform a valid video');

    if (parentCommentId) {
      if (videoId === parentCommentId)
        throw new ResponseError(
          400,
          'Must inform a different parent comment id',
        );

      const parentComment = await getDocumentById(
        this.commentModel,
        parentCommentId,
      );

      if (!parentComment)
        throw new ResponseError(400, 'Must inform a valid parent comment');
    }

    const commentDoc = new this.commentModel({
      comment: comment.trim(),
      parentCommentId,
      userId,
      videoId,
      createdAt: moment().unix(),
    } as Comment);

    return commentDoc.save();
  }

  async getCommentFromVideo(commentId: string) {
    const comment = await getDocumentById(this.commentModel, commentId);

    if (!comment) throw new ResponseError(404, 'Comment not found!');

    return comment;
  }

  async removeCommentFromVideo({
    commentId,
    userId,
  }: {
    commentId: string;
    userId: string;
  }) {
    const comment = await getDocumentById(this.commentModel, commentId);

    if (!comment) throw new ResponseError(404, 'Comment not found');

    if (comment.userId !== userId)
      throw new ResponseError(403, 'You are not the author of this comment!');

    await Promise.all([
      this.commentModel.deleteOne({ _id: comment.id }),
      deleteCascade(this.commentModel, 'parentCommentId', comment.id),
    ]);

    return comment;
  }

  async addVoteToComment({
    videoId,
    commentId,
    voteType,
    userId,
  }: {
    videoId: string;
    commentId: string;
    voteType: TCommentVote;
    userId: string;
  }) {
    if (!Object.values(ECommentVotes).includes(voteType as any))
      throw new ResponseError(
        400,
        `Invalid vote type (valid ones: ${Object.values(ECommentVotes).join(
          ', ',
        )})`,
      );

    const comment = await getDocumentById(this.commentModel, commentId);

    if (!comment) throw new ResponseError(404, 'Comment not found!');

    const oldVote = await this.voteModel.findOne({
      commentId,
      voteType,
      userId,
    });

    if (oldVote) throw new ResponseError(400, 'Voted already!');

    const vote = new this.voteModel({
      commentId,
      createdAt: moment().unix(),
      userId,
      voteType,
      videoId,
    } as CommentVote);

    return vote.save();
  }

  async removeVoteFromComment({
    videoId,
    commentId,
    userId,
  }: {
    videoId: string;
    commentId: string;
    userId: string;
  }) {
    const votes = await this.voteModel.find({
      commentId,
      videoId,
      userId,
    } as CommentVote);

    if (votes.length)
      await this.voteModel.deleteMany({
        _id: { $in: votes.map(({ _id }) => _id) },
      });

    return votes;
  }

  async getCommentsFromVideo(
    video: TVideoDocument,
    {
      page = 0,
      pageSize = 10,
      sort = ECommentSort.UPVOTE,
      asc = true,
    }: GetCommentsDto,
  ) {
    if (!video.numComments)
      return { page: 0, numPages: 1, hasMore: false, comments: [] };

    const numPages = pageSize
      ? Math.ceil((video.numComments || 0) / pageSize)
      : 1;

    if (page > numPages) page = numPages;

    let schema = this.commentModel
      .find({
        videoId: video.id,
      })
      .sort(getCommentSortObj(sort as ECommentSort, asc) as any);

    if (pageSize) {
      schema = schema.skip(page * pageSize).limit(pageSize);
    }

    const comments = await schema;

    return {
      page,
      numPages,
      hasMore: page < numPages - 1,
      comments,
    };
  }
}
