import React, { useRef, useState, useCallback } from 'react';
import './index.css';

async function increaseRemote(a: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1e3));
  return a + 1;
}

/**
 * 下面是一个用 React 写的异步相加计数器 Demo，要求实现的功能为：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 *
 * 请找出下面代码的实现问题并改正。
 */
function App() {
  const [count, setCount] = useState(0);
  const [isLoading,setIsLoading] = useState(false)

  const increase = useCallback(async (num:number) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true)
    let result = count
    //这一块最开始完全被下面的num === 2 时候调用两次increse函数给迷惑了，其实完全可以在函数内部循环调用计数器函数即可
    for(let i = 0;i<num;i++){
      result = await increaseRemote(result);
    }
    setCount(result)
    setIsLoading(false)
  }, [count]);

  const handleClick = (num:number) => {
    if (num === 1) {
      increase(1);
    } else if (num === 2) {
      increase(2);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>请按照题目要求，修正以下程序</div>
      </header>
      <section className="App-content">
        <button
          disabled={isLoading}
          onClick={() => {
            handleClick(1);
          }}
        >
          +1
        </button>
        <button
          disabled={isLoading}
          onClick={() => {
            handleClick(2);
          }}
        >
          +2
        </button>
        <p>数值：{count}</p>
      </section>
    </div>
  );
}

export default App;
