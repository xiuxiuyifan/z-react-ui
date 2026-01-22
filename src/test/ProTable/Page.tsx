import { Pagination } from "antd";
import React from "react";

function PageComp(props) {
  console.log("Page render");
  const { pageIndex, pageSize, total, setPageIndex, setPageSize } = props;

  const handleChange = (pageIndex, pageSize) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  return (
    <Pagination
      onChange={handleChange}
      current={pageIndex}
      pageSize={pageSize}
      total={total}
    />
  );
}

export default React.memo(PageComp);
