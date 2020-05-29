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

  // toggle todo state
  const handleNoteState = (noteId) => {
    const newState = todoList.map((todo) => {
      if (todo.id === noteId) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setTodoList(newState);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul className="note-list">
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <input
                type="checkbox"
                value={todo.done}
                onChange={() => handleNoteState(todo.id)}
              />
            </li>
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
          <button className="note-submit" onClick={handelAddNote}>
            Add to list
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
