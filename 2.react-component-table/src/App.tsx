import React from 'react';
import './App.css';

interface dataType {
    id: string;
    name: string;
    chinese: number;
    math: number;
    english: number;
}

// 排序hook,传入数据源、初始默认的排序配置
const useSortableData = (items: dataType[], config = null) => {
    // 排序配置
    const [sortConfig, setSortConfig] = React.useState(config);

    // 排序逻辑
    const sortedItems = React.useMemo(() => {
        
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    // 升降序切换
    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        
        setSortConfig({ key, direction });
    };
    
    return { items: sortedItems, requestSort, sortConfig };
};

interface thType {
    key: string;
    isSort?: boolean;
    type?: string;
}

const ThHeader = ({ items, onClick, getSomeClass, abledKeys }) => {
    const allKeys = Object.keys(items[0]).slice(1);
    const sortKeys = abledKeys[0].replace(/\s+/g, '').split(',');
    let arr: thType[] = [];

    allKeys.map((key, i) => {

        arr.push({ key });
        sortKeys.map((k, y) => {
            let isSort = k === key;
            
            if (isSort) {
                arr[i].isSort = true;
                arr[i].type = 'sort';
            } else {
                arr[i].isSort = false;
            }
        })

    })
    
    
    return (
        <>
        {
            arr.map((v, i) => (
                <th key={`th${i}`}>
                    <button
                        type="button"
                        onClick={() => v.type === 'sort' ? onClick(v.key) : null}
                        className={v.type === 'sort' ? `default ${getSomeClass(v.key)}` : null}
                    >
                        {v.key.slice(0, 1).toUpperCase() + v.key.slice(1)}
                    </button>
                </th>
            ))
        }
        </>
    );
}



// 表格组件
const SortTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props['products']);
    const abledKeys = props['abledKeys'] || [];

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <table>
            <caption>
                <h1>Table 组件</h1>
                <i>(请分别点击 th 进行排序，默认第一列)</i>
            </caption>
            <thead>
                <tr>
                    
                        <ThHeader items={items}
                            onClick={requestSort}
                            getSomeClass={getClassNamesFor}
                            abledKeys={abledKeys}
                        />
                    
                </tr>
            </thead>
            <tbody>
                {/* 根据数据源渲染 */}
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.chinese}</td>
                        <td>{item.math}</td>
                        <td>{item.english}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// 数据源
const testData: dataType[] = [
    {
        id: 'n01',
        name: 'Jim',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        id: 'n02',
        name: 'Tom',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        id: 'n03',
        name: 'Han',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        id: 'n04',
        name: 'Lilei',
        chinese: 88,
        math: 99,
        english: 89,
    },
];
function App() {
  return (
    <div className="App">
      <h1>Table 组件</h1>
      <div>使用 testData 数据在这里渲染实现的 Table 组件</div>
      {/* abledKeys配置可排序的列key */}
      <SortTable
            products={testData}
            abledKeys={['name, math']}
        />
    </div>
  );
}

export default App;
