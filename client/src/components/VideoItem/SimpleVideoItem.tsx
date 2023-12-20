import React from "react";
import { IVideoItemProps } from "./types";
import classNames from "classnames";
import VideoThumbnailContainer from "./components/VideoThumbnailContainer";
import VideoThumbnail from "./components/VideoThumbnail";
import VideoDuration from "./components/VideoDuration";
import VideoTextContainer from "./components/VideoTextContainer";
import VideoName from "./components/VideoName";
import VideoMetadata from "./components/VideoMetadata";

interface IProps extends Omit<IVideoItemProps, "onClick"> {
  onClick?: () => void;
}

export default function SimpleVideoItem({
  video,
  onClick = () => {},
  className,
}: IProps) {
  return (
    <section
      className={classNames("simple-video-item", className)}
      role="button"
      onClick={onClick}
    >
      <VideoThumbnailContainer>
        <VideoThumbnail rawThumbnail={video.thumbnail} alt={video.name} />
        <VideoDuration duration={video.duration} />
      </VideoThumbnailContainer>

      <VideoTextContainer>
        <VideoName name={video.name} />

        <VideoMetadata className="mt-1" uploadedAt={video.uploadedAt} />
      </VideoTextContainer>
    </section>
  );
}
