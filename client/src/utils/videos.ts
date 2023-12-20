import {
  TComment,
  TCommentQuery,
  TDuration,
  TVideo,
} from "@customTypes/videos";
import { createUrl } from "./paths";
import { BackendRoutes } from "@src/constants/routes";
import { TUploadFormValues } from "@components/VideoUpload/types";
import { handleFetchRequest } from "./fetch";
import { TObject } from "@customTypes/common";

export async function getVideos(cache?: RequestCache) {
  try {
    const res = await fetch(`${process.env.INNER_BACKEND_URL}/videos`, {
      next: {
        revalidate: 0,
        tags: ["videos"],
      },
      cache,
    });

    if (!res.ok) throw new Error("Unable to fetch videos!");

    return (await res.json()) as Promise<TVideo[]>;
  } catch (err) {
    console.error("Unable to fetch videos");
    return [];
  }
}

export async function getVideo(videoId: string) {
  const res = await fetch(
    `${process.env.INNER_BACKEND_URL}/videos/${videoId}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  if (!res.ok) throw new Error("Unable to fetch video!");

  return res.json() as Promise<TVideo>;
}

export async function getCommentsFromVideo(
  videoId: string,
  query: Partial<{ page: number; pageSize: number }> = { page: 0, pageSize: 20 }
) {
  const res = await fetch(
    `${process.env.OUTER_BACKEND_URL}/videos/${videoId}/comments?` +
      new URLSearchParams(query as any),
    {
      method: "GET",
    }
  );

  if (!res.ok) throw new Error("Unable to fetch video comments!");

  return res.json() as Promise<TCommentQuery>;
}

export async function saveVideoComment(videoId: string, comment: string) {
  const res = await fetch(
    `${process.env.OUTER_BACKEND_URL}/videos/${videoId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment,
      }),
    }
  );

  if (!res.ok) throw new Error("Unable to save video comment!");

  return res.json() as Promise<TComment>;
}

export async function generateVideoId() {
  const res = await fetch(`${process.env.INNER_BACKEND_URL}/videos/new`, {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) throw new Error("Unable to generate video ID!");

  return res.json() as Promise<string>;
}

export function formatDurationItem(value: number = 0) {
  return value.toString().padStart(2, "0");
}

export function formatDuration({ hours, minutes, seconds }: TDuration) {
  return [hours, formatDurationItem(minutes), formatDurationItem(seconds)]
    .filter((v) => v)
    .join(":");
}

export function formatVideoDurationFromSeconds(seconds: number) {
  const periods = [
    {
      name: "hours",
      div: 3600,
    },
    {
      name: "minutes",
      div: 60,
    },
    {
      name: "seconds",
      div: 1,
    },
  ];

  return periods.reduce(
    (obj, { name, div }) => {
      if (div > obj.value) return obj;

      const result = obj.value / div;
      obj.duration[name] = Math.trunc(result);
      obj.value = obj.value % div;

      return obj;
    },
    {
      duration: {} as TObject<number>,
      value: seconds,
    }
  ).duration as TDuration;
}

export function generateVideoSearchParams({
  videoId,
  duration,
}: {
  videoId: string;
  duration?: number;
}) {
  const searchParams = new URLSearchParams();

  searchParams.append("id", videoId);
  if (duration) searchParams.append("t", duration.toString());

  return searchParams.toString();
}

export function getVideoStreamUrl(videoId: string) {
  return createUrl(BackendRoutes.videos, videoId, "stream");
}

export function getVideoThumbnailUrl(videoThumbnail?: string) {
  return videoThumbnail
    ? createUrl(BackendRoutes.thumbnails, videoThumbnail)
    : null;
}

export async function uploadVideo(videoId: string, videoFile: File) {
  const formData = new FormData();
  formData.append("video", videoFile);

  return handleFetchRequest(
    fetch(createUrl(BackendRoutes.videos, videoId), {
      method: "POST",
      body: formData,
    }),
    "Unable to upload video"
  );
}

export async function patchVideoMetadata(
  videoId: string,
  values: Partial<TUploadFormValues>
) {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, (values as any)[key]);
  });

  if (!Array.from(formData.entries()).length)
    throw new Error("At least one value should be informed!");

  return handleFetchRequest(
    fetch(createUrl(BackendRoutes.videos, videoId), {
      method: "PATCH",
      body: formData,
    }),
    "Unable to patch video"
  );
}

export async function getDurationFromVideoFile(video: File): Promise<number> {
  return new Promise((res) => {
    const videoElement = document.createElement("video");
    videoElement.preload = "metadata";

    videoElement.onloadedmetadata = function () {
      window.URL.revokeObjectURL(videoElement.src);
      videoElement.remove();
      res(videoElement.duration);
    };

    videoElement.src = window.URL.createObjectURL(video);
  });
}
