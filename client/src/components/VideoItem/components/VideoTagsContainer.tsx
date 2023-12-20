import { IChildrenProps, ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React from "react";

export default function VideoTagsContainer({
  className,
  children,
}: ICommonProps & IChildrenProps) {
  return (
    <div className={classNames("tags-container flex flex-wrap", className)}>
      {children}
    </div>
  );
}
