import React, { useEffect, useState } from 'react';
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
function App() {
  const columns = Object.keys(testData[0]);
  const [data, setData] = useState(testData);
  const sortClick = (type: any, key: string) => {
    if (type) {
      const sortData = data.sort((a: any, b: any) => a[key] - b[key]);
      setData(sortData);
    } else {
      const sortData = data.sort((a: any, b: any) => b[key] - a[key]);
      setData(sortData);
    }
  }
  return (
    <div className="App">
      <h1>Table 组件</h1>
      <div>使用 testData 数据在这里渲染实现的 Table 组件</div>
      <table>
        <thead>
          <tr>
            {
              columns && columns.map((item: any, index: number) => {
                return <td key={index} style={{ border: "1px solid rgba(0,0,0,0.3)", padding: '5px', display: "inline-block", width: "100px", textAlign: "center" }}>
                  {item}
                  <div style={{ display: "inline-block", float: "right" }}>
                    <span style={{ border: "5px solid transparent", width: 0, height: 0, display: "inline-block", borderTopColor: "black" }} onClick={() => sortClick(1, item)}></span>
                    <span style={{ border: "5px solid transparent", width: 0, height: 0, display: "inline-block", borderBottomColor: "black" }} onClick={() => sortClick(0, item)}></span>
                  </div>

                </td>
              })
            }
          </tr>
          {
            testData && testData.map((item: any, index: number) => {
              return <tr key={index}>
                {
                  columns && columns.map((i: any, v: number) => {
                    return <td key={v} style={{ border: "1px solid rgba(0,0,0,0.3)", padding: '5px', display: "inline-block", width: "100px", textAlign: "center" }}>
                      {item[i]}
                    </td>
                  })
                }
              </tr>
            })
          }

        </thead>

      </table>
    </div>
  );
}

export default App;
