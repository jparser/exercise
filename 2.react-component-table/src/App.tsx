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


function Table({ source }: any) {
	const [sort, setSort] = useState<any>({ chinese: false, math: false, english: false });
	const [data, setData] = useState(source);

	const compare = (key: string) => (a: any, b: any) => {
		if (key === 'name') return 0;
		if (a[key] < b[key]) return sort[key] ? -1 : 1;
		if (a[key] > b[key]) return sort[key] ? 1 : -1;
		return 0;
	};

	const onSort = (key: string) => {
		setSort({ ...sort, [key]: !sort[key] });
		setData([...data].sort(compare(key)));
	};

	return (
		<table>
			<thead>
				<tr>
					<th onClick={() => onSort('name')}>Name</th>
					<th onClick={() => onSort('chinese')}>Chinese</th>
					<th onClick={() => onSort('math')}>Math</th>
					<th onClick={() => onSort('english')}>English</th>
				</tr>
			</thead>
			<tbody>
				{data.map((row: any, index: number) => (
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
			<Table source={testData} />
		</div>
	);
}

export default App;