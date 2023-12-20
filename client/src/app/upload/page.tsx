import Upload from "@screens/Upload";
import { generateVideoId } from "@src/utils/videos";
import { revalidateTag } from "next/cache";
import React from "react";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const id = await generateVideoId();

  // Functions
  const onVideoUpload = async () => {
    "use server";
    revalidateTag("videos");
  };

  // Render
  return <Upload videoId={id} onVideoUpload={onVideoUpload} />;
}
