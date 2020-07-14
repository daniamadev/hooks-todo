import React, { useContext, useReducer, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import TodosContext from "./context"
import todosReducer from "./reducer"
import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm"
const useAPI = (endpoint) => {
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const response = await axios.get(endpoint)
    setData(response.data)
  }
  return data
}

const App = () => {
  const initialState = useContext(TodosContext)
  const [state, dispatch] = useReducer(todosReducer, initialState)
  const savedTodos = useAPI("https://hooks-api-master-seven.vercel.app/todos")

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos,
    })
  }, [savedTodos])

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
