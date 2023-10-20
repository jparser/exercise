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

function Table({ data }: any) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key: any) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('chinese')}>Chinese</th>
          <th onClick={() => handleSort('math')}>Math</th>
          <th onClick={() => handleSort('english')}>English</th>
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
      <div>
        <Table data={testData} />
      </div>
    </div>
  );
}

export default App;
