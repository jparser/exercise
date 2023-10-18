import React, { Key, useEffect, useState } from "react";
import "./App.css";

/**
 * 实现一个 Table 组件满足以下功能，如图 table.jpeg 所示
 * - 把数据渲染成表格
 * - 支持列排序
 * - 支持多列排序
 */

/**
 * 使用如下数据进行测试
 */

interface TestDataType {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

const testData: TestDataType[] = [
  {
    name: "Jim",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    name: "Tom",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    name: "Han",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    name: "Lilei",
    chinese: 88,
    math: 99,
    english: 89,
  },
];
type ColumnsKeyType = keyof TestDataType;

interface ColumnType {
  title: ColumnsKeyType;
  key: ColumnsKeyType;
  sort?: boolean; // 排序
}

const columns: ColumnType[] = Object.keys(testData[0]).map((key) => {
  const column: ColumnType = {
    title: key as ColumnsKeyType,
    key: key as ColumnsKeyType,
  };
  if (["chinese", "math", "english"].includes(key)) {
    column.sort = true;
  }
  return column;
});

interface TableType {
  columns: ColumnType[];
  dataSource: TestDataType[];
}

// 升序、降序、默认
type SortType = "ascend" | "descend" | "default";

function Table(props: TableType) {
  const [data, setData] = useState(props.dataSource);
  const [sortConfig, setSortConfig] = useState<{
    sortKey?: ColumnsKeyType | "";
    sortType: SortType;
  }>({ sortType: "default" });

  console.log("render");

  useEffect(() => {
    if (!sortConfig.sortKey) {
      setData(props.dataSource);
    } else {
      const key = sortConfig.sortKey;
      const list = [...props.dataSource].sort((a, b) => {
        const typeEnum = {
          ascend: a[key] > b[key] ? -1 : 1,
          descend: a[key] > b[key] ? 1 : -1,
          default: 0,
        };
        return typeEnum[sortConfig.sortType];
      });

      setData(list);
    }
  }, [sortConfig, props.dataSource]);

  const handleClick = (key: ColumnsKeyType) => {
    let sortType: SortType = "ascend";
    let sortKey: ColumnsKeyType | "" = key;
    if (sortKey === sortConfig.sortKey) {
      switch (sortConfig.sortType) {
        case "default":
          sortType = "ascend";
          break;
        case "ascend":
          sortType = "descend";
          break;
        default:
          sortType = "default";
          sortKey = "";
          break;
      }
    } else {
      sortType = "ascend";
    }

    setSortConfig({
      sortKey,
      sortType,
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((item) => (
            <th key={item.key}>
              <div
                className={item.sort ? "th-sort" : ""}
                onClick={() => {
                  if (item.sort) {
                    handleClick(item.key);
                  }
                }}
              >
                {item.title}
                {item.sort && (
                  <span
                    className={`btn ${
                      (sortConfig.sortKey === item.key &&
                        sortConfig.sortType) ||
                      "default"
                    }`}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.name}>
            <td>{item.name}</td>
            <td>{item.chinese}</td>
            <td>{item.math}</td>
            <td>{item.english}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Table 组件</h1>
      <div>
        <Table columns={columns} dataSource={testData} />
      </div>
    </div>
  );
}

export default App;
