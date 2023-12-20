import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React from "react";

interface IProps extends ICommonProps {
  name: string;
}

export default function VideoName({ name, className }: IProps) {
  return (
    <h2 className={classNames("text-md font-medium line-clamp-3", className)}>
      {name}
    </h2>
  );
}
