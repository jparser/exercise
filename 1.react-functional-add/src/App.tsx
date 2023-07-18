import React from 'react';
import './App.css';

/**
 * 已知有一个远程加法
 * @param a
 * @param b
 * @returns
 */
async function addRemote(a: number, b: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return a + b;
}

/**
 * 请实现本地的 add 方法，调用 addRemote，能最优的实现输入数字的加法。
 * @example
 * ```
 * add(5, 6).then(result => {
 *   console.log(result); // 11
 * });
 * add(1, 4, 3, 3, 5).then(result => {
 *   console.log(result); // 16
 * })
 * add(2, 3, 3, 3, 4, 1, 3, 3, 5).then(result => {
 *   console.log(result); // 27
 * })
 * ```
 */
async function add(...inputs: number[]) {
  // 你的实现
  return inputs.reduce((pc, item) => {
    return pc.then(res => {
      return addRemote(res, item);
    });
  }, Promise.resolve(0)).then(res=>{
    document.getElementById('result')!.innerHTML = JSON.stringify(res)
  });
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>请实现add 方法，当用户在输入框中输入多个数字(逗号隔开)后，</div>
        <div>点击相加按钮能显示最终结果</div>
      </header>
      <section className="App-content">
        <input type="text" placeholder="请输入要相加的数字（如1,3,4,5,6）" />
        <button onClick={()=>{
          add(...(document.querySelector('input') as HTMLInputElement ).value.split(',').map(v=>{
            return JSON.parse(v)
          }))
        }}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：<span id='result'>{'你的实现'}</span>
        </p>
      </section>
    </div>
  );
}

export default App;
