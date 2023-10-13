import React, { useState, useReducer } from 'react';
import './index.css';

async function increaseRemote(a: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1e3));
  return a + 1;
}

/**
 * 实现一个加法计数器功能，加法的计算是在服务端完成，这里由 increaseRemote 进行模拟，要求实现的功能有：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 */
function reducer(state, action) {
  if (action.type === 'increament') {
    return {
      counterValue: state.counterValue + action.payload
    }
  }
  throw Error('Unknown action');
}

function App() {
  const [state, dispatch] = useReducer(reducer, { counterValue: 1 });
  const [isAdding, setIsAdding] = useState(false);

  async function addOne(num: number) {
    setIsAdding(true);
    await increaseRemote(num);
    dispatch({ type: 'increament', payload: num });
    setIsAdding(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>加法计数器</div>
      </header>
      <section className="App-content">
        <button disabled={isAdding} onClick={() => addOne(1)}>+1</button>
        <button disabled={isAdding} onClick={() => addOne(2)}>+2</button>
        <p>数值：{state.counterValue}</p>
      </section>
    </div>
  );
}

export default App;
