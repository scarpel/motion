import React, { useRef } from "react";
import { IVideInputProps } from "./types";

import { FaVideo } from "react-icons/fa6";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

export default function VideoInput({
  acceptedFiles = ".mp4",
  className,
  onFile,
  active = true,
}: IVideInputProps) {
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Hooks
  const [collectedProps, dropRef] = useDrop(() => ({
    accept: NativeTypes.FILE,
    canDrop: (item: any) => {
      const file = item.files[0];
      return file?.type === "video/mp4";
    },
    drop: (e) => onFile(e.files[0]),
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));

  // Functions
  const handleInputClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const onInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFile(e.target.files![0]);
  };

  // Render
  return (
    <section
      ref={dropRef}
      className={classNames(
        "flex flex-col items-center justify-center w-full h-full cursor-pointer",
        className,
        {
          "pointer-events-none": !active,
        }
      )}
      onClick={handleInputClick}
    >
      <div
        className={classNames(
          "text-center px-10 transition duration-300 w-96",
          {
            "scale-[0.85]": collectedProps.isOver,
          }
        )}
      >
        <FaVideo className="text-6xl mx-auto" />
        <h3 className="mt-5 text-center opacity-40">
          Drop your video here or click to select one from your files
        </h3>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedFiles}
        className="appearance-none hidden"
        onChange={onInputFile}
        multiple={false}
      />
    </section>
  );
}
