import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React, { ComponentProps } from "react";

// Icons
import { IoAdd } from "react-icons/io5";

interface IProps extends ICommonProps, ComponentProps<"button"> {}

export default function NewTagButton({
  className,
  disabled,
  ...props
}: IProps) {
  return (
    <button
      type="button"
      className={classNames(
        "new-tag-button tag flex items-center border border-black hover:bg-black hover:text-white transition-all duration-500 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-black",
        className,
        {
          "cursor-not-allowed": disabled,
        }
      )}
      disabled={disabled}
      {...props}
    >
      <IoAdd />
      <span className="ml-1">New tag</span>
    </button>
  );
}
