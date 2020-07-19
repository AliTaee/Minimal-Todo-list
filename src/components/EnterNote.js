import React from 'react'

const EnterNote = (props) => {
  const {
    isEdit,
    toAddList,
    inputNote,
    handelAddToDo,
    handelSaveEdit,
    handelNewNoteText,
    createNoteOnEnter,
  } = props
  return (
    <>
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
        {isEdit.state ? 'Edit Note' : 'Add to list'}
      </button>
    </>
  )
}

export default EnterNote
