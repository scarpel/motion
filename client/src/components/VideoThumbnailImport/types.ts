import { ICommonProps } from "@customTypes/common";
import { ReactNode } from "react";

export interface IVideoThumbnailImportProps extends ICommonProps {
  image?: File;
  onChange: (image: File) => void;
  children?: ReactNode | ReactNode[];
}
