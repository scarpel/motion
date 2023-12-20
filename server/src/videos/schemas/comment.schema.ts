import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comment {
  @Prop({ required: true })
  comment: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  videoId: string;

  @Prop({ required: true })
  createdAt: number;

  @Prop()
  parentCommentId: string;

  @Prop({ default: 0 })
  upvote: number;

  @Prop({ default: 0 })
  downvote: number;
}

export type TCommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
  },
});
