import React from "react";
import { ISimpleTextInputProps } from "./types";

export default function TextInput(props: ISimpleTextInputProps) {
  return <input type="text" {...props} />;
}
