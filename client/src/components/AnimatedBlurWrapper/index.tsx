import { ICommonProps } from "@customTypes/common";
import classNames from "classnames";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface IProps extends ICommonProps {
  children?: ReactNode | ReactNode[];
  blurClassName?: string;
  backgroundUrl: string;
  show?: boolean;
  showClassName?: string;
  hideClassName?: string;
}

export default function AnimatedBlurWrapper({
  className,
  children,
  blurClassName,
  show = true,
  backgroundUrl,
  showClassName = "opacity-100",
  hideClassName = "opacity-0",
}: IProps) {
  // Refs
  const lastUrl = useRef(backgroundUrl);

  // States
  const [hasImgLoad, setHasImgLoad] = useState(false);

  const background = useMemo(() => `url(${backgroundUrl})`, [backgroundUrl]);
  const doShow = useMemo(() => hasImgLoad && show, [hasImgLoad, show]);

  // Effects
  useEffect(() => {
    lastUrl.current = backgroundUrl;
    loadImage(backgroundUrl);
  }, [backgroundUrl]);

  // Functions
  const loadImage = useCallback((src: string) => {
    try {
      setHasImgLoad(false);

      if (!src) return;

      const img = document.createElement("img");

      img.addEventListener("load", () => {
        if (lastUrl.current === src) setHasImgLoad(true);
      });

      img.src = src;
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Render
  return (
    <div className={classNames("animated-blur-wrapper", className)}>
      {children}

      <div
        className={classNames(
          "animated-blur absolute inset-0 z-10 transition-all duration-1000 bg-cover blur-xl pointer-events-none scale-110",
          blurClassName,
          doShow ? showClassName : hideClassName
        )}
        style={{ background }}
      />
    </div>
  );
}
