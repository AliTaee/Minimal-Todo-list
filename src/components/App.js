import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import NoteList from './NoteList'
import EnterNote from './EnterNote'
import '../styles/App.css'

const App = (props) => {
  const { todo } = props
  const inputNote = useRef(null)
  const [todoList, setTodoList] = useState(todo)
  const [toAddList, setToAddList] = useState('')
  const [isEdit, setIsEdit] = useState({ state: false, id: 0 })
  const [error, setError] = useState({ state: false, message: '' })

  const setFocus = () => {
    inputNote.current.focus()
  }

  const handelAddToDo = () => {
    if (toAddList === '') {
      setError({ state: true, message: "You can't add empty note!" })
      return
    } else {
      let maxId = 0
      todoList.forEach((todo) => {
        if (todo.id > maxId) maxId = todo.id
      })
      maxId++
      // Add a new todo list
      setTodoList([...todoList, { id: maxId, title: toAddList, done: false }])
      // Clear input field
      setToAddList('')
      // Clear Pre error message
      setError({ state: false, message: '' })
      setFocus()
    }
  }

  // Toggle todo state
  const toggleTodoState = (todoId) => {
    const newState = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          done: !todo.done,
        }
      }
      return todo
    })
    setTodoList(newState)
  }

  //Delete todo
  const deleteTodo = (todoId) => {
    const newState = todoList.filter((todo) => todo.id !== todoId)
    setTodoList(newState)
  }

  // Set note text to input for edit
  const editTodo = (todoId) => {
    const editId = todoList.findIndex((todo) => todo.id === todoId)
    setToAddList(todoList[editId].title)
    setIsEdit({ state: true, id: todoId })
    setFocus()
  }

  // Save edit note
  const handelSaveEdit = () => {
    const updatedList = todoList.map((todo) => {
      if (todo.id === isEdit.id) {
        return {
          ...todo,
          title: toAddList,
        }
      }
      return todo
    })
    setTodoList(updatedList)
    // Clear input field
    setToAddList('')
    setIsEdit({ state: false, id: 0 })
    setFocus()
  }

  // Save user type a new note text
  const handelNewNoteText = (event) => {
    setToAddList(event.target.value)
  }

  const createNoteOnEnter = (event) => {
    if (event.key === 'Enter' && !isEdit.state) {
      handelAddToDo()
    } else if (event.key === 'Enter' && isEdit.state) {
      handelSaveEdit()
    }
  }

  return (
    <div className="App">
      <main className="App-container">
        <section className="todo">
          <header>
            <h1 className="todo__title">Todo list</h1>
            <EnterNote
              isEdit={isEdit}
              inputNote={inputNote}
              toAddList={toAddList}
              handelAddToDo={handelAddToDo}
              handelSaveEdit={handelSaveEdit}
              createNoteOnEnter={createNoteOnEnter}
              handelNewNoteText={handelNewNoteText}
            />
          </header>
          <NoteList
            error={error}
            todoList={todoList}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            toggleTodoState={toggleTodoState}
          />
        </section>
      </main>
    </div>
  )
}

App.propTypes = {
  todo: PropTypes.array.isRequired,
}

export default App
