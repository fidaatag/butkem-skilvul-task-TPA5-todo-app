import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// As a basic setup, import slice reducers
import todoSlice from '../src/features/todoSlice'

export function renderWithProviders(
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { todos: todoSlice } }),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}