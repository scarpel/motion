import classNames from "classnames";
import React, { ComponentProps } from "react";

interface IProps extends ComponentProps<"button"> {}

export default function Button({
  children,
  className,
  disabled,
  ...props
}: IProps) {
  return (
    <button
      className={classNames(
        "bg-black text-white px-6 py-3 rounded-full transition-all",
        className,
        {
          "opacity-50": disabled,
        }
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
