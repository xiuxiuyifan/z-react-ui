import { useState } from "react";
import { Calender } from "./component/Calendar";
import CalendarTest from "./component/Calendar/test";

function App() {
  const [date, setDate] = useState(new Date());

  const [value, setValue] = useState(new Date("2024-5-1"));
  return (
    <>
      <Calender
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
      />

      {/* <CalendarTest
        value={value}
        onChange={(date) => {
          console.log(date.toLocaleDateString());
          setValue(date);
        }}
      /> */}
    </>
  );
}

export default App;
