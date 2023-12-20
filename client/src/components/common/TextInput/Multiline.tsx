import React, { useCallback, useEffect, useRef } from "react";
import { IMultilineTextInputProps } from "./types";
import classNames from "classnames";

export default function MultilineTextInput({
  value,
  onChange,
  className,
  inputClassName,
  ...props
}: IMultilineTextInputProps) {
  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const placeholderRef = useRef<HTMLParagraphElement>(null);

  // Effects
  useEffect(() => {
    onValueChange();
  }, [value]);

  // Functions
  const onValueChange = useCallback(() => {
    if (inputRef.current && placeholderRef.current) {
      inputRef.current.style.height = `${placeholderRef.current.clientHeight}px`;
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  // Render
  return (
    <div
      className={classNames(
        "multiline-text-input relative cursor-text",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        className={classNames(
          inputClassName,
          "w-full h-full appearance-none resize-none outline-none bg-transparent no-scrollbar align-top transition-all"
        )}
        {...props}
      />

      <p
        ref={placeholderRef}
        className={classNames(
          "absolute z-50 break-all whitespace-pre-wrap top-0  pointer-events-none invisible"
        )}
      >
        {`${value}a`}
      </p>
    </div>
  );
}
