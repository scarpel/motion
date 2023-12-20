import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React, { ComponentProps, FC } from "react";

interface IProps extends ICommonProps, ComponentProps<"button"> {
  Icon: FC;
}

export default function IconButton({
  Icon,
  className,
  type = "button",
  ...props
}: IProps) {
  return (
    <button
      className={classNames(
        "icon-button flex items-center justify-center",
        className
      )}
      type={type}
      {...props}
    >
      <Icon />
    </button>
  );
}
