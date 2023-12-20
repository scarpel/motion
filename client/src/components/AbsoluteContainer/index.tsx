import { IChildrenProps, ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React from "react";

export default function AbsoluteContainer({
  className,
  children,
}: ICommonProps & IChildrenProps) {
  return (
    <div
      className={classNames("absolute-container absolute inset-0", className)}
    >
      {children}
    </div>
  );
}
