import { useEffect, useState } from "react";

function Test01() {
  const [state, setState] = useState("waiting");

  useEffect(() => {
    let timer = setTimeout(() => {
      setState("success");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  const handleClick = () => {
    setState("waiting");
  };
  return (
    <div>
      {state === "success" ? (
        <button onClick={handleClick}>按钮</button>
      ) : (
        state
      )}
    </div>
  );
}

export default Test01;
