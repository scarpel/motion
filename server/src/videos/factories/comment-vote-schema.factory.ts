import { Model, Query } from 'mongoose';
import { TCommentDocument } from '../schemas/comment.schema';
import {
  CommentVoteSchema,
  TCommentVoteDocument,
} from '../schemas/comment-vote.schema';

const CommentVoteSchemaFactory = (commentModel: Model<TCommentDocument>) => {
  const schema = CommentVoteSchema;

  // Functions
  const handleVotesDeletion = async (query: Query<any, any>) => {
    const items = (await query.model
      .find(query.getFilter())
      .lean()) as TCommentVoteDocument[];

    const votes = items.reduce((obj, { commentId, voteType }) => {
      if (!obj[commentId]) obj[commentId] = {};

      if (obj[commentId][voteType] === undefined) obj[commentId][voteType] = 0;

      obj[commentId][voteType]--;

      return obj;
    }, {});

    return Promise.all(
      Object.keys(votes).map((commentId) =>
        commentModel.findOneAndUpdate(
          {
            _id: commentId,
          },
          {
            $inc: votes[commentId],
          },
        ),
      ),
    );
  };

  // Triggers
  schema.pre('save', async function (next) {
    if (!this.isNew) return next();

    const { commentId, voteType } = this;

    await commentModel.findOneAndUpdate(
      {
        _id: commentId,
      },
      {
        $inc: {
          [voteType]: 1,
        },
      },
    );

    next();
  });

  schema.pre('deleteOne', async function (next) {
    await handleVotesDeletion(this);
    next();
  });

  schema.pre('deleteMany', async function (next) {
    await handleVotesDeletion(this);
    next();
  });

  return schema;
};

export default CommentVoteSchemaFactory;
