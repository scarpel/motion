import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React from "react";

interface IProps extends ICommonProps {}

export default function LoadingComment({ className }: IProps) {
  return (
    <div
      role="status"
      className={classNames(
        "loading-comment animate-pulse flex items-center w-full",
        className
      )}
    >
      <svg
        className="w-10 h-10 me-4 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>

      <div className="flex-grow">
        <div className="h-2 rounded-full w-32 mb-4 bg-gray-400"></div>
        <div className="w-3/4 h-3 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
}
