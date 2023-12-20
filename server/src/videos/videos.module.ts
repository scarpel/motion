import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Video, VideoSchema } from './schemas/video.schema';
import { Comment } from './schemas/comment.schema';
import { CommentVote } from './schemas/comment-vote.schema';
import CommentVoteSchemaFactory from './factories/comment-vote-schema.factory';
import CommentSchemaFactory from './factories/comment-schema.factory';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Video.name,
        useFactory: () => VideoSchema,
      },
      {
        name: Comment.name,
        inject: [getModelToken(Video.name)],
        useFactory: CommentSchemaFactory,
      },
      {
        name: CommentVote.name,
        inject: [getModelToken(Comment.name)],
        useFactory: CommentVoteSchemaFactory,
      },
    ]),
  ],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
