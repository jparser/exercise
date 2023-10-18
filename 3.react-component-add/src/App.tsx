import React, { useState } from "react";
import "./index.css";

async function increaseRemote(a: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1e3));
  return a + 1;
}

/**
 * 实现一个加法计数器功能，加法的计算是在服务端完成，这里由 increaseRemote 进行模拟，要求实现的功能有：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 */
function App() {
  const [num, setNum] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const add = async (count: number) => {
    try {
      setDisabled(true);
      let result: number = await increaseRemote(num);
      if (count === 2) {
        result = await increaseRemote(result);
      }
      setNum(result);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>加法计数器</div>
      </header>
      <section className="App-content">
        <button disabled={disabled} onClick={() => add(1)}>
          +1
        </button>
        <button disabled={disabled} onClick={() => add(2)}>
          +2
        </button>
        <p>数值：{num}</p>
      </section>
    </div>
  );
}

export default App;
