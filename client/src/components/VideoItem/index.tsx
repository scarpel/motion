"use client";

import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { IVideoItemProps } from "./types";
import classNames from "classnames";
import VideoMiniPlayer from "../VideoMiniPlayer.tsx";
import VideoThumbnailContainer from "./components/VideoThumbnailContainer";
import VideoThumbnail from "./components/VideoThumbnail";
import VideoDuration from "./components/VideoDuration";
import VideoTextContainer from "./components/VideoTextContainer";
import VideoName from "./components/VideoName";
import useToggleState from "@src/hooks/useToggleState";
import { getVideoStreamUrl } from "@src/utils/videos";
import VideoMetadata from "./components/VideoMetadata";

export default function VideoItem({
  video,
  onClick,
  className,
}: IVideoItemProps) {
  // Refs
  const thumbContainerRef = useRef<HTMLDivElement>(null);
  const videoTimestampRef = useRef(0);

  // States
  const { url } = useMemo(() => {
    return {
      url: getVideoStreamUrl(video.id),
    };
  }, [video]);

  const [isHovering, toggleHover] = useToggleState(false);

  // Effects
  useEffect(() => {
    videoTimestampRef.current = 0;
  }, [isHovering]);

  // Functions
  const handleClick = () => {
    onClick(
      thumbContainerRef.current?.getBoundingClientRect()!,
      videoTimestampRef.current
    );
  };

  const handleVideoTimeUpdate = useCallback(
    (e: SyntheticEvent<HTMLVideoElement, Event>) => {
      videoTimestampRef.current = Math.trunc(
        (e.target as HTMLVideoElement).currentTime
      );
    },
    []
  );

  // Render
  return (
    <section
      className={classNames("video-item", className)}
      role="button"
      onClick={handleClick}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <div ref={thumbContainerRef}>
        <VideoThumbnailContainer>
          <section
            className={classNames(
              "relative z-50 transition-opacity duration-500 pointer-events-none h-full w-full",
              {
                "opacity-0": isHovering,
              }
            )}
          >
            <VideoThumbnail
              className="object-center"
              rawThumbnail={video.thumbnail}
              alt={video.name}
            />

            <VideoDuration duration={video.duration} />
          </section>

          {isHovering && (
            <VideoMiniPlayer
              url={url}
              className="inset-0 z-40"
              absolute
              onTimeUpdate={handleVideoTimeUpdate}
            />
          )}
        </VideoThumbnailContainer>
      </div>

      <VideoTextContainer>
        <VideoName name={video.name} />
        <VideoMetadata className="mt-2" uploadedAt={video.uploadedAt} />
      </VideoTextContainer>
    </section>
  );
}
