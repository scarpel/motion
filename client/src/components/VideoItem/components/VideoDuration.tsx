import React, { useMemo } from "react";
import classNames from "classnames";
import { ICommonProps } from "@customTypes/common";
import { TDuration } from "@customTypes/videos";
import { formatDuration } from "@src/utils/videos";

interface IProps extends ICommonProps {
  duration: TDuration;
}

export default function VideoDuration({ duration, className }: IProps) {
  const formattedDuration = useMemo(() => formatDuration(duration), [duration]);

  // Render
  return (
    <p
      className={classNames(
        "absolute bg-black text-white text-xs tracking-wider px-1.5 py-0.5 rounded-md bottom-2 right-2",
        className
      )}
    >
      {formattedDuration}
    </p>
  );
}
