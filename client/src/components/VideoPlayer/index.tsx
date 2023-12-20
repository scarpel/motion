import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React, { ComponentProps, ForwardedRef, forwardRef } from "react";

interface IProps extends ICommonProps, ComponentProps<"video"> {
  src: string;
}

const VideoPlayer = forwardRef(
  (
    { src, className, ...props }: IProps,
    ref: ForwardedRef<HTMLVideoElement>
  ) => {
    return (
      <video
        ref={ref}
        className={classNames(
          "video-player w-100 aspect-video rounded-xl",
          className
        )}
        {...props}
      >
        <source src={src} />
      </video>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
