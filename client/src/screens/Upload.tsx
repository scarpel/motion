"use client";

import AbsoluteContainer from "@components/AbsoluteContainer";
import VideoInput from "@components/VideoInput";
import VideoUpload from "@components/VideoUpload";
import { TUploadFormValues } from "@components/VideoUpload/types";
import WhiteContainer from "@components/WhiteContainer";
import { Routes } from "@src/constants/routes";
import { patchVideoMetadata, uploadVideo } from "@src/utils/videos";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface IProps {
  videoId: string;
  onVideoUpload: () => void;
}

export default function Upload({ videoId, onVideoUpload }: IProps) {
  // Hooks
  const router = useRouter();

  // States
  const [file, setFile] = useState<File>();
  const [didUploadVideo, setDidUploadVideo] = useState(false);

  // Functions
  const onSubmit = async (values: Partial<TUploadFormValues>) => {
    try {
      if (!didUploadVideo) {
        await uploadVideo(videoId, file!);
        setDidUploadVideo(true);
      }

      await patchVideoMetadata(videoId, values);

      onVideoUpload();

      router.push(Routes.home);
    } catch (err) {
      console.error("Unable to submit video", err);
    }
  };

  // Render
  return (
    <WhiteContainer
      className={classNames({
        "border-dashed overflow-auto": !file,
      })}
      overflowHidden={false}
    >
      <div className="w-full h-full flex justify-center items-center">
        <AbsoluteContainer
          className={classNames(
            "z-40 transition-all",
            file ? "opacity-0" : "opacity-100"
          )}
        >
          <VideoInput onFile={setFile} active={!file} />
        </AbsoluteContainer>

        {file ? (
          <AbsoluteContainer
            className={classNames(
              "z-50 transition-all duration-500",
              file
                ? "opacity-100 pointer-events-auto scale-100"
                : "pointer-events-none opacity-0 scale-75"
            )}
          >
            <VideoUpload file={file} onSubmit={onSubmit} />
          </AbsoluteContainer>
        ) : null}
      </div>
    </WhiteContainer>
  );
}
