import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    filter: "all"
  },
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: state.todos.length + 1,
        content: action.payload,
        isCompleted: false,
      }
      state.todos = [...state.todos, newTodo]
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo(state, action) {
      const { id, content } = action.payload;
      const findTodoEdit = state.todos.find((todo) => todo.id === id);
      if (findTodoEdit) {
        findTodoEdit.content = content
      }
    },
    statusTodo(state, action) {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
    },
    fileterTodo(state, action) {
      state.filter = action.payload
    }
  }
})

export const { addTodo, deleteTodo, editTodo, statusTodo, fileterTodo } = todoSlice.actions
export default todoSlice.reducer