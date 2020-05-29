import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const todoList = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Learning React", done: false },
];

ReactDOM.render(
  <React.StrictMode>
    <App todo={todoList} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
