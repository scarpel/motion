import React, { useMemo, useRef } from "react";
import { IVideoThumbnailImportProps } from "./types";
import classNames from "classnames";

import { FaRegImage } from "react-icons/fa6";

export default function VideoThumbnailImport({
  className,
  image,
  onChange,
  children,
}: IVideoThumbnailImportProps) {
  // Hooks

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // State
  const imgSrc = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image]
  );

  // Render
  return (
    <div
      className={classNames(
        "video-thumbnail-import cursor-pointer relative",
        className
      )}
      onClick={() => inputRef.current && inputRef.current.click()}
    >
      <div
        className={classNames(
          "absolute inset-0 pointer-events-none z-40 px-10 flex -mt-4 transition-all duration-500",
          {
            "opacity-0": image,
          }
        )}
      >
        <section className="flex items-center">
          <FaRegImage className="text-8xl" />
          <p className="text-left text-xs ml-5 opacity-50 leading-relaxed">
            Drag the thumbnail here or click to select one from your files
          </p>
        </section>
      </div>

      {imgSrc ? (
        <img
          className="absolute inset-0 z-50 object-cover w-full h-full"
          src={imgSrc}
          alt="Thumbnail"
        />
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept=".png, .jpg, .jpeg"
        className="appearance-none hidden"
        onChange={(e) => onChange(e.target.files![0])}
      />

      {children}
    </div>
  );
}
