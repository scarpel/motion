import VideoMetadata from "@components/VideoItem/components/VideoMetadata";
import VideoName from "@components/VideoItem/components/VideoName";
import VideoTags from "@components/VideoItem/components/VideoTags";
import VideoTextContainer from "@components/VideoItem/components/VideoTextContainer";
import VideoPlayer from "@components/VideoPlayer";
import { ICommonProps } from "@customTypes/common";
import { TVideo } from "@customTypes/videos";
import { getVideoStreamUrl } from "@src/utils/videos";
import classNames from "classnames";
import React, { ComponentProps, useEffect, useMemo, useRef } from "react";

interface IProps extends ICommonProps, Omit<ComponentProps<"video">, "ref"> {
  video: TVideo;
  selectedTime?: number;
}

export default function VideoWatch({
  video,
  className,
  selectedTime = 0,
  ...props
}: IProps) {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);

  // States
  const { url } = useMemo(() => {
    return {
      url: getVideoStreamUrl(video.id),
    };
  }, [video]);

  // Effects
  useEffect(() => {
    if (videoRef.current && selectedTime < video.rawDuration) {
      videoRef.current.currentTime = selectedTime;
    }
  }, [selectedTime]);

  // Render
  return (
    <div className={classNames("video-watch", className)}>
      <div className="w-full aspect-video bg-black video-round">
        <VideoPlayer
          ref={videoRef}
          key={video.id}
          className="w-full h-full"
          src={url}
          {...props}
        />
      </div>

      <VideoTextContainer className="mt-4">
        <VideoTags className="mb-1" tags={video.tags} />
        <VideoName className="!text-2xl" name={video.name} />

        <VideoMetadata className="mt-2" uploadedAt={video.uploadedAt} />
      </VideoTextContainer>
    </div>
  );
}
