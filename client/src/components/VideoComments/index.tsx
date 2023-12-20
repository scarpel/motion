import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IVideoCommentsProps } from "./types";
import CommentInput from "./CommentInput";
import { TComment } from "@customTypes/videos";
import CommentList from "./CommentList";
import { useQuery } from "react-query";
import { getCommentsFromVideo } from "@src/utils/videos";
import { TObject } from "@customTypes/common";

export default function VideoComments({ video }: IVideoCommentsProps) {
  // Refs
  const storedPages = useRef<TObject<boolean>>({});

  // States
  const [page, setPage] = useState(0);

  const [comments, setComments] = useState<TComment[]>([]);
  const [numComments, setNumComments] = useState(() => video.numComments || 0);

  const commentLabel = useMemo(
    () => (video.numComments > 1 ? "comments" : "comment"),
    [video.numComments]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["comments", video.id, page],
    queryFn: () => getCommentsFromVideo(video.id, { page, pageSize: 3 }),
    keepPreviousData: true,
  });

  // Effects
  useEffect(() => {
    if (data && !(data.page in storedPages.current)) {
      setComments((comments) => [...comments, ...data.comments]);
      storedPages.current[data.page] = true;
    }
  }, [data]);

  // Functions
  const onNewComment = (comment: TComment) => {
    setComments((comments) => [comment, ...comments]);
    setNumComments((v) => v + 1);
  };

  const fetchMoreComments = useCallback(() => {
    if (data?.hasMore) {
      setPage(data.page + 1);
    }
  }, [data?.hasMore, data?.page]);

  // Render
  return (
    <>
      <div>
        <h3 className="font-medium flex text-lg">
          {numComments} {commentLabel}
        </h3>

        <CommentInput
          className="my-3"
          onNewComment={onNewComment}
          videoId={video.id}
        />
      </div>

      <CommentList
        className="space-y-10"
        isFetching={isLoading}
        hasMore={data?.hasMore}
        fetchMore={fetchMoreComments}
        comments={comments}
        currentPage={page}
      />
    </>
  );
}
