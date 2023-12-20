export enum VideoStatus {
  UNFINISHED = "UNFINISHED",
  UPLOADED = "UPLOADED",
  HIDDEN = "HIDDEN",
}

export type TDuration = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TVideo = {
  id: string;
  name: string;
  userId: string;
  size: number;
  mimeType: string;
  rawDuration: number;
  duration: TDuration;
  uploadedAt: number;
  status: VideoStatus;
  tags: string[];
  thumbnail: string;
  numComments: number;
};

export type TComment = {
  id: string;
  comment: string;
  userId: string;
  videoId: string;
  createdAt: number;
  upvote: number;
  downvote: number;
};

export type TCommentQuery = {
  page: number;
  numPages: number;
  hasMore: boolean;
  comments: TComment[];
};
