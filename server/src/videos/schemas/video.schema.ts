import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TDuration, VideoStatus } from '../videos.types';
import { Document } from 'mongoose';

@Schema()
export class Video {
  @Prop()
  name: string;

  @Prop()
  userId: string;

  @Prop()
  size: number;

  @Prop()
  mimeType: string;

  @Prop()
  rawDuration: number;

  @Prop({ type: Object })
  duration: TDuration;

  @Prop()
  uploadedAt: number;

  @Prop({ default: VideoStatus.UNFINISHED })
  status: VideoStatus;

  @Prop()
  tags: string[];

  @Prop()
  thumbnail: string;

  @Prop({ default: 0 })
  numComments: number;
}

export type TVideoDocument = Video & Document;

export const VideoSchema = SchemaFactory.createForClass(Video);

VideoSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
