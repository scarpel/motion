import { ICommonProps } from "@customTypes/common";

export interface IVideInputProps extends ICommonProps {
  acceptedFiles?: string;
  onFile: (file: File) => void;
  active?: boolean;
}
