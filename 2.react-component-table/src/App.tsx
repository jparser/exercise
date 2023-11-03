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

function Table({data, onSort} : any){
  const [sortedOrder, setSortedOrder] = useState([]);
  const [sortedData, setSortedData] = useState(data);

  const handleSort = (column:any) => {
    const isAcs = sortedOrder[0] === column && sortedOrder[1] === 'acs';
    const newSortOrder: any = isAcs ? [column, 'desc'] : [column, 'acs'];
    setSortedOrder(newSortOrder);

    const sorted = [...sortedData].sort((a, b) => {
      if(isAcs){
        return a[column] - b[column];
      }
      return b[column] - a[column];
    })

    setSortedData(sorted);
    onSort(sorted);
  };

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
      {sortedData.map((item: any, idx: any) => (
        <tr key={idx}>
          <td>{item.name}</td>
          <td>{item.chinese}</td>
          <td>{item.math}</td>
          <td>{item.english}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

function App() {
  const handleSort = (sortedData:[]) => {
    console.log('sorted data',sortedData);
  };

  return (
    <div className="App">
      <h1>Table 组件</h1>
      {/* <div>使用 testData 数据在这里渲染实现的 Table 组件</div> */}
      <Table data={testData} onSort={handleSort} />
    </div>
  );
}

export default App;
