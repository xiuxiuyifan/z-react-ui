import { useEffect, useRef, useState } from "react";

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function CalendarTest(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  const [value, setValue] = useState(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else {
      return defaultValue;
    }
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    // value 没有被赋值，说明是非受控模式，需要 设置内部的 value
    if (propsValue === undefined && !isFirstRender.current) {
      setValue(propsValue);
    }

    // 标记已经不是第一次渲染
    isFirstRender.current = false;
  }, [propsValue]);

  const mergedvalue = propsValue === undefined ? value : propsValue;

  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  }

  return (
    <div>
      {mergedvalue?.toLocaleDateString()}

      <div
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
}

export default CalendarTest;
