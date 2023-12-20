import React, { ComponentProps, useMemo } from "react";
import classNames from "classnames";

// Icons
import { FaVolumeHigh, FaVolumeOff } from "react-icons/fa6";
import { ICommonProps } from "@customTypes/common";
import useToggleState from "@src/hooks/useToggleState";

interface IProps extends ICommonProps, ComponentProps<"video"> {
  url: string;
  muted?: boolean;
  absolute?: boolean;
}

export default function VideoMiniPlayer({
  className,
  url,
  muted = true,
  absolute,
  ...props
}: IProps) {
  // States
  const [isMuted, toggleMuted] = useToggleState(muted);

  const Icon = useMemo(() => (isMuted ? FaVolumeOff : FaVolumeHigh), [isMuted]);

  // Render
  return (
    <div
      className={classNames(
        "video-mini-player flex items-center justify-center",
        className,
        absolute ? "absolute" : "relative"
      )}
    >
      <video autoPlay muted={isMuted} {...props}>
        <source src={url} />
      </video>

      <button
        className="absolute top-3 right-3 z-50 bg-black p-1.5 rounded-full flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleMuted();
        }}
      >
        <Icon className="text-white text-xs" />
      </button>
    </div>
  );
}
