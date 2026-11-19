import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Counter from "./component/Counter";
import Togle from "./component/Togle";

function App() {
  return (
    <>
      <div className=" flex flex-col">
        <h1 className="text-2xl font-bold underline">
          All Component are rendered on Appp page
        </h1>
        <div>
          {/* <Counter /> */}
          <Togle />
        </div>
      </div>
    </>
  );
}

export default App;
