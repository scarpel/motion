import { ReactNode } from "react";

export interface ICommonProps {
  className?: string;
}

export interface IChildrenProps {
  children: ReactNode | ReactNode[];
}

export interface IHideableComponentProps {
  show: boolean;
}

export type TObject<T = any> = { [key: string]: T };
