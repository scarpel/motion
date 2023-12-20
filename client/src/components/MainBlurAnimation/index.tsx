"use client";

import AnimatedBlurWrapper from "@components/AnimatedBlurWrapper";
import { ICommonProps } from "@customTypes/common";
import { Routes } from "@src/constants/routes";
import { getVideoThumbnailUrl } from "@src/utils/videos";
import { useAppSelector } from "@store/index";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface IProps extends ICommonProps {}

export default function MainBlurAnimation({}: IProps) {
  const pathname = usePathname();

  // States
  const videos = useAppSelector(({ videos }) => videos);

  const [url, setUrl] = useState("");

  const show = useMemo(
    () => pathname.startsWith(Routes.watch) && videos.isPlayingVideo,
    [pathname, videos.isPlayingVideo]
  );

  // Effects
  useEffect(() => {
    if (videos.selectedVideo)
      setUrl(getVideoThumbnailUrl(videos.selectedVideo.thumbnail)!);
  }, [videos.selectedVideo]);

  // Render
  return (
    <AnimatedBlurWrapper
      className="main-container-sizing z-0 animate-video-bg-animation blur-xl"
      backgroundUrl={url}
      show={show}
      showClassName="opacity-60"
      blurClassName="!bg-cover !bg-center !blur-2xl"
    />
  );
}
