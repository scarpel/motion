import { ICommonProps } from "@customTypes/common";
import { TVideo } from "@customTypes/videos";

export interface IVideoItemProps extends ICommonProps {
  video: TVideo;
  onClick: (thumbPosition: DOMRect, videoTime?: number) => void;
}
