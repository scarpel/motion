import { ICommonProps } from "@customTypes/common";

export interface ITagProps extends ICommonProps {
  value: string;
  onChange: (value: string) => void;
  onDelete?: () => void;
  readonly?: boolean;
  maxLength?: number;
  autofocus?: boolean;
}
