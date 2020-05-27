import React, { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Learning React", done: false },
  ]);
  const [toAddList, setToAddList] = useState("");

  const handelAddNote = () => {
    // Add a new todo list
    setTodoList([
      ...todoList,
      { id: todoList.length + 1, title: toAddList, done: false },
    ]);
    // Clear input field
    setToAddList("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul className="App-list">
          {todoList.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
        <div className="add-note-container">
          <label htmlFor="addNoteItem">Add New note</label>
          <input
            id="addNoteItem"
            autoFocus
            type="text"
            value={toAddList}
            onChange={(e) => setToAddList(e.target.value)}
          />
          <button className="App-button" onClick={handelAddNote}>
            Add to list
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
