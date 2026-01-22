import { Table } from "antd";
import React from "react";

function TableComp(props) {
  console.log("TableComp render");
  const { dataSource, columns, loading } = props;

  return <Table loading={loading} dataSource={dataSource} columns={columns} />;
}

export default React.memo(TableComp);
