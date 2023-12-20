"use client";

import React, { useEffect, useRef, useState } from "react";
import Recommendations from "@components/Recommendations";
import VideoComments from "@components/VideoComments";
import VideoWatch from "@components/VideoWatch";
import WhiteContainer from "@components/WhiteContainer";
import { ICommonProps } from "@customTypes/common";
import { TVideo } from "@customTypes/videos";
import { useAppDispatch } from "@store/index";
import { setIsPlayingVideo, setSelectedVideo } from "@store/slices/videos";

interface IProps extends ICommonProps {
  video: TVideo;
  recommendations: TVideo[];
  selectedTime?: number;
}

export default function Watch({
  video,
  recommendations,
  selectedTime = 0,
}: IProps) {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);

  // Hooks
  const dispatch = useAppDispatch();

  // States
  const [isPlaying, setIsPlaying] = useState(true);

  // Effects
  useEffect(() => {
    if (videoRef.current && selectedTime < video.rawDuration) {
      videoRef.current.currentTime = selectedTime;
    }
  }, [selectedTime]);

  useEffect(() => {
    dispatch(setSelectedVideo(video));
  }, [video]);

  useEffect(() => {
    dispatch(setIsPlayingVideo(isPlaying));
  }, [isPlaying]);

  // Render
  return (
    <WhiteContainer>
      <main className="flex flex-col space-y-10 py-10 overflow-scroll px-10 min-h-0 h-full md:flex-row md:space-x-10 md:space-y-0 md:py-0 md:overflow-hidden">
        <div className="w-full h-full flex-shrink-0 min-h-0 overflow-scroll no-scrollbar space-y-10 pb-10 md:w-2/3 md:pt-10">
          <VideoWatch
            className="w-full"
            video={video}
            selectedTime={selectedTime}
            autoPlay
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <VideoComments video={video} />
        </div>

        <Recommendations
          className="w-full h-full space-y-8 no-scrollbar md:w-1/3 md:overflow-scroll md:py-10"
          videos={recommendations}
        />
      </main>
    </WhiteContainer>
  );
}
