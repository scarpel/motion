import { ICommonProps } from "@customTypes/common";
import { timestampToText } from "@src/utils/date";
import classNames from "classnames";
import moment from "moment";
import React, { useMemo } from "react";

interface IProps extends ICommonProps {
  userAvatar?: string;
  userName?: string;
  uploadedAt: number;
}

export default function VideoMetadata({
  userName = "You",
  className,
  uploadedAt,
  userAvatar = "/avatar.jpg",
}: IProps) {
  // States
  const { dateText, dateTime } = useMemo(() => {
    return {
      dateTime: moment.unix(uploadedAt).format(),
      dateText: timestampToText(uploadedAt),
    };
  }, [uploadedAt]);

  // Render
  return (
    <section
      className={classNames("video-metadata flex items-center", className)}
    >
      <div className="w-5 h-5 bg-black rounded-full overflow-hidden">
        {userAvatar ? <img src={userAvatar} alt={userName} /> : null}
      </div>
      <p className="text-xs ml-2">
        <span className="font-medium">{userName}</span>
        <span className="mx-1">•</span>
        <time dateTime={dateTime}>{dateText}</time>
      </p>
    </section>
  );
}
