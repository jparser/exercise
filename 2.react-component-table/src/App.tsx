import React from 'react';
import './App.css';
import { Table } from 'antd';

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
const dataSource = [
  {
    key: '1',
    name: 'Jim',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Tom',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Han',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Lilei',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'chinese',
    dataIndex: 'chinese',
    key: 'chinese',
    sorter: {
      compare: (a: { chinese: number; }, b: { chinese: number; }) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'math',
    dataIndex: 'math',
    key: 'math',
    sorter: {
      compare: (a: { math: number; }, b: { math: number; }) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'english',
    dataIndex: 'english',
    key: 'english',
    sorter: {
      compare: (a: { english: number; }, b: { english: number; }) => a.english - b.english,
      multiple: 1,
    },
  },
];
function App() {
  return (
    <div className="App">
      <h1>Table 组件</h1>
      <div><Table dataSource={dataSource} columns={columns} /></div>
    </div>
  );
}

export default App;
