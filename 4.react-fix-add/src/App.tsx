import React, { useRef, useState, useCallback } from 'react';
import './App.css';

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
  const loading = useRef(false);

  const increase = useCallback(async () => {
    if (loading.current) {
      return;
    }
    loading.current = true;
    const data = await increaseRemote(count);
    setCount(data);
    loading.current = false;
  }, [count]);

  const handleClick = async (num:Number) => {
    if (num === 1) {
      await increase();
    } else if (num === 2) {
      await increase();
      await increase();
      // 问题：在点击+2的时候调用了 increase 函数两次，这个函数中没有等待第一次的异步操作完成就立即进行第二次操作。这可能会导致结果不对。
      // 方案：可以使用 async await 来确保每次点击都等待上一个操作完成后再执行下一个操作。
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>请按照题目要求，修正以下程序</div>
      </header>
      <section className="App-content">
        <button
          disabled={loading.current}
          onClick={() => {
            handleClick(1);
          }}
        >
          +1
        </button>
        <button
          disabled={loading.current}
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
