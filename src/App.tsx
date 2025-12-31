import React, { useState } from "react";
import { Calendar } from "./component/Calendar";
import CalendarTest from "./component/Calendar/test";
import { Calendar1 } from "./component/Calendar1";
import dayjs from "dayjs";
import { IconAdd } from "./test/icons/iconAdd";
import { IconEmail } from "./test/icons/IconEmail";
import { createFromIconfont } from "./component/Icon/createFrontIconfont";

const LazyAaa = React.lazy(() => import("./Aaa"));

const IconFont = createFromIconfont(
  "//at.alicdn.com/t/c/font_4443338_a2wwqhorbk4.js"
);

function App() {
  const [date, setDate] = useState(new Date());

  const [value, setValue] = useState(new Date("2024-5-1"));
  return (
    <>
      {/* <Calendar
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          alert(newDate.toLocaleDateString());
        }}
      />
      <Calendar
        defaultValue={new Date()}
        onChange={(newDate) => {
          alert(newDate.toLocaleDateString());
        }}
      /> */}

      {/* <CalendarTest
        value={value}
        onChange={(date) => {
          console.log(date.toLocaleDateString());
          setValue(date);
        }}
      /> */}
      {/* 
      <Calendar1
        value={dayjs("2023-11-08")}
        locale="zh-CN"
        dateInnerContent={(value) => {
          return (
            <div>
              <p style={{ background: "yellowgreen", height: "30px" }}>
                {value.format("YYYY/MM/DD")}
              </p>
            </div>
          );
        }}
      /> */}

      <IconAdd />

      <IconEmail />

      <IconEmail style={{ color: "blue", fontSize: "50px" }} />

      <IconFont type="icon-shouye-zhihui" size="40px"></IconFont>
      <IconFont
        type="icon-gerenzhongxin-zhihui"
        fill="blue"
        size="40px"
      ></IconFont>
    </>
  );
}

export default App;
