// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, cancelAdd, cancelEdit, prosesAdd, setIsEmpty, startAdd } from "../features/todoSlice"

const InputTodo = () => {
  const dispatch = useDispatch()
  const { isEditing, inputTodoContent, isEmpty } = useSelector((state) => state.todos)

  const handleFocusInputAdd = () => {
    dispatch(setIsEmpty(false))
    if (isEditing) {
      dispatch(cancelEdit())
    }
  }

  const handleChangeInputAdd = (e) => {
    dispatch(prosesAdd(e.target.value))
  }

  const addButton = (e) => {
    e.preventDefault()

    if ( isEditing ) {
      dispatch(cancelEdit())
      dispatch(startAdd())
    } else {

      if (inputTodoContent.trim() === "") {
        dispatch(setIsEmpty(true))
        dispatch(cancelAdd())
      } else {
        dispatch(addTodo(inputTodoContent))
        dispatch(cancelAdd())
      }
    }    
  }


  return (
    <>
      <div className="mb-10">
        <form className="flex gap-3">
          <input
            value={inputTodoContent}
            onChange={handleChangeInputAdd}
            onFocus={handleFocusInputAdd}
            type="text"
            placeholder="What to do? "
            className="border shadow-sm border-slate-200 w-full pl-2 placeholder-slate-400 focus:outline-none focus:border-gray-500 focus:ring-gray-500"
          />
          <button
            onClick={addButton}
            className="border py-1 px-4 bg-purple-500 text-white font-semibold hover:bg-purple-700"
          >Add</button>
        </form>
        <p className={`mt-3 text-sm text-red-300 font-semibold italic ${isEmpty ? '' : 'invisible'}`}>Please fill it out!</p>
      </div>
    </>
  )
}

export default InputTodo