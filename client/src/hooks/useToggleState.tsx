import { useCallback, useEffect, useState } from "react";

export default function useToggleState(
  initialState?: boolean | (() => boolean)
) {
  // Sttaes
  const [value, setValue] = useState(initialState);

  // Functions
  const toggle = useCallback((value?: any) => {
    setValue((v) => {
      return value !== undefined && typeof value === "boolean" ? value : !v;
    });
  }, []);

  return [value, toggle, setValue] as [boolean, typeof toggle, typeof setValue];
}
