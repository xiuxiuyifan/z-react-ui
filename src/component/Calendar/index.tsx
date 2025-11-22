import { useImperativeHandle, useState } from "react";
import "./index.less";
import { useControllableValue } from "ahooks";

// 两个箭头、用来控制上一页和下一月的时间

const monthNames = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

interface CalenderProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

interface CalenderRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

// 获取当前时间
export const Calender: React.ForwardRefRenderFunction<
  CalenderRef,
  CalenderProps
> = (props, ref) => {
  const { defaultValue = new Date(), onChange } = props;

  const [date, setDate] = useControllableValue(props, {
    defaultValue: new Date(),
  });

  useImperativeHandle(ref, () => ({
    getDate: () => date,
    setDate: (date: Date) => setDate(date),
  }));

  const handlePrevMonth = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(prevMonth);
  };
  const handleNextMonth = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(nextMonth);
  };

  // 获取某个月的天数
  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 获取某个月的第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDates = () => {
    const days = [];

    const totalDays = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());
    for (let i = 0; i < firstDay; i++) {
      days.push(<div className="empty" key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i);
        setDate(curDate);
      };

      if (i === date.getDate()) {
        days.push(
          <div className="day selected" key={i} onClick={() => clickHandler()}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div className="day" key={i} onClick={() => clickHandler()}>
            {i}
          </div>
        );
      }
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  );
};
