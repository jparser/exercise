import React, { useState } from 'react';
import './index.css';

async function increaseRemote(a: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return a
}

/**
 * 实现一个加法计数器功能，加法的计算是在服务端完成，这里由 increaseRemote 进行模拟，要求实现的功能有：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 */
function App() {
  const [count, setCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonClick = async (increment: number) => {
    setIsButtonDisabled(true);
    try {
      const result = await increaseRemote(increment);
      console.log(increment, count, result)

      setCount(count + result);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>加法计数器</div>
      </header>
      <section className="App-content">
        <button onClick={() => handleButtonClick(1)} disabled={isButtonDisabled}>
          +1
        </button>
        <br />
        <button onClick={() => handleButtonClick(2)} disabled={isButtonDisabled}>
          +2
        </button>
        <p>数值：{ count }</p>
      </section>
    </div>
  );
}

export default App;
