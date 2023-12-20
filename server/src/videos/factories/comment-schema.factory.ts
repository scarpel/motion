import { Model } from 'mongoose';
import { CommentSchema } from '../schemas/comment.schema';
import { TVideoDocument } from '../schemas/video.schema';

const CommentSchemaFactory = (videoModel: Model<TVideoDocument>) => {
  const schema = CommentSchema;

  schema.pre('save', async function (next) {
    if (!this.isNew) return next();

    await videoModel.findByIdAndUpdate(this.videoId, {
      $inc: {
        numComments: 1,
      },
    });

    return next();
  });

  return schema;
};

export default CommentSchemaFactory;
