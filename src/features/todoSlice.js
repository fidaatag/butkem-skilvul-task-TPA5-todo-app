import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    filter: "all",
    editTodoId: null,
    editTodoContent: "",
    isEditing: false,
    inputTodoContent: "",
    isEmpty: false,
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
    },


    // click management

    startEdit(state, action) {
      state.editTodoId = action.payload.id;
      state.editTodoContent = action.payload.content;
      state.isEditing = true;
    },
    prosesEdit(state, action) {
      state.editTodoContent = action.payload;
    },
    cancelEdit(state) {
      state.editTodoId = null;
      state.isEditing = false
      state.editTodoContent = ""
    },
    startAdd(state) {
      state.editTodoId = null;
      state.editTodoContent = "";
    },
    prosesAdd(state, action) {
      state.inputTodoContent = action.payload
    },
    cancelAdd(state) {
      state.inputTodoContent = ""
    },
    setIsEmpty(state, action) {
      state.isEmpty = action.payload
    }
  }
})

export const { addTodo, deleteTodo, editTodo, statusTodo, fileterTodo, startAdd, cancelAdd, prosesAdd, startEdit, cancelEdit, prosesEdit, setIsEmpty } = todoSlice.actions
export default todoSlice.reducer