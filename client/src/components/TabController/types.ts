import { ICommonProps } from "@customTypes/common";
import { FC } from "react";

export interface ITabControllerProps extends ICommonProps {}

export type TTabItem = {
  Icon: FC<ICommonProps>;
  href: string;
  hideOnBlur?: boolean;
  clickable?: boolean;
};

export interface ITabItemProps extends ICommonProps {
  item: TTabItem;
  selected?: boolean;
}
