import SimpleVideoItem from "@components/VideoItem/SimpleVideoItem";
import { ICommonProps } from "@customTypes/common";
import { TVideo } from "@customTypes/videos";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface IProps extends ICommonProps {
  videos: TVideo[];
}

export default function Recommendations({ videos = [], className }: IProps) {
  const topRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [videos]);

  // Render
  return (
    <section className={classNames("recommendations", className)}>
      {videos.map((video, index) => (
        <div key={video.id} ref={index === 0 ? topRef : null}>
          <Link href={`?id=${video.id}`}>
            <SimpleVideoItem key={video.id} video={video} />
          </Link>
        </div>
      ))}
    </section>
  );
}
