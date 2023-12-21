import FilterButton from "./components/FilterButton"
import InputTodo from "./components/InputTodo"
import TodoList from "./components/TodoList"

function App() {
  return (
    <>
      <div className="grid place-content-center mt-32 mb-20">
        <h1 className="text-xl md:text-3xl font-bold mb-16 text-center">What&#39;s the plan for today?</h1>
        <InputTodo />
        <FilterButton />
        <TodoList />
      </div>
    </>
  )
}

export default App