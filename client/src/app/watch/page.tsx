import React from "react";
import { redirect } from "next/navigation";
import Watch from "@screens/Watch";
import { getVideo, getVideos } from "@src/utils/videos";

type TSearchParams = {
  id: string;
  t?: number;
};

interface IProps {
  searchParams: TSearchParams;
}

export async function generateMetadata({ searchParams }: IProps) {
  const video = await getVideo(searchParams.id).catch(() => null);

  return {
    title: video ? `${video?.name} | Motion` : "Motion",
  };
}

export default async function WatchPage({ searchParams }: IProps) {
  const { id, t } = searchParams;

  try {
    if (!id) throw new Error("Empty id!");

    const [video, allVideos] = await Promise.all([getVideo(id), getVideos()]);

    const recommendations = allVideos.filter((video) => video.id !== id);

    // Render
    return (
      <Watch
        key={id}
        video={video}
        recommendations={recommendations}
        selectedTime={t}
      />
    );
  } catch (err) {
    console.error("Error on Watch page", err);

    redirect("/");
  }
}
