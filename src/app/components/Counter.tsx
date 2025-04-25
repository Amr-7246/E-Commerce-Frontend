'use client';

import { useCounter } from "../context/counter/Hooks/counter";



const Counter = () => {
  const { count, increment, decrement } = useCounter();

  return (
    <div className="text-center bg-white p-6 rounded-2xl shadow-xl w-fit mx-auto mt-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-4"> Counter </h1>
      <p className="text-2xl mb-4">Current Count: <span className="font-bold text-blue-600">{count}</span></p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          ➖ Decrease
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          ➕ Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;
