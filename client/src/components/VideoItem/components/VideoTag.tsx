import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React from "react";

interface IProps extends ICommonProps {
  tag: string;
}

export default function VideoTag({ tag, className }: IProps) {
  return (
    <p
      className={classNames(
        "tag bg-black text-white px-3 py-1 rounded-full text-xs tracking-wide",
        className
      )}
    >
      {tag}
    </p>
  );
}
