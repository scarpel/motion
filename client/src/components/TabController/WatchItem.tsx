import { ICommonProps } from "@customTypes/common";
import { TVideo } from "@customTypes/videos";
import { getVideoThumbnailUrl } from "@src/utils/videos";
import { useAppSelector } from "@store/index";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

interface IProps extends ICommonProps {
  selected: boolean;
}

export default function WatchItem({ selected, className }: IProps) {
  const selectedVideo = useAppSelector(({ videos }) => videos.selectedVideo);

  // States
  const [video, setVideo] = useState<TVideo | null>(null);

  const isSelected = useMemo(() => !!(selected && video), [selected, video]);
  const src = useMemo(
    () => (video ? getVideoThumbnailUrl(video.thumbnail) : ""),
    [video]
  );

  // Effects
  useEffect(() => {
    if (selectedVideo) setVideo(selectedVideo);
  }, [selectedVideo]);

  // Render
  const renderVideo = () => {
    if (!video) return null;

    return (
      <>
        <img src={src!} alt={video?.name} className="rounded-sm" />

        <div className="relative mt-1 overflow-hidden text-xxs tracking-widest -mx-1">
          <p className="text-transparent line-clamp-1">{video.name}</p>
          <p className="absolute left-0 top-0 text-white whitespace-nowrap">
            {video.name}
          </p>
        </div>
      </>
    );
  };

  return (
    <div
      className={classNames(
        className,
        "watch-item aspect-video-wide transition-all duration-500",
        isSelected ? "w-10 opacity-100" : "w-0 opacity-0 mx-0"
      )}
    >
      {renderVideo()}
    </div>
  );
}
