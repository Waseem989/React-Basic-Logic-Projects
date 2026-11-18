import React, { useState } from "react";


const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-extrabold uppercase">hello counter</h1>
        <p>You clicked {count} times</p>

        <div className="flex gap-4">
          <button onClick={() => setCount(count + 1)} className="bg-green-400 rounded-2xl p-2"> Click me</button>
          {count > 0 ? 
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-400 rounded-2xl p-2">
              Decr
            </button>
           : 
            <button className="bg-gray-400 rounded-2xl p-2" disabled> Decr</button>
          }
          
          <button
            className=" bg-cyan-900 p-2 rounded-2xl text-amber-50 "
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
