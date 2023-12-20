"use client";

import React from "react";
import VideoItem from "@components/VideoItem";
import WhiteContainer from "@components/WhiteContainer";
import { ICommonProps } from "@customTypes/common";
import { TVideo } from "@customTypes/videos";
import { Routes } from "@src/constants/routes";
import { generateVideoSearchParams } from "@src/utils/videos";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { MdOutlineOndemandVideo } from "react-icons/md";

interface IProps extends ICommonProps {
  videos: TVideo[];
}

export default function Homepage({ videos }: IProps) {
  // Hooks
  const router = useRouter();

  // Functions
  const goToVideo = (video: TVideo, position: DOMRect, duration?: number) => {
    router.push(
      `${Routes.watch}?${generateVideoSearchParams({
        videoId: video.id,
        duration,
      })}`
    );
  };

  // Render
  const renderEmpty = () => (
    <main className="text-center">
      <MdOutlineOndemandVideo className="mx-auto text-7xl" />
      <h3 className="text-sm mt-4 opacity-50">No videos uploaded yet!</h3>
    </main>
  );

  const renderItems = () => (
    <main className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-3 p-10 h-full overflow-scroll no-scrollbar pb-20">
      {videos.map((video, index) => (
        <Link
          key={`${video.id}-${index}`}
          href={`?id=${video.id}&t`}
          onClick={(e) => e.preventDefault()}
          id={`v-${index}`}
        >
          <VideoItem
            video={video}
            onClick={(position, duration) => {
              goToVideo(video, position, duration);
            }}
          />
        </Link>
      ))}
    </main>
  );

  const renderContent = () => {
    return videos.length ? renderItems() : renderEmpty();
  };

  return (
    <WhiteContainer>
      <div
        className={classNames(
          "flex items-center justify-center h-full min-h-0 transition-all duration-500"
        )}
      >
        {renderContent()}
      </div>
    </WhiteContainer>
  );
}
