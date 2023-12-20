export enum VideoStatus {
  UNFINISHED = 'UNFINISHED',
  UPLOADED = 'UPLOADED',
  HIDDEN = 'HIDDEN',
}

export type TDuration = {
  hours: number;
  minutes: number;
  seconds: number;
};

export enum ECommentVotes {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

export type TCommentVote = `${ECommentVotes}`;

export enum ECommentSort {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
  CREATION = 'creation',
}
