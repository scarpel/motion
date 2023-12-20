import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TCommentVote } from '../videos.types';
import { Document } from 'mongoose';

@Schema()
export class CommentVote {
  @Prop({ required: true })
  videoId: string;

  @Prop({ required: true })
  commentId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  voteType: TCommentVote;

  @Prop({ required: true })
  createdAt: number;
}

export type TCommentVoteDocument = CommentVote & Document;

export const CommentVoteSchema = SchemaFactory.createForClass(CommentVote);
