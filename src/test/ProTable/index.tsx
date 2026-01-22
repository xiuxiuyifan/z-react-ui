import { useEffect, useMemo, useState } from "react";
import PageComp from "./Page";
import Search from "./Search";
import TableComp from "./Table";

/**
 * 模拟异步获取用户数据接口
 * @param {number} delay - 延迟时间(毫秒)，默认500ms
 * @param {boolean} shouldFail - 是否模拟失败，默认false
 * @returns {Promise<Array>} 返回用户数据数组
 */
const fetchUserData = (delay = 500, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("网络请求失败，请稍后重试！"));
        return;
      }

      const data = [
        {
          key: "1",
          name: "胡彦斌",
          age: 32,
          address: "西湖区湖底公园1号",
        },
        {
          key: "2",
          name: "胡彦祖",
          age: 42,
          address: "西湖区湖底公园1号",
        },
      ];

      resolve(data);
    }, delay);
  });
};

function ProTable() {
  const [searchParams, setSearchParams] = useState({});

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(100);

  const columns = useMemo(
    () => [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address",
      },
    ],
    [],
  );

  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("fetch data", { searchParams, pageIndex, pageSize });
    async function fetchData() {
      setLoading(true);
      try {
        const data = await fetchUserData();
        setDataSource(data);
        setTotal(data.length);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchData();
  }, [searchParams, pageIndex, pageSize]);

  return (
    <>
      <Search
        searchParams={searchParams}
        onValuesChange={(changedValues, allValues) => {
          setSearchParams(allValues);
        }}
      />

      <TableComp loading={loading} columns={columns} dataSource={dataSource} />
      <PageComp
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
        total={total}
        setTotal={setTotal}
      />
    </>
  );
}

export default ProTable;
