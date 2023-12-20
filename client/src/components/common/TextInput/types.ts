import { ComponentProps } from "react";

export interface IMultilineTextInputProps
  extends Omit<ComponentProps<"textarea">, "onChange"> {
  inputClassName?: string;
  onChange: (value: string) => void;
}

export interface ISimpleTextInputProps extends ComponentProps<"input"> {}
