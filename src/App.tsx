import React, { useState } from "react";
import { Calendar } from "./component/Calendar";
import CalendarTest from "./component/Calendar/test";
import { Calendar1 } from "./component/Calendar1";
import dayjs from "dayjs";
import { IconAdd } from "./test/icons/iconAdd";
import { IconEmail } from "./test/icons/IconEmail";
import { createFromIconfont } from "./component/Icon/createFrontIconfont";
import Space from "./component/Space";
import "./App.css";
import {
  ConfigContext,
  ConfigProvider,
} from "./component/Space/ConfigProvider";
import { createPortal } from "react-dom";
import CRUDTable from "./test/CRDUtable";
import ProTable from "./test/ProTable";

const LazyAaa = React.lazy(() => import("./Aaa"));

const IconFont = createFromIconfont(
  "//at.alicdn.com/t/c/font_4443338_a2wwqhorbk4.js",
);

interface TestProps {
  children: React.ReactNode[];
}

function Test(props: TestProps) {
  const children2 = React.Children.toArray(props.children);

  console.log(props.children);
  console.log(children2);
  return <div></div>;
}

function App() {
  const [date, setDate] = useState(new Date());

  const [value, setValue] = useState(new Date("2024-5-1"));

  const handleCLick = () => {
    console.log("click");
  };

  const content = (
    <div className="btn">
      <button>按钮</button>
    </div>
  );

  // return createPortal(content, document.body);

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

      {/* <ConfigProvider space={{ size: 20 }}>
        <Space direction="horizontal">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
        <Space direction="vertical">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider> */}
      {/* <CRUDTable /> */}

      <ProTable />
    </>
  );
}

export default App;
