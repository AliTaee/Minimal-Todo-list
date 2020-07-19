import React from 'react'
import Error from './error/error'

const NoteList = (props) => {
  const { todoList, toggleTodoState, error, editTodo, deleteTodo } = props
  return (
    <>
      <Error isShow={error.state} message={error.message} />
      {todoList.length ? (
        <ul className="todo__list">
          {todoList.map((todo, index) => (
            <li
              data-test="note-item"
              className={
                todo.done ? 'todo__item todo__item--done' : 'todo__item'
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
    </>
  )
}

export default NoteList
