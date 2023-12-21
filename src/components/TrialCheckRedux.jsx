// This component is just to ensure whether Redux is running properly

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, editTodo, fileterTodo, statusTodo } from "../features/todoSlice"

const TodoLayout = () => {
  const dispatch = useDispatch()
  const { todos } = useSelector((state) => state.todos)

  const [todo, setTodo] = useState('')
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoContent, setEditedTodoContent] = useState('');

  console.log(todos)


  const handleInputAddClick = () => {
    // If the user is editing, cancel editing
    if (isEditing) {
      setEditingTodoId(null);
      setIsEditing(false);
      setEditedTodoContent(""); // Clear edited content
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const addButton = (e) => {
    e.preventDefault();

    if (isEditing) {
      // If the user is editing, cancel editing
      setEditingTodoId(null);
      setIsEditing(false);
    } else {
      // If the user is not editing, process adding a new todo
      if (todo.trim() !== "") {
        dispatch(addTodo(todo));
        setTodo("");
      }
    }
  }

  const deleteButton = (id) => {
    if (todo.trim() !== "") {
      // If the user is add todo, cancel add todo
      setTodo("");
    } else if (isEditing) {
      // If the user is editing, cancel editing
      setEditingTodoId(null);
      setIsEditing(false);
      setEditedTodoContent("");
    } else {
      // If the user is not editing, process delete todo
      dispatch(deleteTodo(id));
    }

  }

  const editButton = (id, content) => {
    if (todo.trim() !== "") {
      // If the user is add todo, cancel add todo
      setTodo("");
    }

    setEditingTodoId(id);
    setEditedTodoContent(content);
    setIsEditing(true);
  }

  const saveEditButton = (id) => {
    dispatch(editTodo({ id, content: editedTodoContent }));
    setEditingTodoId(null);
    setIsEditing(false);
    setEditedTodoContent("");
  }

  const completeButton = (id) => {
    dispatch(statusTodo(id))
  }

  const { filter } = useSelector((state) => state.todos)

  const filterTodos = todos.filter((todo) => {
    if (filter === "all") {
      return todo;
    } else if (filter === "completed") {
      return todo.isCompleted
    } else if (filter === "active") {
      return !todo.isCompleted;
    }
    return todo;
  })

  return (
    <>
      <form>
        <input
          type="text"
          value={todo}
          onChange={handleChange}
          onClick={handleInputAddClick}
        />
        <button onClick={addButton}>add</button>
      </form>
      <div>
        <button onClick={() => dispatch(fileterTodo("all"))}>ALL</button>
        <button onClick={() => dispatch(fileterTodo("active"))}>active</button>
        <button onClick={() => dispatch(fileterTodo("completed"))}>completed</button>
      </div>
      <ul>
        {filterTodos.map((todo) => (

          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoContent}
                  onChange={(e) => setEditedTodoContent(e.target.value)}
                />
                <button onClick={() => saveEditButton(todo.id)}>save</button>
              </>
            ) : (
              <>
                {todo.content}
                <button onClick={() => deleteButton(todo.id)}>delete</button>
                <button onClick={() => editButton(todo.id, todo.content)}>edit</button>
                <button onClick={() => completeButton(todo.id)}>complete</button>
              </>
            )}
          </li>

        ))}
      </ul>
    </>
  )
}

export default TodoLayout