import type { Dayjs } from "dayjs";
import "./index.less";
import Header from "./Header";
import {
  useContext,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import cs from "classnames";
import CalendarLocale from "./locale/en-US";
import LocaleContext from "./LocaleContext";
import allLocales from "./locale";
import dayjs from "dayjs";

export interface Calendar1Props {
  value: Dayjs;

  style?: CSSProperties;
  className?: string | string[];

  // 定制日期显示
  dateRender: (date: Dayjs) => React.ReactNode;

  // 定制日期单元格
  dateInnerContent: (currentData: Dayjs) => ReactNode;
  // 国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

interface MonthCalendarProps extends Calendar1Props {
  selectHandler?: (date: Dayjs) => void;
  curMonth: Dayjs;
}

function getAllDays(date: Dayjs) {
  // 获取当前月份的开始时间
  const startDate = date.startOf("month");
  // 获取当前时间有多少天
  const day = startDate.day();

  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7
  );

  // 算出第一天之前的天数
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }
  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(), // 看是不是当前月份
    };
  }

  return daysInfo;
}

function renderDays(
  days: Array<{ date: Dayjs; currentMonth: boolean }>,
  dateRender: MonthCalendarProps["dateRender"],
  dateInnerContent: MonthCalendarProps["dateInnerContent"],
  value: Dayjs,
  selectHandler?: MonthCalendarProps["selectHandler"]
) {
  const rows = [];

  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j];
      row[j] = (
        <div
          className={
            "calendar-month-body-cell " +
            (item.currentMonth ? "calendar-month-body-cell-current" : "")
          }
          key={j}
          onClick={() => selectHandler?.(item.date)}
        >
          {dateRender ? (
            dateRender(item.date)
          ) : (
            <div className="calendar-month-body-cell-date">
              <div
                className={cs(
                  "calendar-month-body-cell-date-value",
                  value.format("YYYY-MM-DD") === item.date.format("YYYY-MM-DD")
                    ? "calendar-month-body-cell-date-selected"
                    : ""
                )}
              >
                {item.date.date()}
              </div>
              <div className="calendar-month-body-cell-date-content">
                {dateInnerContent?.(item.date)}
              </div>
            </div>
          )}
        </div>
      );
    }
    rows.push(row);
  }

  // 渲染行
  return rows.map((row, i) => (
    <div className="calendar-month-body-row" key={i}>
      {row}
    </div>
  ));
}
function MonthCalendar(props: MonthCalendarProps) {
  const { value, dateRender, dateInnerContent, selectHandler, curMonth } =
    props;

  // 从 context 中获取当前语言包
  const localContext = useContext(LocaleContext);

  const CalendarLocale = allLocales[localContext.locale];

  const weekList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const allDays = getAllDays(curMonth);

  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {CalendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">
        {renderDays(
          allDays,
          dateRender,
          dateInnerContent,
          value,
          selectHandler
        )}
      </div>
    </div>
  );
}

const Calendar1 = (props: Calendar1Props) => {
  const { value, style, className, locale, onChange } = props;

  // 当 className 的确定需要一段复杂计算逻辑的时候，就用 classname 这个包。
  const classNames = cs("calendar", className);
  // 创建一个内部状态，用于保存当前选中的日期 默认值为 props.value
  const [curValue, setCurValue] = useState<Dayjs>(value);

  const [curMonth, setCurMonth] = useState<Dayjs>(value);

  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, "month"));
  }

  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, "month"));
  }

  function selectHandler(date: Dayjs) {
    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  function toDayHandler() {
    const date = dayjs(Date.now());

    setCurValue(date);
    setCurMonth(date);
    onChange?.(date);
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: locale || navigator.language,
      }}
    >
      <div className={classNames}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHeader={toDayHandler}
        />
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        />
      </div>
    </LocaleContext.Provider>
  );
};

export { Calendar1 };
