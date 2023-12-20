import { ICommonProps } from "@customTypes/common";
import { TComment } from "@customTypes/videos";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import Comment from "./Comment";
import LoadingComment from "./LoadingComment";
import LoadingList from "@components/LoadingList";

interface IProps extends ICommonProps {
  comments: TComment[];
  currentPage?: number;
  hasMore?: boolean;
  fetchMore?: () => void;
  isFetching?: boolean;
  fetchMoreThreshrold?: number;
}

export default function CommentList({
  comments = [],
  currentPage = 0,
  hasMore,
  fetchMore,
  className,
  fetchMoreThreshrold = 150,
  isFetching,
}: IProps) {
  // Refs
  const observer = useRef<IntersectionObserver>();
  const threshold = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    if (
      hasMore &&
      !isFetching &&
      comments.length &&
      threshold.current &&
      fetchMore
    ) {
      observer.current = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) fetchMore();
        },
        {
          threshold: 1,
        }
      );

      observer.current.observe(threshold.current as any);
    }

    return () => observer.current?.disconnect();
  }, [currentPage, hasMore, comments.length, isFetching, fetchMore]);

  // Render
  return (
    <div className={classNames("comment-list relative", className)}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      {isFetching && <LoadingList Component={LoadingComment} />}

      <div
        ref={threshold}
        className="absolute w-4 h-4 pointer-events-none invisible"
        style={{ bottom: fetchMoreThreshrold }}
      />
    </div>
  );
}
