import { ECommentSort, TDuration } from '@src/videos/videos.types';

export function getVideoDuration(buffer: Buffer) {
  const start = buffer.indexOf(Buffer.from('mvhd')) + 16;
  const timeScale = buffer.readUInt32BE(start);
  const duration = buffer.readUInt32BE(start + 4);

  return Math.floor(duration / timeScale);
}

export function formatVideoDuration(seconds: number) {
  const periods = [
    {
      name: 'hours',
      div: 3600,
    },
    {
      name: 'minutes',
      div: 60,
    },
    {
      name: 'seconds',
      div: 1,
    },
  ];

  return periods.reduce(
    (obj, { name, div }) => {
      if (div > obj.value) return obj;

      const result = obj.value / div;
      obj.duration[name] = Math.trunc(result);
      obj.value = obj.value % div;

      return obj;
    },
    {
      duration: {},
      value: seconds,
    },
  ).duration as TDuration;
}

export function getStartEndFromRange(range: string) {
  const values = /^bytes=(\d*)-(\d*)/.exec(range);

  return values
    ? values
        .slice(1)
        .filter((v) => v)
        .map((value) => parseInt(value, 10))
    : null;
}

export function formatVideoTags(tags: string[] = []) {
  return tags
    .filter((tag) => tag)
    .map((tag) => tag.toLowerCase().replaceAll(/[^a-z0-9_-]/g, ''));
}

export function getCommentSortObj(sort: ECommentSort, asc: boolean = true) {
  const value = asc ? 1 : -1;

  switch (sort) {
    case ECommentSort.UPVOTE:
      return {
        upvote: value,
        createdAt: -1,
      };
    case ECommentSort.DOWNVOTE:
      return {
        downvote: value,
        createdAt: -1,
      };
    default:
      return { createdAt: value };
  }
}
