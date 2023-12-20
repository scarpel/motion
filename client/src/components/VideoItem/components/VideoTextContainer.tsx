import { IChildrenProps, ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React from "react";

interface IProps extends ICommonProps, IChildrenProps {}

export default function VideoTextContainer({ children, className }: IProps) {
  return <div className={classNames("mt-3", className)}>{children}</div>;
}
