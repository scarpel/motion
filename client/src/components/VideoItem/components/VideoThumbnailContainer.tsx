import { IChildrenProps, ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React from "react";

interface IProps extends ICommonProps, IChildrenProps {}

export default function VideoThumbnailContainer({
  children,
  className,
}: IProps) {
  return (
    <div
      className={classNames(
        "w-100 aspect-video bg-black video-round relative overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
