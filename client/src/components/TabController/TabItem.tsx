import React from "react";
import { ITabItemProps } from "./types";
import classNames from "classnames";
import Link from "next/link";

export default function TabItem({ item, className, selected }: ITabItemProps) {
  const { Icon } = item;

  // Render
  return (
    <Link href={item.href}>
      <div
        className={classNames(
          "text-gray-400 text-3xl cursor-pointer relative flex items-center justify-center",
          className
        )}
        role="button"
      >
        <Icon
          className={classNames("transition-transform duration-500", {
            "-translate-y-1.5 scale-90": selected,
          })}
        />

        <div
          className={classNames(
            "absolute bg-red-500 w-2 h-2 rounded-full bottom-0 translate-y-1.5 transition-all opacity-0 duration-500",
            {
              "opacity-100": selected,
            }
          )}
        />
      </div>
    </Link>
  );
}
