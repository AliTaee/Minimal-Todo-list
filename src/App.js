import React, { useState } from "react";
import "./App.css";

function App(props) {
  const { todo } = props;
  const [todoList, setTodoList] = useState(todo);
  const [toAddList, setToAddList] = useState("");

  const handelAddToDo = () => {
    let maxId = 0;
    todoList.forEach((todo) => {
      if (todo.id > maxId) maxId = todo.id;
    });
    maxId++;
    // Add a new todo list
    setTodoList([...todoList, { id: maxId, title: toAddList, done: false }]);
    // Clear input field
    setToAddList("");
  };

  // Toggle todo state
  const toggleTodoState = (todoId) => {
    const newState = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          done: !todo.done,
        };
      }
      return todo;
    });
    setTodoList(newState);
  };

  //Delete todo
  const deleteTodo = (todoId) => {
    const newState = todoList.filter((todo) => todo.id !== todoId);
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
              <button
                onClick={() => deleteTodo(todo.id)}
                className="todo-delete"
              >
                Delete
              </button>
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
