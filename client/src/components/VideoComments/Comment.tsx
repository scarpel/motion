import { ICommonProps } from "@customTypes/common";
import { TComment } from "@customTypes/videos";
import { timestampToText } from "@src/utils/date";
import classNames from "classnames";
import moment from "moment";
import React, { useMemo } from "react";

interface IProps extends ICommonProps {
  comment: TComment;
}

export default function Comment({ comment, className }: IProps) {
  // States
  const { dateTime, timeText } = useMemo(() => {
    return {
      timeText: timestampToText(comment.createdAt),
      dateTime: moment(comment.createdAt).format(),
    };
  }, [comment]);

  // Render
  return (
    <section className={classNames("comment flex", className)}>
      <img className="w-10 h-10 rounded-full" src="/avatar.jpg" alt="User" />

      <div className="ml-4">
        <div className="flex items-center text-xs">
          <h2 className="font-medium">You</h2>
          <span className="mx-1">•</span>
          <time dateTime={dateTime}>{timeText}</time>
        </div>

        <p className="mt-1">{comment.comment}</p>
      </div>
    </section>
  );
}
