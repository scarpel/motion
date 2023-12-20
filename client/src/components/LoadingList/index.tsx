import React, { FC, useMemo } from "react";

interface IProps {
  numItems?: number;
  Component: FC;
}

export default function LoadingList({ numItems = 10, Component }: IProps) {
  // States
  const items = useMemo(() => new Array(numItems).fill(0), [numItems]);

  // Render
  return (
    <>
      {items.map((_, index) => (
        <Component key={`item-${index}`} />
      ))}
    </>
  );
}
