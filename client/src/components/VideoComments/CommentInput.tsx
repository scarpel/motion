import Button from "@components/common/Button";
import MultilineTextInput from "@components/common/TextInput/Multiline";
import { ICommonProps } from "@customTypes/common";
import { TComment } from "@customTypes/videos";
import { saveVideoComment } from "@src/utils/videos";
import classNames from "classnames";
import React, { useState } from "react";

interface IProps extends ICommonProps {
  videoId: string;
  onNewComment: (comment: TComment) => void;
}

export default function CommentInput({
  className,
  videoId,
  onNewComment,
}: IProps) {
  const [comment, setComment] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Functions
  const saveComment = async () => {
    try {
      setIsSaving(true);
      const savedComment = await saveVideoComment(videoId, comment);
      onNewComment(savedComment);
      setComment("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Render
  return (
    <div>
      <MultilineTextInput
        className={classNames("input text-sm min-h-[80px]", className)}
        onChange={setComment}
        value={comment}
        disabled={isSaving}
      />

      {comment ? (
        <div className="flex items-center justify-end mt-4">
          <Button
            className="text-sm bg-transparent !text-black"
            onClick={() => setComment("")}
          >
            Cancel
          </Button>

          <Button
            className="text-sm ml-2"
            disabled={!comment.length}
            onClick={saveComment}
          >
            Post comment
          </Button>
        </div>
      ) : null}
    </div>
  );
}
