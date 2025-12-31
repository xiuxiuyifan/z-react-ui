import React, { forwardRef, type PropsWithChildren } from "react";

import cs from "classnames";
import "./index.less";

type BaseIconProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
};

export type IconProps = BaseIconProps &
  Omit<React.SVGProps<SVGElement>, keyof BaseIconProps>;

export const getSize = (size: IconProps["size"]) => {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[];
  }

  const width = (size as string) || "1em";
  const height = (size as string) || "1em";
  return [width, height];
};

export const Icon = forwardRef<SVGAElement, PropsWithChildren<IconProps>>(
  (props, ref) => {
    const { style, className, spin, size = "1em", children, ...rest } = props;

    const [width, height] = getSize(size);

    const cn = cs(
      "icon",
      {
        "icon-spin": spin,
      },
      className
    );
    return (
      <svg
        ref={ref}
        fill="currentColor"
        width={width}
        height={height}
        style={style}
        {...rest}
      >
        {children}
      </svg>
    );
  }
);
