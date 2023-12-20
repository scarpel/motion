import VideoThumbnail from "@components/VideoItem/components/VideoThumbnail";
import { ICommonProps } from "@customTypes/common";
import { TVideo } from "@customTypes/videos";
import classNames from "classnames";
import React from "react";

interface IProps extends ICommonProps {
  position: DOMRect | null;
  video: TVideo | null;
}

export default function MovableVideoThumbnail({
  className,
  position,
  video,
}: IProps) {
  // Render
  if (!position) return null;

  return (
    <div
      className={classNames(
        "fixed w-50 aspect-video bg-red-500 z-50 transition-all rounded-xl overflow-hidden pointer-events-none",
        className
      )}
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
        width: position.width,
        height: position.height,
      }}
    >
      <VideoThumbnail rawThumbnail={video?.thumbnail!} />
    </div>
  );
}
