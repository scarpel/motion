import { ICommonProps } from "@customTypes/common";
import React, { useMemo, useState } from "react";
import NewTagButton from "./NewTagButton";
import Tag from "./Tag";

interface IProps extends ICommonProps {
  value: string[];
  maxTags?: number;
  onChange: (value: string[]) => void;
}

export default function TagInput({ value = [], onChange, maxTags }: IProps) {
  // States
  const [tags, setTags] = useState<string[]>(() => value);

  const canAddMore = useMemo(
    () => (!maxTags || tags.length < maxTags) && tags.every((v) => v.length),
    [maxTags, tags]
  );

  // Effects
  // useEffect(() => {
  //   onChange(tags);
  // }, [tags]);

  // Functions
  const handleNewTag = () => {
    if (canAddMore) setTags((v) => [...v, ""]);
  };

  const onTagChange = (index: number, value: string) => {
    setTags((v) => {
      const newArray = [...v];
      newArray[index] = value;
      return newArray;
    });
  };

  const onTagDelete = (index: number) => {
    setTags((v) => {
      const newArr = [...v];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  // Render
  return (
    <div className="tag-input flex items-center flex-wrap">
      {tags.map((tag, index) => (
        <Tag
          key={`tag-${index}`}
          className="mr-2 mb-2"
          value={tag}
          onChange={(value) => onTagChange(index, value)}
          onDelete={() => onTagDelete(index)}
          autofocus={!tag.length}
        />
      ))}

      <NewTagButton
        className="mr-2 mb-2 flex-shrink-0"
        onClick={handleNewTag}
        disabled={!canAddMore}
      />
    </div>
  );
}
