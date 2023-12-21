import { useDispatch, useSelector } from "react-redux"
import { fileterTodo, setIsEmpty } from "../features/todoSlice"

const FilterButton = () => {
  const dispatch = useDispatch()
  const { filter } = useSelector((state) => state.todos)

  const typeFilterButton = (type) => {
    dispatch(setIsEmpty(false))
    dispatch(fileterTodo(type))
  }

  const ButtonFilter = (type, text) => {
    return (
      <button onClick={() => typeFilterButton(type)} className={`border rounded-full px-2 text-sm font-semibold text-white ${filter === type ? "bg-teal-600" : "bg-gray-600"}`}>{text}</button>
    )
  }


  return (
    <>
      <div className="flex gap-2 mb-4">
        {ButtonFilter("all", "ALL")}
        {ButtonFilter("active", "ACTIVE")}
        {ButtonFilter("completed", "COMPLETED")}
      </div>
    </>
  )
}

export default FilterButton