import { ICommonProps } from "@customTypes/common";
import React, { useMemo } from "react";
import VideoTagsContainer from "./VideoTagsContainer";
import VideoTag from "./VideoTag";

interface IProps extends ICommonProps {
  tags: string[];
}

export default function VideoTags({ tags = [], className }: IProps) {
  const hasTags = useMemo(() => !!tags.length, [tags]);

  // Render
  if (!hasTags) return null;

  return (
    <VideoTagsContainer className={className}>
      {tags.map((tag, index) => (
        <VideoTag className="mb-1 mr-1" key={`tag-${index}`} tag={tag} />
      ))}
    </VideoTagsContainer>
  );
}
