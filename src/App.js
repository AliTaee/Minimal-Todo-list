import React, { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Learning React", done: false },
  ]);
  const [toAddList, setToAddList] = useState("");

  const handelAddToDo = () => {
    // Add a new todo list
    setTodoList([
      ...todoList,
      { id: todoList.length + 1, title: toAddList, done: false },
    ]);
    // Clear input field
    setToAddList("");
  };

  // Toggle todo state
  const toggleTodoState = (noteId) => {
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
        <ul className="todo-list">
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <input
                type="checkbox"
                value={todo.done}
                onChange={() => toggleTodoState(todo.id)}
              />
            </li>
          ))}
        </ul>
        <div className="add-todo-container">
          <label htmlFor="addTodoItem">Add New note</label>
          <input
            id="addTodoItem"
            autoFocus
            type="text"
            value={toAddList}
            onChange={(e) => setToAddList(e.target.value)}
          />
          <button className="todo-submit" onClick={handelAddToDo}>
            Add to list
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
