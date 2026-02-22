import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export interface ProtalProps {
  attach?: HTMLElement | string;
  children?: React.ReactNode;
}

const Protal = forwardRef((props: ProtalProps, ref) => {
  const { attach, children } = props;

  const container = React.useMemo(() => {
    const el = document.createElement("div");
    el.className = "portal-wrapper";
    return el;
  }, []);

  useEffect(() => {
    const parentElement = getAttach(attach);
    parentElement?.appendChild(container);

    return () => {
      parentElement?.removeChild(container);
    };
  }, [attach, container]);

  useImperativeHandle(ref, () => container);

  return createPortal(children, container);
});

export default Protal;

// eslint-disable-next-line react-refresh/only-export-components
export function getAttach(attach: ProtalProps["attach"]) {
  if (typeof attach === "string") {
    return document.querySelector(attach);
  }
  if (typeof attach === "object" && attach instanceof window.HTMLElement) {
    return attach;
  }

  return document.body;
}
