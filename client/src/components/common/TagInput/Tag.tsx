import React from "react";
import { ITagProps } from "./types";
import classNames from "classnames";
import IconButton from "../Button/IconButton";

import { FaXmark } from "react-icons/fa6";

export default function Tag({
  value,
  onChange,
  className,
  onDelete = () => {},
  readonly,
  autofocus,
}: ITagProps) {
  // Render
  const renderReadOnly = () => <p>{value}</p>;

  const renderTag = () => (
    <div className="flex items-center">
      <input
        type="text"
        className="appearance-none bg-transparent outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autofocus}
      />

      <IconButton className="flex-shrink-0" Icon={FaXmark} onClick={onDelete} />
    </div>
  );

  return (
    <section className={classNames("tag bg-black text-white", className)}>
      {readonly ? renderReadOnly() : renderTag()}
    </section>
  );
}
