import React, { useState } from 'react';
import './App.css';

/**
 * 实现一个 Table 组件满足以下功能，如图 table.jpeg 所示
 * - 把数据渲染成表格
 * - 支持列排序
 * - 支持多列排序
 */

/**
 * 使用如下数据进行测试
 */
const testData: {
  name: string;
  chinese: number;
  math: number;
  english: number;
}[] = [
  {
    name: 'Jim',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    name: 'Tom',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    name: 'Han',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    name: 'Lilei',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

interface TableData {
  name: string;
  chinese: number;
  math: number;
  english: number;
  [key: string]: number | string;
}

function Table({ data, initialSort }: { data: TableData[], initialSort: Record<string, boolean> }) {
  const [sort, setSort] = useState(initialSort);
  const [sortedData, setSortedData] = useState(data);

  const compare = (key: string) => (a: TableData, b: TableData) => {
    if (a[key] < b[key]) return sort[key] ? -1 : 1;
    if (a[key] > b[key]) return sort[key] ? 1 : -1;
    return 0;
  };  

  const handleHeaderClick = (key: string) => {
    setSort({ ...sort, [key]: !sort[key] });
    setSortedData([...data].sort(compare(key)));
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleHeaderClick('name')}>Name</th>
          <th onClick={() => handleHeaderClick('chinese')}>Chinese</th>
          <th onClick={() => handleHeaderClick('math')}>Math</th>
          <th onClick={() => handleHeaderClick('english')}>English</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.chinese}</td>
            <td>{row.math}</td>
            <td>{row.english}</td>
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
      <div>使用 testData 数据在这里渲染实现的 Table 组件</div>
      <Table data={testData} initialSort={{ name: false, chinese: false, math: false, english: false }} />
    </div>
  );
}

export default App;
