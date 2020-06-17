import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./styles/App.css";

function App(props) {
  const { todo } = props;
  const inputNote = useRef(null);
  const [todoList, setTodoList] = useState(todo);
  const [toAddList, setToAddList] = useState("");
  const [isEdit, setIsEdit] = useState({ state: false, id: 0 });
  const [error, setError] = useState({ state: false, message: "" });

  const setFocus = () => {
    inputNote.current.focus();
  };

  const handelAddToDo = () => {
    if (toAddList === "") {
      setError({ state: true, message: "You can't add empty note!" });
      return;
    } else {
      let maxId = 0;
      todoList.forEach((todo) => {
        if (todo.id > maxId) maxId = todo.id;
      });
      maxId++;
      // Add a new todo list
      setTodoList([...todoList, { id: maxId, title: toAddList, done: false }]);
      // Clear input field
      setToAddList("");
      // Clear Pre error message
      setError({ state: false, message: "" });
      setFocus();
    }
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

  // Set note text to input for edit
  const editTodo = (todoId) => {
    const editId = todoList.findIndex((todo) => todo.id === todoId);
    setToAddList(todoList[editId].title);
    setIsEdit({ state: true, id: todoId });
    setFocus();
  };

  // Save edit note
  const handelSaveEdit = () => {
    const updatedList = todoList.map((todo) => {
      if (todo.id === isEdit.id) {
        return {
          ...todo,
          title: toAddList,
        };
      }
      return todo;
    });
    setTodoList(updatedList);
    // Clear input field
    setToAddList("");
    setIsEdit({ state: false, id: 0 });
    setFocus();
  };

  // Save user type a new note text
  const handelNewNoteText = (event) => {
    setToAddList(event.target.value);
  };

  const createNoteOnEnter = (event) => {
    if (event.key === "Enter" && !isEdit.state) {
      handelAddToDo();
    } else if (event.key === "Enter" && isEdit.state) {
      handelSaveEdit();
    }
  };

  // If user want a add empty note this component will show
  const Error = ({ isShow }) => {
    return <>{isShow && <p className="error">{error.message}</p>}</>;
  };

  return (
    <div className="App">
      <main className="App-container">
        <section className="todo">
          <header>
            <h1 className="todo__title">Todo list</h1>
            <input
              data-test="input-new-note"
              placeholder="add a new note"
              ref={inputNote}
              autoFocus
              type="text"
              value={toAddList}
              onChange={handelNewNoteText}
              onKeyPress={createNoteOnEnter}
            />
            <button
              data-test="submit-note"
              className="todo__submit"
              onClick={isEdit.state ? handelSaveEdit : handelAddToDo}
            >
              {isEdit.state ? "Edit Note" : "Add to list"}
            </button>
          </header>
          <section>
            <Error isShow={error.state} />
            {todoList.length ? (
              <ul className="todo__list">
                {todoList.map((todo, index) => (
                  <li
                    data-test="note-item"
                    className={
                      todo.done ? "todo__item todo__item--done" : "todo__item"
                    }
                    key={todo.id}
                  >
                    <div>
                      <input
                        data-test="note-item-state"
                        id={`note-state-${index}`}
                        type="checkbox"
                        value={todo.done}
                        onChange={() => toggleTodoState(todo.id)}
                      />
                      <label
                        data-test="note-item-label"
                        htmlFor={`note-state-${index}`}
                      >
                        {todo.title}
                      </label>
                    </div>
                    <div>
                      <button
                        data-test="edit-note"
                        onClick={() => editTodo(todo.id)}
                        className="todo__btn todo__btn--black"
                      >
                        Edit
                      </button>
                      <button
                        data-test="delete-note"
                        onClick={() => deleteTodo(todo.id)}
                        className="todo__btn todo__btn--red"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p data-test="empty-message">There is nothing todo!</p>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}

App.propTypes = {
  todo: PropTypes.array.isRequired,
};

export default App;
