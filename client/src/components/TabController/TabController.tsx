"use client";

import React, { useMemo } from "react";

import TabItem from "./TabItem";

import { Routes } from "@src/constants/routes";
import { ITabControllerProps, TTabItem } from "./types";
import { usePathname } from "next/navigation";

// Icons
import { BiHomeAlt } from "react-icons/bi";
import { FiUploadCloud } from "react-icons/fi";
import AnimatedBlurWrapper from "@components/AnimatedBlurWrapper";
import { useAppSelector } from "@store/index";
import classNames from "classnames";

const items: TTabItem[] = [
  {
    Icon: BiHomeAlt,
    href: "/",
  },
  // {
  //   Icon: FaPlay,
  //   href: "/watch",
  //   clickable: false,
  //   hideOnBlur: true,
  // },
  {
    Icon: FiUploadCloud,
    href: Routes.upload,
  },
];

export default function TabController({ className }: ITabControllerProps) {
  const _pathname = usePathname();

  // Hooks
  const isPlayingVideo = useAppSelector(({ videos }) => videos.isPlayingVideo);

  // States
  const pathName = useMemo(() => _pathname.split("?")[0], [_pathname]);

  const showBlur = useMemo(
    () => (_pathname.startsWith(Routes.watch) ? !isPlayingVideo : true),
    [isPlayingVideo, _pathname]
  );

  // Render
  return (
    <AnimatedBlurWrapper
      className={classNames("tab-controller", className)}
      backgroundUrl="/gradient.jpg"
      blurClassName="animate-bg-scroll"
      show={showBlur}
    >
      <div className="relative rounded-full flex items-center justify-center space-x-6 px-10 py-4 bg-black z-20">
        {items.map((item, index) => (
          <TabItem
            key={`item-${index}`}
            item={item}
            selected={pathName === item.href}
          />
        ))}
      </div>
    </AnimatedBlurWrapper>
  );
}
