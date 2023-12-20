import { ICommonProps } from "@customTypes/common";
import { BackendRoutes } from "@src/constants/routes";
import { createUrl } from "@src/utils/paths";
import classNames from "classnames";
import React, { useMemo } from "react";

interface IProps extends ICommonProps {
  rawThumbnail: string;
  alt?: string;
}

export default function VideoThumbnail({
  rawThumbnail,
  alt,
  className,
}: IProps) {
  const src = useMemo(
    () =>
      rawThumbnail ? createUrl(BackendRoutes.thumbnails, rawThumbnail) : null,
    [rawThumbnail]
  );

  if (!src) return null;

  return (
    <img
      className={classNames(
        "video-thumbnail object-cover w-full h-full",
        className
      )}
      src={src}
      alt={alt}
    />
  );
}
