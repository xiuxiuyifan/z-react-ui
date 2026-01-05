import classNames from "classnames";
import React, { useContext, useMemo } from "react";
import "./index.less";
import { ConfigContext } from "./ConfigProvider";

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

export type SizeType = "small" | "middle" | "large" | number | undefined;

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

function getNumberSize(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}
const Space: React.FC<SpaceProps> = (props) => {
  const { space } = useContext(ConfigContext);
  const {
    className,
    style,
    children,
    direction = "horizontal",
    align,
    size = space?.size || "small",
    wrap = false,
    split,
    ...rest
  } = props;
  const otherStyles: React.CSSProperties = {};

  const childrens = React.Children.toArray(children);

  const [horizontalSize, verticalSize] = useMemo(() => {
    return (
      Array.isArray(size) ? size : ([size, size] as [SizeType, SizeType])
    ).map((item) => getNumberSize(item));
  }, [size]);

  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;

  if (wrap) {
    otherStyles.flexWrap = "wrap";
  }

  const mergedAlign =
    direction === "horizontal" && align === undefined ? "center" : align;

  const cn = classNames(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const nodes = childrens.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;

    return (
      <>
        <div
          key={key}
          className="space-item"
          style={{
            ...otherStyles,
            ...style,
          }}
          {...rest}
        >
          {child}
        </div>
        {i < childrens.length && split && (
          <span key={"d" + key} className={`${className}-split`} style={style}>
            {split}
          </span>
        )}
      </>
    );
  });
  return (
    <div
      className={cn}
      style={{
        ...otherStyles,
        ...style,
      }}
      {...rest}
    >
      {nodes}
    </div>
  );
};

export default Space;
