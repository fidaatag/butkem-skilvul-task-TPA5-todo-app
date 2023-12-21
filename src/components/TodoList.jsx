import { useDispatch, useSelector } from "react-redux"
import { cancelAdd, cancelEdit, deleteTodo, editTodo, prosesEdit, setIsEmpty, startEdit, statusTodo } from "../features/todoSlice"


const TodoList = () => {
  const dispatch = useDispatch()
  const { todos, editTodoId, editTodoContent, inputTodoContent, isEditing, filter } = useSelector((state) => state.todos)

  const deleteButton = (id) => {
    dispatch(setIsEmpty(false))

    if (inputTodoContent.trim() !== "") {
      dispatch(cancelAdd())
    } else if (isEditing) {
      dispatch(cancelEdit())
    } else {
      dispatch(deleteTodo(id))
    }
  }

  const editButton = (id, content) => {
    dispatch(startEdit({ id, content }))
    dispatch(cancelAdd())
    dispatch(setIsEmpty(false))
  }

  const handleChangeInputEdit = (e) => {
    dispatch(prosesEdit(e.target.value))
  }

  const saveEditButton = (id) => {
    if (editTodoContent.trim() === "") {
      dispatch(cancelEdit())
    } else {
      dispatch(editTodo({ id, content: editTodoContent }))
      dispatch(cancelEdit())
    }
  }

  const completedButton = (id) => {
    dispatch(setIsEmpty(false))
    dispatch(statusTodo(id))
  }

  const FilteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return todo;
    } else if (filter === "completed") {
      return todo.isCompleted
    } else if (filter === "active") {
      return !todo.isCompleted
    }
    return todo;
  })


  return (
    <>
      <div className="grid gap-3">

        {
          FilteredTodos.length === 0 ? (
            <p className="text-gray-300 text-sm italic">
              {filter === "all" ? "Todo" : `Todo ${filter}`} is empty
            </p>

          ) : (

            FilteredTodos.map((todo) => (
              <div key={todo.id} className="flex flex-row border p-2 gap-2">

                {editTodoId !== todo.id ? (

                  // Mode Todo Active
                  <>
                    <div className="flex gap-2 w-4/5">
                      <div className="w-8">
                        <button onClick={() => completedButton(todo.id)} className="border w-full hover:bg-gray-200"><span className={todo.isCompleted ? "" : "invisible"}>✔️</span></button>
                      </div>
                      <div className="w-full relative">
                        <p className="w-[200px] truncate ...">{todo.content}</p>
                        <div className={`w-full border border-gray-700 absolute top-3 ${todo.isCompleted ? "" : "invisible"}`}></div>
                      </div>
                    </div>
                    <div className={`flex gap-2 justify-center w-1/5 ${todo.isCompleted ? "invisible" : ""}`}>
                      <div>
                        <button onClick={() => editButton(todo.id, todo.content)} className="hover:border-b-2">🖊️</button>
                      </div>
                      <div>
                        <button onClick={() => deleteButton(todo.id)} className="hover:border-b-2">❌</button>
                      </div>
                    </div>
                  </>

                ) : (

                  // Mode Todo Edit
                  <>
                    <div className="flex gap-2 w-4/5">
                      <div className="w-full relative">
                        <input value={editTodoContent} onChange={handleChangeInputEdit} type="text" className="border shadow-sm border-slate-200 w-full pl-2 placeholder-slate-400 focus:outline-none focus:border-gray-500 focus:ring-gray-500" />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-center w-1/5">
                      <button onClick={() => saveEditButton(todo.id)} className="border px-4 bg-amber-600 text-white hover:bg-yellow-700">Save</button>
                    </div>
                  </>
                )}

              </div>
            ))

          )


        }

      </div >
    </>
  )
}

export default TodoList