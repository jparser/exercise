import React,{useState} from 'react';
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
  // sortColumns 数组用来存储排序的列名和排序方式，每个元素都是一个对象，包含 column 表示列名，asc 表示升序/降序。
  const [sortColumns, setSortColumns] = useState<Array<{ column: keyof typeof testData[number]; asc: boolean }>>([]);

  // sortByColumn 函数用来处理点击表头列时的排序操作。它首先检查 column 是否已经存在于 sortColumns 数组中，
  // 如果已经存在，则将对应的排序方式取反；如果不存在，则将该列名和默认的升序方式添加到 sortColumns 数组中。
  const sortByColumn = (columnName: keyof typeof testData[number]) => {
    const columnExists = sortColumns.find((sortColumn) => sortColumn.column === columnName);
    if (columnExists) {
      const updatedSortColumns = sortColumns.map((sortColumn) =>
        sortColumn.column === columnName ? { ...sortColumn, asc: !sortColumn.asc } : sortColumn
      );
      setSortColumns(updatedSortColumns);
    } else {
      setSortColumns([...sortColumns, { column: columnName, asc: true }]);
    }
  };
  // sortData 函数用来对数据进行排序。它通过遍历 sortColumns 数组，按照每个排序列依次对数据进行排序。
  //在 sort 方法中，通过比较两个数据对象的对应列值，并根据 asc 属性的取值返回正确的排序结果。
  const sortData = () => {
    let sortedData = [...testData];
    sortColumns.forEach((sortColumn) => {
      sortedData = sortedData.sort((a: any, b: any) => {
        if (a[sortColumn.column] < b[sortColumn.column]) {
          return sortColumn.asc ? -1 : 1;
        }
        if (a[sortColumn.column] > b[sortColumn.column]) {
          return sortColumn.asc ? 1 : -1;
        }
        return 0;
      });
    });
    return sortedData;
  };
  return (
    <div className="App">
      <h1>Table 组件</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th onClick={() => sortByColumn('chinese')}>Chinese</th>
              <th onClick={() => sortByColumn('math')}>Math</th>
              <th onClick={() => sortByColumn('english')}>English</th>
            </tr>
          </thead>
          <tbody>
            {sortData().map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.chinese}</td>
                <td>{item.math}</td>
                <td>{item.english}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
