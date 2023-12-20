import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React, { ReactNode } from "react";

export interface IWhiteContainerProps extends ICommonProps {
  children: ReactNode | ReactNode[];
  overflowHidden?: boolean;
}

export default function WhiteContainer({
  children,
  className,
  overflowHidden = true,
}: IWhiteContainerProps) {
  return (
    <div
      className={classNames(
        "main-container-sizing bg-container bg-opacity-75 rounded-2xl border border-gray-300 shadow-2xl shadow-slate-300 z-50",
        className,
        {
          "overflow-hidden": overflowHidden,
        }
      )}
    >
      {children}
    </div>
  );
}
