import React, { useState } from "react";
import "./App.css";

function App(props) {
  const { num } = props;
  const [click, setClick] = useState(num);

  return (
    <div className="App">
      <header className="App-header">
        <p>{click}</p>
        <button className="App-button" onClick={() => setClick(click + 1)}>
          Plus
        </button>
        <button className="App-button" onClick={() => setClick(click - 1)}>
          Minus
        </button>
      </header>
    </div>
  );
}

export default App;
