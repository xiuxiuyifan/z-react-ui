import { useState } from "react";
// import { Calender } from "./component/Calendar";
import CalendarTest from "./component/Calendar/test";
import { Calendar1 } from "./component/Calendar1";
import dayjs from "dayjs";

function App() {
  const [date, setDate] = useState(new Date());

  const [value, setValue] = useState(new Date("2024-5-1"));
  return (
    <>
      {/* <Calender
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          alert(newDate.toLocaleDateString());
        }}
      />
      <Calender
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
      />
    </>
  );
}

export default App;
