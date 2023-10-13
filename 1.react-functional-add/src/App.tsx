import React, { useState } from 'react';
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
  let sum: number = 0;
  const length = inputs.length;

  for (let i = 0; i < length - 1; i++) {
    sum += await addRemote(inputs[i], inputs[i + 1]);
    ++i;
  }

  if (length % 2 !== 0) {
    sum += inputs[length - 1];
  }
  return sum;

}

function App() {
  const [sum, setSum] = useState<number>();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let inputValue: string = formData.get('some_number').toString();
    let someNum: number[];
    
    if (inputValue.indexOf('，') > -1) {
      someNum = inputValue.split('，').map(Number);
    } else if (inputValue.indexOf(',') > -1) {
      someNum = inputValue.split(',').map(Number);
    }

    if (someNum) {
      setSum(await add(...someNum));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现add 方法，当用户在输入框中输入多个数字(逗号隔开)后，</div>
        <div>点击相加按钮能显示最终结果</div>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="App-content">
          <input type="text" name="some_number" placeholder="请输入要相加的数字（如1,3,4,5,6）" />
          <button>相加</button>
        </section>
        <section className="App-result">
          <p>
            相加结果是：<span>{sum}</span>
          </p>
        </section>
      </form>
    </div>
  );
}

export default App;
