import { ICommonProps } from "@customTypes/common";
import React, { useMemo } from "react";
import UploadForm from "./UploadForm";
import { TUploadFormValues } from "./types";

interface IProps extends ICommonProps {
  file: File;
  active?: boolean;
  onSubmit: (values: Partial<TUploadFormValues>) => void;
}

export default function VideoUpload({ file, onSubmit }: IProps) {
  // States
  const name = useMemo(
    () => file.name.split(".").slice(0, -1).join("."),
    [file.name]
  );

  // Render
  return (
    <div className="w-full h-full">
      <UploadForm
        video={file}
        initialValues={{
          name,
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}
